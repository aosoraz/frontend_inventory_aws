import React, { useState, useEffect } from 'react';
import ProductModal from '../components/ProductModal';
import DeleteModal from '../components/DeleteModal';
import { useProducts } from '../hooks/useProducts';

export default function Products() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  const [productToEdit, setProductToEdit] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);

  const { products, loading, error, fetchProducts, createProduct, updateProduct, deleteProduct } = useProducts();
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleOpenAddModal = () => {
    setProductToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setProductToEdit(product);
    setIsModalOpen(true);
  };

  const handleOpenDeleteModal = (product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const handleSaveProduct = async (productData) => {
    setIsSaving(true);
    if (productToEdit) {
      await updateProduct(productToEdit.productId, productData);
    } else {
      await createProduct(productData);
    }
    setIsSaving(false);
    setIsModalOpen(false);
    setProductToEdit(null);
  };

  const handleDeleteConfirm = async () => {
    if (productToDelete) {
      setIsDeleting(true);
      await deleteProduct(productToDelete.productId);
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
      setProductToDelete(null);
    }
  };

  // Derived properties for status visualization
  const getStatusProps = (stock) => {
    if (stock > 10) return { status: 'Available', statusBg: 'bg-[#DCFCE7]', statusText: 'text-[#10B981]' };
    if (stock > 0) return { status: 'Low Stock', statusBg: 'bg-[#FEF9C3]', statusText: 'text-[#D97706]' };
    return { status: 'Out of Stock', statusBg: 'bg-[#FEE2E2]', statusText: 'text-[#EF4444]' };
  };

  return (
    <>
      <div className="max-w-[1440px] mx-auto">
        {/* Page Header & Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-lg gap-md">
          <h2 className="font-h1 text-h1 text-on-surface">Products</h2>
          <div className="flex items-center space-x-sm">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" style={{ fontSize: '18px' }}>filter_list</span>
              <select className="appearance-none bg-surface-container-lowest border border-outline-variant text-on-surface text-body-sm rounded-md pl-xl pr-lg py-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors cursor-pointer hover:bg-surface-container-low">
                <option>All Categories</option>
                <option>Electronics</option>
                <option>Furniture</option>
                <option>Office Supplies</option>
              </select>
              <span className="material-symbols-outlined absolute right-sm top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" style={{ fontSize: '18px' }}>expand_more</span>
            </div>
            <button 
              className="bg-[#2563EB] text-white font-label-md text-label-md px-md py-sm rounded-md flex items-center space-x-xs hover:bg-[#1D4ED8] transition-colors shadow-sm active:scale-95"
              onClick={handleOpenAddModal}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
              <span>Add Product</span>
            </button>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-lg p-md bg-error/10 border border-error/20 rounded-md text-error flex items-center gap-2">
            <span className="material-symbols-outlined">error</span>
            <span>{error}</span>
          </div>
        )}

        {/* Data Table Container */}
        <div className="bg-surface-container-lowest rounded-lg border border-outline-variant shadow-[0_1px_3px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col">
          <div className="overflow-x-auto min-h-[300px]">
            {loading ? (
              <div className="flex items-center justify-center h-full min-h-[300px]">
                <span className="material-symbols-outlined animate-spin text-primary text-4xl">progress_activity</span>
              </div>
            ) : products.length === 0 ? (
               <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-on-surface-variant">
                  <span className="material-symbols-outlined text-4xl mb-2">inventory_2</span>
                  <p>No products found. Add some to get started.</p>
               </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low border-b border-outline-variant">
                    <th className="py-sm px-md font-label-md text-label-md text-on-surface-variant font-semibold">Product</th>
                    <th className="py-sm px-md font-label-md text-label-md text-on-surface-variant font-semibold">Category</th>
                    <th className="py-sm px-md font-label-md text-label-md text-on-surface-variant font-semibold">Price</th>
                    <th className="py-sm px-md font-label-md text-label-md text-on-surface-variant font-semibold">Stock</th>
                    <th className="py-sm px-md font-label-md text-label-md text-on-surface-variant font-semibold">Status</th>
                    <th className="py-sm px-md font-label-md text-label-md text-on-surface-variant font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant font-body-sm">
                  {products.map((product) => {
                    const statusProps = getStatusProps(product.stock);
                    return (
                      <tr key={product.productId} className="hover:bg-[#F1F5F9] transition-colors group">
                        <td className="py-md px-md flex items-center space-x-md">
                          <div className="w-10 h-10 rounded-md bg-surface-container flex items-center justify-center overflow-hidden border border-outline-variant/50 text-on-surface-variant">
                            <span className="material-symbols-outlined">inventory_2</span>
                          </div>
                          <span className="font-semibold text-on-surface">{product.productName}</span>
                        </td>
                        <td className="py-md px-md text-secondary capitalize">{product.category}</td>
                        <td className="py-md px-md text-on-surface font-code text-code">${product.price?.toFixed(2)}</td>
                        <td className="py-md px-md text-on-surface">{product.stock}</td>
                        <td className="py-md px-md">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full ${statusProps.statusBg} ${statusProps.statusText} font-label-md text-[10px] tracking-wide uppercase`}>
                            {statusProps.status}
                          </span>
                        </td>
                        <td className="py-md px-md text-right whitespace-nowrap">
                          <button 
                            className="text-on-surface-variant hover:text-primary transition-colors p-1 rounded hover:bg-surface-container-high focus:opacity-100"
                            onClick={() => handleOpenEditModal(product)}
                            title="Edit"
                          >
                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>edit</span>
                          </button>
                          <button 
                            className="text-on-surface-variant hover:text-error transition-colors p-1 rounded hover:bg-surface-container-high focus:opacity-100 ml-1"
                            onClick={() => handleOpenDeleteModal(product)}
                            title="Delete"
                          >
                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>delete</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          {!loading && products.length > 0 && (
            <div className="border-t border-outline-variant bg-surface-container-lowest px-md py-sm flex items-center justify-between">
              <span className="font-body-sm text-secondary">Showing 1-{products.length} of {products.length} products</span>
              <div className="flex items-center space-x-xs">
                <button className="px-sm py-xs border border-outline-variant rounded bg-surface-container-lowest text-secondary font-label-md text-label-md hover:bg-surface-container-low transition-colors disabled:opacity-50" disabled>Prev</button>
                <button className="w-8 h-8 flex items-center justify-center border border-primary bg-primary-fixed text-primary-fixed-dim rounded font-label-md text-label-md">1</button>
                <button className="px-sm py-xs border border-outline-variant rounded bg-surface-container-lowest text-secondary font-label-md text-label-md hover:bg-surface-container-low transition-colors disabled:opacity-50" disabled>Next</button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Product Edit/Add Modal */}
      <ProductModal 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); setProductToEdit(null); }} 
        product={productToEdit}
        onSave={handleSaveProduct}
        isSaving={isSaving}
      />
      
      {/* Delete Confirmation Modal */}
      <DeleteModal 
        isOpen={isDeleteModalOpen} 
        onClose={() => { setIsDeleteModalOpen(false); setProductToDelete(null); }} 
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
      />
    </>
  );
}
