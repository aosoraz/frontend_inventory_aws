import {
    ScanCommand,
    GetCommand,
    PutCommand,
    UpdateCommand,
    DeleteCommand
} from "@aws-sdk/lib-dynamodb";
import { randomUUID } from "crypto";
import docClient from "./dynamodb.mjs";

const TABLE_NAME = "Products";

// GET ALL FUNCTION
export async function getProducts() {

    const result = await docClient.send(
        new ScanCommand({
            TableName: TABLE_NAME
        })
    );

    return result.Items ?? [];

}

// GET BY ID FUNCTION
export async function getProductById(id) {

    const result = await docClient.send(
        new GetCommand({
            TableName: TABLE_NAME,
            Key:{
                ProductId:id
            }
        })
    );

    return result.Item ?? null;

}

// CREATE PRODUCT
export async function createProduct(body) {
    if(!body.ProductName || !body.Category || body.Price === undefined || body.Stock === undefined || !body.Description){
        throw new Error("Invalid request body");
    }

    const now = new Date().toISOString();

    const item = {
        ProductId: randomUUID(),
        ProductName: body.ProductName,
        Category: body.Category,
        Price: body.Price,
        Stock: body.Stock,
        Description: body.Description,
        CreatedAt: now,
        UpdatedAt: now
    };

    await docClient.send(
        new PutCommand({
            TableName: TABLE_NAME,
            Item: item
        })
    );

    return item;

}

// UPDATE PRODUCT
export async function updateProduct(id, body) {
    if (!body.ProductName || !body.Category || body.Price === undefined || body.Stock === undefined || !body.Description) {
        throw new Error("Invalid request body");
    }

    const product = await getProductById(id);

    if (!product) {
        throw new Error("Product not found");
    }

    const now = new Date().toISOString();

    await docClient.send(
        new UpdateCommand({

            TableName: TABLE_NAME,

            Key: {
                ProductId: id
            },

            UpdateExpression:
                "SET #productName = :name, #category = :category, Price = :price, Stock = :stock, Description = :description, UpdatedAt = :updated",

            ExpressionAttributeNames: {
                "#productName": "ProductName",
                "#category": "Category"
            },
            
            ExpressionAttributeValues: {

                ":name": body.ProductName,
                ":category": body.Category,
                ":price": body.Price,
                ":stock": body.Stock,
                ":description": body.Description,
                ":updated": now

            },

            ReturnValues: "NONE"

        })
    );

    return await getProductById(id);
}

// DELETE PRODUCT BY ID
export async function deleteProduct(id) {

    const product = await getProductById(id);

    if(!product){
        throw new Error("Product not found");
    }
    
    await docClient.send(
        new DeleteCommand({
            TableName: TABLE_NAME,
            Key: {
                ProductId: id
            }
        })
    );

    return {
        message: "Product deleted successfully"
    };

}