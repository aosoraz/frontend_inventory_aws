import React from 'react';
import DashboardCard from '../components/DashboardCard';
import ProductTable from '../components/ProductTable';

export default function Dashboard() {
  return (
    <div className="max-w-[var(--spacing-max-content-width)] mx-auto">
      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md md:gap-lg mb-lg">
        <DashboardCard
          title="Total Products"
          icon="inventory"
          value="1,240"
          subText="12%"
          subTextColor="text-green-600"
          trendIcon="arrow_upward"
          iconBgColor="bg-primary-container/10"
          iconTextColor="text-primary"
        />
        <DashboardCard
          title="Available Stock"
          icon="check_circle"
          value="982"
          subText="items"
          iconBgColor="bg-green-100"
          iconTextColor="text-green-600"
        />
        <DashboardCard
          title="Low Stock"
          icon="warning"
          value="18"
          subText="Needs restock"
          subTextColor="text-tertiary-container font-semibold"
          iconBgColor="bg-tertiary-container/10"
          iconTextColor="text-tertiary-container"
          borderClass="border-l-4 border-l-tertiary-container"
        />
        <DashboardCard
          title="Out of Stock"
          icon="error"
          value="5"
          subText="Critical"
          subTextColor="text-error font-semibold"
          iconBgColor="bg-error/10"
          iconTextColor="text-error"
          borderClass="border-l-4 border-l-error"
        />
      </div>

      {/* Bento Grid for Table and Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
        {/* Recent Activity Table */}
        <ProductTable />

        {/* Stock Overview Chart Placeholder */}
        <div className="lg:col-span-4 bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-[0_1px_3px_rgba(0,0,0,0.05)] p-lg flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-h3 text-h3 text-on-surface">Inventory Trends</h3>
            <span className="font-label-md text-label-md text-on-surface-variant bg-surface-container px-2 py-1 rounded">7 Days</span>
          </div>
          
          {/* Simple CSS Bar Chart Representation */}
          <div className="flex-1 flex items-end justify-between gap-2 h-48 pt-4 border-b border-l border-outline-variant/30 pl-2 pb-2 relative">
            {/* Y-axis labels */}
            <div className="absolute left-[-24px] top-0 bottom-0 flex flex-col justify-between text-[10px] text-on-surface-variant font-code">
              <span>1k</span>
              <span>500</span>
              <span>0</span>
            </div>
            
            {/* Bars */}
            <div className="w-full bg-primary/20 hover:bg-primary/40 rounded-t-sm transition-colors relative group" style={{ height: '40%' }}>
              <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-on-primary text-[10px] py-1 px-2 rounded whitespace-nowrap transition-opacity">400 items</div>
            </div>
            <div className="w-full bg-primary/40 hover:bg-primary/60 rounded-t-sm transition-colors relative group" style={{ height: '60%' }}>
              <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-on-primary text-[10px] py-1 px-2 rounded whitespace-nowrap transition-opacity">600 items</div>
            </div>
            <div className="w-full bg-primary/30 hover:bg-primary/50 rounded-t-sm transition-colors relative group" style={{ height: '50%' }}>
              <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-on-primary text-[10px] py-1 px-2 rounded whitespace-nowrap transition-opacity">500 items</div>
            </div>
            <div className="w-full bg-primary/60 hover:bg-primary/80 rounded-t-sm transition-colors relative group" style={{ height: '80%' }}>
              <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-on-primary text-[10px] py-1 px-2 rounded whitespace-nowrap transition-opacity">800 items</div>
            </div>
            <div className="w-full bg-primary-container hover:bg-primary rounded-t-sm transition-colors relative group" style={{ height: '95%' }}>
              <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-on-primary text-[10px] py-1 px-2 rounded whitespace-nowrap transition-opacity">950 items</div>
            </div>
            <div className="w-full bg-primary/50 hover:bg-primary/70 rounded-t-sm transition-colors relative group" style={{ height: '70%' }}>
              <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-on-primary text-[10px] py-1 px-2 rounded whitespace-nowrap transition-opacity">700 items</div>
            </div>
            <div className="w-full bg-primary/80 hover:bg-primary rounded-t-sm transition-colors relative group" style={{ height: '85%' }}>
              <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-on-primary text-[10px] py-1 px-2 rounded whitespace-nowrap transition-opacity">850 items</div>
            </div>
          </div>
          
          {/* X-axis labels */}
          <div className="flex justify-between mt-2 text-[10px] text-on-surface-variant font-code pl-2">
            <span>M</span>
            <span>T</span>
            <span>W</span>
            <span>T</span>
            <span>F</span>
            <span>S</span>
            <span>S</span>
          </div>
        </div>
      </div>
    </div>
  );
}
