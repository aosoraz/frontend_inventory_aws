import { formatRupiah } from '../utils/currency';

export default function ProductTable({ products = [], loading = false }) {
  const recentProducts = [...products]
    .sort((a, b) => new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0))
    .slice(0, 5);

  return (
    <div className="lg:col-span-8 bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-[0_1px_3px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col">
      <div className="p-lg border-b border-outline-variant/30 flex justify-between items-center bg-surface/50">
        <h3 className="font-h3 text-h3 text-on-surface">Recent Products</h3>
      </div>
      <div className="overflow-x-auto flex-1">
        {loading ? (
          <div className="flex items-center justify-center p-8 text-on-surface-variant">
            <span className="material-symbols-outlined animate-spin text-primary text-3xl">progress_activity</span>
          </div>
        ) : recentProducts.length === 0 ? (
          <div className="p-8 text-center text-on-surface-variant">
            No products found.
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container-low border-b border-outline-variant/30">
              <tr>
                <th className="font-label-md text-label-md text-on-surface-variant py-3 px-4 font-semibold">Product Name</th>
                <th className="font-label-md text-label-md text-on-surface-variant py-3 px-4 font-semibold capitalize">Category</th>
                <th className="font-label-md text-label-md text-on-surface-variant py-3 px-4 font-semibold text-right">Price</th>
                <th className="font-label-md text-label-md text-on-surface-variant py-3 px-4 font-semibold text-right">Stock</th>
                <th className="font-label-md text-label-md text-on-surface-variant py-3 px-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="font-body-sm text-body-sm text-on-surface divide-y divide-outline-variant/20">
              {recentProducts.map((item) => {
                const getStatusProps = (stock) => {
                  if (stock > 10) return { status: 'Available', statusBg: 'bg-[#DCFCE7]', statusText: 'text-[#10B981]' };
                  if (stock > 0) return { status: 'Low Stock', statusBg: 'bg-[#FEF9C3]', statusText: 'text-[#D97706]' };
                  return { status: 'Out of Stock', statusBg: 'bg-[#FEE2E2]', statusText: 'text-[#EF4444]' };
                };
                const statusProps = getStatusProps(item.stock);
                
                return (
                  <tr key={item.productId || Math.random()} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="py-3 px-4 font-medium">{item.productName}</td>
                    <td className="py-3 px-4 capitalize">{item.category}</td>
                    <td className="py-3 px-4 text-right">{formatRupiah(item.price)}</td>
                    <td className="py-3 px-4 text-right">{item.stock}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-md ${statusProps.statusBg} ${statusProps.statusText} font-label-md text-[10px] uppercase`}>
                        {statusProps.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
