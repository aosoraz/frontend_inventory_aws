import { useState, useCallback } from 'react';
import * as productApi from '../api/productApi';
import { Product, CreateProductInput, UpdateProductInput } from '../types/product';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productApi.getProducts();
      setProducts(data);
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, []);

  const getProduct = async (id: string): Promise<Product | null> => {
    try {
      return await productApi.getProductById(id);
    } catch (err: any) {
      setError(err?.message || `Failed to fetch product with ID: ${id}`);
      return null;
    }
  };

  const createProduct = async (productData: CreateProductInput): Promise<Product | null> => {
    setError(null);
    try {
      // Optimistic UI update could be done here if backend returns predictable ID, 
      // but usually for create it's better to wait for the actual ID.
      const newProduct = await productApi.createProduct(productData);
      setProducts(prev => [...prev, newProduct]);
      return newProduct;
    } catch (err: any) {
      setError(err?.message || 'Failed to create product');
      return null;
    }
  };

  const updateProduct = async (id: string, productData: UpdateProductInput): Promise<Product | null> => {
    setError(null);
    
    // Optimistic UI update
    const previousProducts = [...products];
    setProducts(prev => prev.map(p => p.productId === id ? { ...p, ...productData } : p));
    
    try {
      const updatedProduct = await productApi.updateProduct(id, productData);
      // Replace with actual updated product from server just in case
      setProducts(prev => prev.map(p => p.productId === id ? updatedProduct : p));
      return updatedProduct;
    } catch (err: any) {
      // Revert optimistic update
      setProducts(previousProducts);
      setError(err?.message || 'Failed to update product');
      return null;
    }
  };

  const deleteProduct = async (id: string): Promise<boolean> => {
    setError(null);
    
    // Optimistic UI update
    const previousProducts = [...products];
    setProducts(prev => prev.filter(p => p.productId !== id));
    
    try {
      await productApi.deleteProduct(id);
      return true;
    } catch (err: any) {
      // Revert optimistic update
      setProducts(previousProducts);
      setError(err?.message || 'Failed to delete product');
      return false;
    }
  };

  return {
    products,
    loading,
    error,
    fetchProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
  };
};
