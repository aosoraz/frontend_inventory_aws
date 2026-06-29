export interface Product {
  productId: string;
  productName: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

export type CreateProductInput = Omit<Product, 'productId' | 'createdAt' | 'updatedAt'>;
export type UpdateProductInput = CreateProductInput;
