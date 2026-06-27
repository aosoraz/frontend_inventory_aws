export default function ProductModal({ isOpen, onClose, product = null, onSave, isSaving = false }) {
  if (!isOpen) return null;

  const isEditMode = !!product;

  return (
    // Modal Overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-on-surface/50 backdrop-blur-sm transition-opacity p-md">
      {/* Modal Dialog */}
      <div className="bg-surface-container-lowest w-full max-w-lg rounded-lg shadow-xl border border-outline-variant/30 flex flex-col max-h-[921px] overflow-hidden transform transition-all">
        
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
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              onSave({
                productName: formData.get('productName'),
                category: formData.get('category'),
                sku: formData.get('sku'),
                price: parseFloat(formData.get('price')) || 0,
                stock: parseInt(formData.get('quantity'), 10) || 0,
                description: formData.get('description')
              });
            }}
          >
            {/* Product Name (Full Width) */}
            <div className="col-span-1 md:col-span-2 space-y-sm">
              <label className="block font-label-md text-label-md text-on-surface-variant" htmlFor="productName">Product Name <span className="text-error">*</span></label>
              <input 
                className="w-full bg-surface-container-lowest border border-outline-variant text-on-surface font-body-md text-body-md rounded px-md py-sm focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 placeholder:text-outline outline-none transition-all" 
                id="productName" 
                name="productName" 
                placeholder="e.g. Ergonomic Office Chair" 
                required 
                type="text" 
                defaultValue={product?.productName || ''}
              />
            </div>
            
            {/* Category */}
            <div className="col-span-1 space-y-sm">
              <label className="block font-label-md text-label-md text-on-surface-variant" htmlFor="category">Category</label>
              <div className="relative">
                <select 
                  className="w-full appearance-none bg-surface-container-lowest border border-outline-variant text-on-surface font-body-md text-body-md rounded px-md py-sm pr-lg focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 outline-none transition-all cursor-pointer" 
                  id="category" 
                  name="category"
                  defaultValue={product?.category || ''}
                >
                  <option disabled value="">Select category</option>
                  <option value="furniture">Furniture</option>
                  <option value="electronics">Electronics</option>
                  <option value="supplies">Office Supplies</option>
                </select>
                <span className="material-symbols-outlined absolute right-sm top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant" data-icon="expand_more">expand_more</span>
              </div>
            </div>
            
            {/* SKU */}
            <div className="col-span-1 space-y-sm">
              <label className="block font-label-md text-label-md text-on-surface-variant" htmlFor="sku">SKU</label>
              <input 
                className="w-full bg-surface-container-lowest border border-outline-variant text-on-surface font-body-md text-body-md rounded px-md py-sm focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 placeholder:text-outline outline-none transition-all uppercase" 
                id="sku" 
                name="sku" 
                placeholder="e.g. FUR-CHR-001" 
                type="text"
                defaultValue={product?.sku || ''}
              />
            </div>
            
            {/* Price */}
            <div className="col-span-1 space-y-sm">
              <label className="block font-label-md text-label-md text-on-surface-variant" htmlFor="price">Price</label>
              <div className="relative">
                <span className="absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant font-body-md text-body-md pointer-events-none">$</span>
                <input 
                  className="w-full bg-surface-container-lowest border border-outline-variant text-on-surface font-body-md text-body-md rounded pl-lg pr-md py-sm focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 placeholder:text-outline outline-none transition-all" 
                  id="price" 
                  min="0" 
                  name="price" 
                  placeholder="0.00" 
                  step="0.01" 
                  type="number"
                  defaultValue={product?.price || ''}
                />
              </div>
            </div>
            
            {/* Quantity */}
            <div className="col-span-1 space-y-sm">
              <label className="block font-label-md text-label-md text-on-surface-variant" htmlFor="quantity">
                {isEditMode ? 'Stock Quantity' : 'Initial Quantity'}
              </label>
              <input 
                className="w-full bg-surface-container-lowest border border-outline-variant text-on-surface font-body-md text-body-md rounded px-md py-sm focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 placeholder:text-outline outline-none transition-all" 
                id="quantity" 
                min="0" 
                name="quantity" 
                placeholder="0" 
                step="1" 
                type="number"
                defaultValue={product?.stock || ''}
              />
            </div>
            
            {/* Description (Full Width) */}
            <div className="col-span-1 md:col-span-2 space-y-sm">
              <label className="block font-label-md text-label-md text-on-surface-variant" htmlFor="description">Description</label>
              <textarea 
                className="w-full bg-surface-container-lowest border border-outline-variant text-on-surface font-body-md text-body-md rounded px-md py-sm focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 placeholder:text-outline outline-none transition-all resize-y" 
                id="description" 
                name="description" 
                placeholder="Brief details about the product..." 
                rows="3"
                defaultValue={product?.description || ''}
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
