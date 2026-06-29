export default function ProductTable() {
  const activities = [
    { id: 1, name: 'Logitech MX Master 3', action: 'Stock In', actionIcon: 'arrow_downward', actionColor: 'text-green-600', qty: '+50', date: 'Today, 10:42 AM', status: 'Completed', statusBg: 'bg-green-100', statusText: 'text-green-800' },
    { id: 2, name: 'Ergonomic Chair Pro', action: 'Stock Out', actionIcon: 'arrow_upward', actionColor: 'text-tertiary-container', qty: '-12', date: 'Yesterday, 02:15 PM', status: 'Pending', statusBg: 'bg-yellow-100', statusText: 'text-yellow-800' },
    { id: 3, name: 'Dell UltraSharp 27"', action: 'Stock In', actionIcon: 'arrow_downward', actionColor: 'text-green-600', qty: '+100', date: 'Oct 24, 09:00 AM', status: 'Completed', statusBg: 'bg-green-100', statusText: 'text-green-800' },
    { id: 4, name: 'Keychron K2 Keyboard', action: 'Stock Out', actionIcon: 'arrow_upward', actionColor: 'text-tertiary-container', qty: '-5', date: 'Oct 23, 04:30 PM', status: 'Completed', statusBg: 'bg-green-100', statusText: 'text-green-800' },
    { id: 5, name: 'Anker USB-C Hub', action: 'Stock Out', actionIcon: 'arrow_upward', actionColor: 'text-tertiary-container', qty: '-20', date: 'Oct 22, 11:20 AM', status: 'Completed', statusBg: 'bg-green-100', statusText: 'text-green-800' },
  ];

  return (
    <div className="lg:col-span-8 bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-[0_1px_3px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col">
      <div className="p-lg border-b border-outline-variant/30 flex justify-between items-center bg-surface/50">
        <h3 className="font-h3 text-h3 text-on-surface">Recent Activity</h3>
        <button className="font-label-md text-label-md text-primary hover:text-primary-fixed-variant transition-colors">View All</button>
      </div>
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead className="bg-surface-container-low border-b border-outline-variant/30">
            <tr>
              <th className="font-label-md text-label-md text-on-surface-variant py-3 px-4 font-semibold">Product Name</th>
              <th className="font-label-md text-label-md text-on-surface-variant py-3 px-4 font-semibold">Action</th>
              <th className="font-label-md text-label-md text-on-surface-variant py-3 px-4 font-semibold text-right">Qty</th>
              <th className="font-label-md text-label-md text-on-surface-variant py-3 px-4 font-semibold">Date</th>
              <th className="font-label-md text-label-md text-on-surface-variant py-3 px-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="font-body-sm text-body-sm text-on-surface divide-y divide-outline-variant/20">
            {activities.map((item) => (
              <tr key={item.id} className="hover:bg-surface-container-low/50 transition-colors">
                <td className="py-3 px-4 font-medium">{item.name}</td>
                <td className="py-3 px-4">
                  <span className={`flex items-center ${item.actionColor}`}>
                    <span className="material-symbols-outlined text-sm mr-1" data-icon={item.actionIcon}>{item.actionIcon}</span>
                    {item.action}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">{item.qty}</td>
                <td className="py-3 px-4 text-on-surface-variant">{item.date}</td>
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-md ${item.statusBg} ${item.statusText} font-label-md text-[10px] uppercase`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
