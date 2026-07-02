import api from './axios';
import { Product, CreateProductInput, UpdateProductInput } from '../types/product';

function toCamelCase(item: any): Product {
  return {
    productId: item.ProductId ?? item.productId ?? '',
    productName: item.ProductName ?? item.productName ?? '',
    category: item.Category ?? item.category ?? '',
    price: item.Price ?? item.price ?? 0,
    stock: item.Stock ?? item.stock ?? 0,
    description: item.Description ?? item.description ?? '',
    createdAt: item.CreatedAt ?? item.createdAt,
    updatedAt: item.UpdatedAt ?? item.updatedAt,
  };
}

function toPascalCase(input: CreateProductInput | UpdateProductInput) {
  return {
    ProductName: input.productName,
    Category: input.category,
    Price: input.price,
    Stock: input.stock,
    Description: input.description,
  };
}

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get<any[]>('/products');
  const data = Array.isArray(response.data) ? response.data : [];
  return data.map(toCamelCase);
};

export const getProductById = async (id: string): Promise<Product> => {
  const response = await api.get<any>(`/products/${id}`);
  return toCamelCase(response.data);
};

export const createProduct = async (product: CreateProductInput): Promise<Product> => {
  const response = await api.post<any>('/products', toPascalCase(product));
  return toCamelCase(response.data);
};

export const updateProduct = async (id: string, product: UpdateProductInput): Promise<Product> => {
  const response = await api.put<any>(`/products/${id}`, toPascalCase(product));
  return toCamelCase(response.data);
};

export const deleteProduct = async (id: string): Promise<void> => {
  await api.delete(`/products/${id}`);
};
