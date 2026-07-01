import {
    ScanCommand,
    GetCommand,
    PutCommand,
    UpdateCommand,
    DeleteCommand
} from "@aws-sdk/lib-dynamodb";
import { randomUUID } from "crypto";
import docClient from "./dynamodb.mjs";

const TABLE_NAME = "Items";

export async function getItems() {
    const result = await docClient.send(
        new ScanCommand({
            TableName: TABLE_NAME
        })
    );
    return result.Items ?? [];
}

export async function getItemById(id) {
    const result = await docClient.send(
        new GetCommand({
            TableName: TABLE_NAME,
            Key: {
                id: id
            }
        })
    );
    return result.Item ?? null;
}

export async function createItem(body) {
    if(!body.name || body.price === undefined || body.stock === undefined){
        throw new Error("Invalid request body");
    }
    const now = new Date().toISOString();
    const item = {
        id: randomUUID(),
        name: body.name,
        description: body.description || "",
        price: body.price,
        stock: body.stock,
        createdAt: now,
        updatedAt: now
    };
    await docClient.send(
        new PutCommand({
            TableName: TABLE_NAME,
            Item: item
        })
    );
    return item;
}

export async function updateItem(id, body) {
    if(!body.name || body.price === undefined || body.stock === undefined){
        throw new Error("Invalid request body");
    }
    const item = await getItemById(id);
    if (!item) {
        throw new Error("Item not found");
    }
    const now = new Date().toISOString();
    await docClient.send(
        new UpdateCommand({
            TableName: TABLE_NAME,
            Key: {
                id: id
            },
            UpdateExpression:
                "SET #name = :name, #desc = :desc, price = :price, stock = :stock, updatedAt = :updated",
            ExpressionAttributeNames: {
                "#name": "name",
                "#desc": "description"
            },
            ExpressionAttributeValues: {
                ":name": body.name,
                ":desc": body.description || "",
                ":price": body.price,
                ":stock": body.stock,
                ":updated": now
            },
            ReturnValues: "NONE"
        })
    );
    return await getItemById(id);
}

export async function deleteItem(id) {
    const item = await getItemById(id);
    if(!item){
        throw new Error("Item not found");
    }
    await docClient.send(
        new DeleteCommand({
            TableName: TABLE_NAME,
            Key: {
                id: id
            }
        })
    );
    return {
        message: "Item deleted successfully"
    };
}
