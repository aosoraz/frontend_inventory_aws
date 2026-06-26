import React, { useState } from 'react';
import ProductModal from '../components/ProductModal';
import DeleteModal from '../components/DeleteModal';

export default function Products() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const products = [
    {
      id: 1,
      name: 'MacBook Pro 16"',
      category: 'Electronics',
      price: '$2,499.00',
      stock: 42,
      status: 'Available',
      statusBg: 'bg-[#DCFCE7]',
      statusText: 'text-[#10B981]',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAi2z7r4iHB_TuQW2V3kZhP2V6Ny8fA8jxNdDhknn-zaAX524QWPVrrTrmQwYKolkunleeMuSxwl33JhWRkInIISe4hBiAlNlWGeaLKZpR3E3BDCmvwK9D3N6mSUvqAzfM_8gaz0Rq_zYtM7f1oUCpYDNxAfHfDr4AtyXQMtDzMTrsnLpGruANHflIsuBxjTiF9Kd4bt2HeT7159icswDA-5fM-5zmJ3Xq22etXCpPC7n2V5gm_GJpXfeAQHOXcIFKpjrpkztOJcQY'
    },
    {
      id: 2,
      name: 'ErgoChair Pro',
      category: 'Furniture',
      price: '$499.00',
      stock: 5,
      status: 'Low Stock',
      statusBg: 'bg-[#FEF9C3]',
      statusText: 'text-[#D97706]',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAO9Tada1EwfTXQWRI8JOP4IHusANEHSwWJRlih7lqeqU8nFhz4nYJMY-B6DG4gZMEK7UoJNETQCTHsErqI1rNxKSPfkvnfPBUGlhTKqE8rwdXKUgyf1sfqGPJfJSzSiqo3i64rp3fmrH83O3g3GLhBl-fjZULRXriq74nMWdQsXVrSG9617AW2dBUnify5YIihuER6TERhlHN0HNsobxi3gdQNdPv1y51XQje1WFHTEszuHemtR3N-srNSFBWTI01J-y2g0NQPcfE'
    },
    {
      id: 3,
      name: 'Keychron K2',
      category: 'Electronics',
      price: '$99.00',
      stock: 0,
      status: 'Out of Stock',
      statusBg: 'bg-[#FEE2E2]',
      statusText: 'text-[#EF4444]',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDT45R90YsJaSXXCDPbpV62mq429Y9P7b5zajmAwHXCO6b4zttlOsbeEs-pyQVl2UyOZcysEij6hc0cFtAcoV6egX_ceHw9edFHI6WzJ4jtukRUYegk7a55r7-K4HJGD6b6Or5RFA_WBeZUOb0pld4LArV3iTB0U9v25Nl9r0PJVzp_8hN6gUq7ebPNaSZR1rBSLUllI9sxlJNaSSylrvN3Iba4XaamC7FH6h8kWQHe3OYbCa9pllvJpcyBNbKGY-udTPVCqHqb50Y'
    }
  ];

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
              onClick={() => setIsModalOpen(true)}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
              <span>Add Product</span>
            </button>
          </div>
        </div>

        {/* Data Table Container */}
        <div className="bg-surface-container-lowest rounded-lg border border-outline-variant shadow-[0_1px_3px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
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
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-[#F1F5F9] transition-colors group">
                    <td className="py-md px-md flex items-center space-x-md">
                      <div className="w-10 h-10 rounded-md bg-surface-container overflow-hidden border border-outline-variant/50">
                        <img className="w-full h-full object-cover" src={product.image} alt={product.name} />
                      </div>
                      <span className="font-semibold text-on-surface">{product.name}</span>
                    </td>
                    <td className="py-md px-md text-secondary">{product.category}</td>
                    <td className="py-md px-md text-on-surface font-code text-code">{product.price}</td>
                    <td className="py-md px-md text-on-surface">{product.stock}</td>
                    <td className="py-md px-md">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full ${product.statusBg} ${product.statusText} font-label-md text-[10px] tracking-wide uppercase`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="py-md px-md text-right">
                      <button 
                        className="text-on-surface-variant hover:text-primary transition-colors p-1 rounded hover:bg-surface-container-high opacity-0 group-hover:opacity-100 focus:opacity-100"
                        onClick={() => setIsModalOpen(true)}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>more_vert</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="border-t border-outline-variant bg-surface-container-lowest px-md py-sm flex items-center justify-between">
            <span className="font-body-sm text-secondary">Showing 1-3 of 24 products</span>
            <div className="flex items-center space-x-xs">
              <button className="px-sm py-xs border border-outline-variant rounded bg-surface-container-lowest text-secondary font-label-md text-label-md hover:bg-surface-container-low transition-colors disabled:opacity-50" disabled>Prev</button>
              <button className="w-8 h-8 flex items-center justify-center border border-primary bg-primary-fixed text-primary-fixed-dim rounded font-label-md text-label-md">1</button>
              <button className="w-8 h-8 flex items-center justify-center border border-outline-variant bg-surface-container-lowest text-secondary rounded font-label-md text-label-md hover:bg-surface-container-low transition-colors">2</button>
              <button className="w-8 h-8 flex items-center justify-center border border-outline-variant bg-surface-container-lowest text-secondary rounded font-label-md text-label-md hover:bg-surface-container-low transition-colors">3</button>
              <button className="px-sm py-xs border border-outline-variant rounded bg-surface-container-lowest text-secondary font-label-md text-label-md hover:bg-surface-container-low transition-colors">Next</button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Edit/Add Modal */}
      <ProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      {/* Delete Confirmation Modal */}
      <DeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} />
    </>
  );
}
