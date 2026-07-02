import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function ProductModal({ isOpen, onClose, product = null, onSave, isSaving = false }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      productName: '',
      category: '',
      price: '',
      stock: '',
      description: ''
    }
  });

  const isEditMode = !!product;

  useEffect(() => {
    if (product && isOpen) {
      reset({
        productName: product.productName || '',
        category: product.category || '',
        price: product.price || '',
        stock: product.stock || '',
        description: product.description || ''
      });
    } else if (isOpen) {
      reset({
        productName: '',
        category: '',
        price: '',
        stock: '',
        description: ''
      });
    }
  }, [product, isOpen, reset]);

  if (!isOpen) return null;

  const onSubmit = (data) => {
    onSave({
      productName: data.productName,
      category: data.category,
      price: parseFloat(data.price) || 0,
      stock: parseInt(data.stock, 10) || 0,
      description: data.description
    });
  };

  return (
    // Modal Overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-on-surface/50 backdrop-blur-sm transition-opacity p-md">
      {/* Modal Dialog */}
      <div className="bg-surface-container-lowest w-full max-w-2xl rounded-lg shadow-xl border border-outline-variant/30 flex flex-col max-h-[90vh] overflow-hidden transform transition-all">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-lg py-md border-b border-outline-variant/50">
          <h2 className="font-h3 text-h3 text-on-surface">
            {isEditMode ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button 
            aria-label="Close modal" 
            className="text-on-surface-variant hover:text-on-surface transition-colors p-xs rounded hover:bg-surface-container-high focus:outline-none focus:ring-2 focus:ring-primary-container" 
            type="button"
            onClick={onClose}
          >
            <span className="material-symbols-outlined" data-icon="close">close</span>
          </button>
        </div>
        
        {/* Modal Body (Form) */}
        <div className="px-lg py-lg overflow-y-auto flex-1">
          <form 
            id="product-form"
            className="grid grid-cols-1 md:grid-cols-2 gap-x-md gap-y-lg"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Product Name (Full Width) */}
            <div className="col-span-1 md:col-span-2 flex flex-col gap-sm">
              <label className="block font-label-md text-label-md text-on-surface-variant" htmlFor="productName">Product Name <span className="text-error">*</span></label>
              <input 
                className={`w-full bg-surface-container-lowest border ${errors.productName ? 'border-error focus:ring-error/20' : 'border-outline-variant focus:border-primary-container focus:ring-primary-container/20'} text-on-surface font-body-md text-body-md rounded px-md py-sm focus:ring-2 placeholder:text-outline outline-none transition-all`} 
                id="productName" 
                placeholder="e.g. Ergonomic Office Chair" 
                type="text" 
                {...register('productName', { required: 'Product Name is required' })}
              />
              {errors.productName && <p className="text-error text-body-sm mt-1">{errors.productName.message}</p>}
            </div>
            
            {/* Category */}
            <div className="col-span-1 flex flex-col gap-sm">
              <label className="block font-label-md text-label-md text-on-surface-variant" htmlFor="category">Category <span className="text-error">*</span></label>
              <div className="relative">
                <select 
                  className={`w-full appearance-none bg-surface-container-lowest border ${errors.category ? 'border-error focus:ring-error/20' : 'border-outline-variant focus:border-primary-container focus:ring-primary-container/20'} text-on-surface font-body-md text-body-md rounded px-md py-sm pr-lg focus:ring-2 outline-none transition-all cursor-pointer`} 
                  id="category" 
                  {...register('category', { required: 'Category is required' })}
                >
                  <option disabled value="">Select category</option>
                  <option value="furniture">Furniture</option>
                  <option value="electronics">Electronics</option>
                  <option value="supplies">Office Supplies</option>
                </select>
                <span className="material-symbols-outlined absolute right-sm top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant" data-icon="expand_more">expand_more</span>
              </div>
              {errors.category && <p className="text-error text-body-sm mt-1">{errors.category.message}</p>}
            </div>
            
            {/* Price */}
            <div className="col-span-1 flex flex-col gap-sm">
              <label className="block font-label-md text-label-md text-on-surface-variant" htmlFor="price">Price</label>
              <div className="relative">
                <span className="absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant font-body-md text-body-sm pointer-events-none">Rp</span>
                <input 
                  className={`w-full bg-surface-container-lowest border ${errors.price ? 'border-error focus:ring-error/20' : 'border-outline-variant focus:border-primary-container focus:ring-primary-container/20'} text-on-surface font-body-md text-body-md rounded pl-xl pr-md py-sm focus:ring-2 placeholder:text-outline outline-none transition-all`} 
                  id="price" 
                  placeholder="0" 
                  step="1" 
                  type="number"
                  {...register('price', { min: { value: 0, message: 'Price cannot be negative' } })}
                />
              </div>
              {errors.price && <p className="text-error text-body-sm mt-1">{errors.price.message}</p>}
            </div>
            
            {/* Quantity / Stock */}
            <div className="col-span-1 flex flex-col gap-sm">
              <label className="block font-label-md text-label-md text-on-surface-variant" htmlFor="quantity">
                {isEditMode ? 'Stock Quantity' : 'Initial Quantity'}
              </label>
              <input 
                className={`w-full bg-surface-container-lowest border ${errors.stock ? 'border-error focus:ring-error/20' : 'border-outline-variant focus:border-primary-container focus:ring-primary-container/20'} text-on-surface font-body-md text-body-md rounded px-md py-sm focus:ring-2 placeholder:text-outline outline-none transition-all`} 
                id="quantity" 
                placeholder="0" 
                step="1" 
                type="number"
                {...register('stock', { min: { value: 0, message: 'Stock cannot be negative' } })}
              />
              {errors.stock && <p className="text-error text-body-sm mt-1">{errors.stock.message}</p>}
            </div>
            
            {/* Description (Full Width) */}
            <div className="col-span-1 md:col-span-2 flex flex-col gap-sm">
              <label className="block font-label-md text-label-md text-on-surface-variant" htmlFor="description">Description</label>
              <textarea 
                className="w-full bg-surface-container-lowest border border-outline-variant text-on-surface font-body-md text-body-md rounded px-md py-sm focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 placeholder:text-outline outline-none transition-all resize-y" 
                id="description" 
                placeholder="Brief details about the product..." 
                rows="3"
                {...register('description')}
              ></textarea>
            </div>
          </form>
        </div>
        
        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-md px-lg py-md border-t border-outline-variant/50 bg-surface-bright">
          <button 
            className="px-md py-sm font-label-md text-label-md text-on-surface-variant border border-outline-variant bg-surface-container-lowest rounded hover:bg-surface-container-low focus:outline-none focus:ring-2 focus:ring-primary-container transition-colors" 
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            form="product-form"
            className="px-md py-sm font-label-md text-label-md text-on-primary bg-primary rounded shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary-container focus:ring-offset-2 focus:ring-offset-surface-bright transition-colors flex items-center gap-xs disabled:opacity-50" 
            type="submit"
            disabled={isSaving}
          >
            <span className="material-symbols-outlined text-[18px]" data-icon="save">
              {isSaving ? 'sync' : 'save'}
            </span>
            {isSaving ? 'Saving...' : (isEditMode ? 'Save Changes' : 'Save Product')}
          </button>
        </div>
      </div>
    </div>
  );
}
