import {
    getItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem
} from "./itemService.mjs";

const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS"
};

export const handler = async (event) => {
    try {
        const method = event.requestContext?.http?.method || event.httpMethod;
        const path = event.rawPath || event.path;
        const id = event.pathParameters?.id;
        const body = event.body ? JSON.parse(event.body) : null;

        if (method === "OPTIONS") {
            return { statusCode: 200, headers, body: "" };
        }

        if (method === "GET" && path === "/items") {
            const items = await getItems();
            return { statusCode: 200, headers, body: JSON.stringify(items) };
        }

        if (method === "GET" && id) {
            const item = await getItemById(id);
            if (!item) {
                return { statusCode: 404, headers, body: JSON.stringify({ message: "Item not found" }) };
            }
            return { statusCode: 200, headers, body: JSON.stringify(item) };
        }

        if (method === "POST" && path === "/items") {
            const item = await createItem(body);
            return { statusCode: 201, headers, body: JSON.stringify(item) };
        }

        if (method === "PUT" && id) {
            const item = await updateItem(id, body);
            return { statusCode: 200, headers, body: JSON.stringify(item) };
        }

        if (method === "DELETE" && id) {
            const result = await deleteItem(id);
            return { statusCode: 200, headers, body: JSON.stringify(result) };
        }

        return { statusCode: 404, headers, body: JSON.stringify({ message: "Route not found" }) };

    } catch (error) {
        return { statusCode: 500, headers, body: JSON.stringify({ message: error.message }) };
    }
};
