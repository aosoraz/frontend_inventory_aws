import { Hono } from 'hono';
import { handle } from 'hono/aws-lambda';
import { cors } from 'hono/cors';
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

const app = new Hono();

// Enable CORS for all routes
app.use('*', cors({
  origin: '*',
  allowHeaders: ['Content-Type'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

const DB_API_BASE_URL = process.env.DB_API_BASE_URL || "";

if (!DB_API_BASE_URL) {
  throw new Error("CRITICAL: DB_API_BASE_URL is not defined in environment variables. Please set it before running the server.");
}

// ---------------------------------------------------------
// REDIS & RATE LIMITER SETUP
// ---------------------------------------------------------

// Initialize Redis client using environment variables
// Requires: UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN
const redis = Redis.fromEnv();

// Create a sliding window rate limiter: 5 requests per 10 seconds per IP
const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, "10 s"),
  analytics: true,
});

// Rate Limiting Middleware
app.use('*', async (c, next) => {
  const clientIp = c.req.header('x-forwarded-for') || 'unknown_ip';

  // We are only rate-limiting mutation routes (POST, PUT, DELETE) to protect the DB from spam.
  // GET requests are allowed to pass freely. Remove the 'if' block to rate-limit everything.
  if (['POST', 'PUT', 'DELETE'].includes(c.req.method)) {
    
    const { success, limit, reset, remaining } = await ratelimit.limit(`ratelimit_${clientIp}`);

    // Attach standard rate limit headers to the response
    c.res.headers.set('X-RateLimit-Limit', limit.toString());
    c.res.headers.set('X-RateLimit-Remaining', remaining.toString());
    c.res.headers.set('X-RateLimit-Reset', reset.toString());

    if (!success) {
      console.warn(`[RATE LIMIT EXCEEDED] Blocked request from IP: ${clientIp}`);
      return c.json({ message: 'Too Many Requests. Please try again later.' }, 429);
    }
  }

  await next();
});

// ---------------------------------------------------------
// LOGGING & SANITIZATION MIDDLEWARE
// ---------------------------------------------------------

// Custom Middleware for incoming client requests
app.use('*', async (c, next) => {
  const method = c.req.method;
  const path = c.req.path;
  const clientIp = c.req.header('x-forwarded-for') || 'unknown';
  
  console.log(`[API GATEWAY IN] Request from Client (${clientIp}): ${method} ${path}`);
  const start = Date.now();
  
  await next();
  
  const ms = Date.now() - start;
  console.log(`[API GATEWAY OUT] Response to Client: ${method} ${path} | Status: ${c.res.status} | Duration: ${ms}ms`);
});

// Helper: Recursively sanitize object strings (trim whitespace and remove HTML tags)
function sanitizePayload(obj) {
  if (typeof obj === 'string') {
    return obj.replace(/<[^>]*>?/gm, '').trim();
  }
  if (Array.isArray(obj)) {
    return obj.map(item => sanitizePayload(item));
  }
  if (obj !== null && typeof obj === 'object') {
    const sanitizedObj = {};
    for (const [key, value] of Object.entries(obj)) {
      sanitizedObj[key] = sanitizePayload(value);
    }
    return sanitizedObj;
  }
  return obj;
}

// Sanitization Middleware
app.use('*', async (c, next) => {
  if (['POST', 'PUT', 'PATCH'].includes(c.req.method)) {
    const originalJson = c.req.json.bind(c.req);
    c.req.json = async () => {
      const body = await originalJson();
      const sanitized = sanitizePayload(body);
      console.log(`[BFF SANITIZATION] Cleaned incoming ${c.req.method} payload`);
      return sanitized;
    };
  }
  await next();
});

// Helper to wrap fetch and log downstream calls
async function fetchDownstream(path, options = {}) {
  const url = `${DB_API_BASE_URL}${path}`;
  const method = options.method || 'GET';
  
  console.log(`[BFF -> DB] Sending request: ${method} ${url}`);
  const start = Date.now();
  
  try {
    const response = await fetch(url, options);
    const ms = Date.now() - start;
    console.log(`[DB -> BFF] Received response: ${method} ${url} | Status: ${response.status} | Duration: ${ms}ms`);
    return response;
  } catch (err) {
    const ms = Date.now() - start;
    console.error(`[DB -> BFF] Error: ${method} ${url} | Message: ${err.message} | Duration: ${ms}ms`);
    throw err;
  }
}

// ---------------------------------------------------------
// ROUTES
// ---------------------------------------------------------

// 1. GET /products
app.get('/products', async (c) => {
  try {
    const response = await fetchDownstream('/products');
    const data = await response.json();
    return c.json(data, response.status);
  } catch (error) {
    console.error(`[BFF ERROR] Internal Server Error on ${c.req.method} ${c.req.path}: ${error.message}`);
    return c.json({ message: 'Internal Server Error' }, 500);
  }
});

// 2. GET /products/:id
app.get('/products/:id', async (c) => {
  const id = c.req.param('id');
  try {
    const response = await fetchDownstream(`/products/${id}`);
    const data = await response.json();
    return c.json(data, response.status);
  } catch (error) {
    console.error(`[BFF ERROR] Internal Server Error on ${c.req.method} ${c.req.path}: ${error.message}`);
    return c.json({ message: 'Internal Server Error' }, 500);
  }
});

// 3. POST /products
app.post('/products', async (c) => {
  try {
    const body = await c.req.json();
    
    // Business Logic / Validation
    if (!body.ProductName || !body.Category || body.Price === undefined || body.Stock === undefined || !body.Description) {
      console.log(`[BFF VALIDATION FAILED] POST /products - Invalid payload`);
      return c.json({ message: 'Invalid payload. ProductName, Category, Price, Stock, and Description are required.' }, 400);
    }
    
    // Ensure Price and Stock are numbers
    body.Price = Number(body.Price);
    body.Stock = Number(body.Stock);

    const response = await fetchDownstream('/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    
    const data = await response.json();
    return c.json(data, response.status);
  } catch (error) {
    console.error(`[BFF ERROR] Internal Server Error on ${c.req.method} ${c.req.path}: ${error.message}`);
    return c.json({ message: 'Internal Server Error' }, 500);
  }
});

// 4. PUT /products/:id
app.put('/products/:id', async (c) => {
  const id = c.req.param('id');
  try {
    const body = await c.req.json();

    // Business Logic / Validation
    if (!body.ProductName || !body.Category || body.Price === undefined || body.Stock === undefined || !body.Description) {
      console.log(`[BFF VALIDATION FAILED] PUT /products/${id} - Invalid payload`);
      return c.json({ message: 'Invalid payload. ProductName, Category, Price, Stock, and Description are required.' }, 400);
    }
    
    // Ensure Price and Stock are numbers
    body.Price = Number(body.Price);
    body.Stock = Number(body.Stock);

    const response = await fetchDownstream(`/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    
    const data = await response.json();
    return c.json(data, response.status);
  } catch (error) {
    console.error(`[BFF ERROR] Internal Server Error on ${c.req.method} ${c.req.path}: ${error.message}`);
    return c.json({ message: 'Internal Server Error' }, 500);
  }
});

// 5. DELETE /products/:id
app.delete('/products/:id', async (c) => {
  const id = c.req.param('id');
  try {
    const response = await fetchDownstream(`/products/${id}`, {
      method: 'DELETE'
    });
    
    const data = await response.json();
    return c.json(data, response.status);
  } catch (error) {
    console.error(`[BFF ERROR] Internal Server Error on ${c.req.method} ${c.req.path}: ${error.message}`);
    return c.json({ message: 'Internal Server Error' }, 500);
  }
});

// Fallback route
app.all('*', (c) => {
  console.log(`[BFF WARNING] Route not found: ${c.req.method} ${c.req.path}`);
  return c.json({ message: 'Route not found' }, 404);
});

export const handler = handle(app);