import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from "./databaseService.mjs";

const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS"
};

export const handler = async (event) => {

    try {

        const method = event.requestContext.http.method;
        const path = event.rawPath;
        const id = event.pathParameters?.id;
        const body = event.body ? JSON.parse(event.body) : null;

        // CORS Preflight
        if (method === "OPTIONS") {
            return {
                statusCode: 200,
                headers
            };
        }

        // GET /products
        if (method === "GET" && path === "/products") {

            const products = await getProducts();

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify(products)
            };

        }

        // GET /products/{id}
        if (method === "GET" && id) {

            const product = await getProductById(id);

            if (!product) {

                return {
                    statusCode: 404,
                    headers,
                    body: JSON.stringify({
                        message: "Product not found"
                    })
                };

            }

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify(product)
            };

        }

        // POST /products
        if (method === "POST") {

            const product = await createProduct(body);

            return {
                statusCode: 201,
                headers,
                body: JSON.stringify(product)
            };

        }

        // PUT /products/{id}
        if (method === "PUT" && id) {

            const product = await updateProduct(id, body);

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify(product)
            };

        }

        // DELETE /products/{id}
        if (method === "DELETE" && id) {

            const result = await deleteProduct(id);

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify(result)
            };

        }

        return {
            statusCode: 404,
            headers,
            body: JSON.stringify({
                message: "Route not found"
            })
        };

    } catch (error) {

        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                message: error.message
            })
        };

    }

};