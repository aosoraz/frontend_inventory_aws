export default function DeleteModal({ isOpen, onClose, onConfirm, isDeleting = false }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay Backdrop */}
      <div className="fixed inset-0 bg-on-surface/40 backdrop-blur-sm z-50 transition-opacity flex items-center justify-center p-md">
      {/* Modal Container */}
      <div className="bg-surface-container-lowest rounded-xl shadow-lg w-full max-w-md overflow-hidden transform transition-all scale-100 opacity-100 flex flex-col items-center p-lg border border-outline-variant/30">
        
        {/* Warning Icon */}
        <div className="w-12 h-12 rounded-full bg-error-container flex items-center justify-center mb-md">
          <span className="material-symbols-outlined text-error text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
        </div>
        
        {/* Content */}
        <div className="text-center mb-lg w-full">
          <h3 className="font-h3 text-h3 text-on-surface mb-sm" id="modal-title">Delete Product?</h3>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Are you sure you want to delete this product? This action cannot be undone and will remove the item from all warehouses.
          </p>
        </div>
        
        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-sm w-full mt-xs">
          <button 
            className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-outline bg-surface-container-lowest text-on-surface font-label-md text-label-md rounded hover:bg-surface-container-low transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary" 
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent bg-error text-on-error font-label-md text-label-md rounded hover:bg-[#a31616] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-error shadow-sm disabled:opacity-50" 
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete Product'}
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
