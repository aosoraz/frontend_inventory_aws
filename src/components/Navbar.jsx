export default function Navbar({ children }) {
  return (
    <div className="h-full flex overflow-hidden">
      {/* SideNavBar */}
      <aside className="fixed left-0 top-0 h-full w-sidebar-width bg-inverse-surface dark:bg-inverse-surface flex flex-col py-lg px-md z-20">
        <div className="flex items-center mb-xl">
          <span className="material-symbols-outlined text-primary-container text-3xl mr-3" data-icon="inventory_2" style={{ fontVariationSettings: "'FILL' 1" }}>
            inventory_2
          </span>
          <div>
            <h1 className="font-h3 text-h3 text-surface-lowest dark:text-surface-bright m-0">InventoryPro</h1>
            <p className="font-body-sm text-body-sm text-secondary-fixed-dim m-0">Management Suite</p>
          </div>
        </div>
        
        <nav className="flex-1 space-y-2">
          <a className="flex items-center px-4 py-3 rounded-lg bg-secondary dark:bg-secondary-fixed-dim text-on-primary border-l-4 border-primary-container hover:bg-secondary-fixed-variant transition-colors duration-200" href="#">
            <span className="material-symbols-outlined mr-3" data-icon="dashboard">dashboard</span>
            <span className="font-body-md text-body-md font-semibold">Dashboard</span>
          </a>
          <a className="flex items-center px-4 py-3 rounded-lg text-secondary-fixed-dim hover:bg-secondary-fixed-variant transition-colors duration-200" href="#">
            <span className="material-symbols-outlined mr-3" data-icon="inventory_2">inventory_2</span>
            <span className="font-body-md text-body-md">Products</span>
          </a>
        </nav>
        
        <div className="mt-auto pt-lg border-t border-secondary">
          <div className="flex items-center">
            <img alt="Company Logo" className="w-10 h-10 rounded-full bg-secondary-fixed-dim object-cover mr-3" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6nCRPRaM9DaGEOfi1nMIc_eckY5XEb08-Fg0XYhHPwDAniK5BDxnrk90lzYQA4idomrnkgaou_vhptXY2Z2x0QMHMQLvOyai7JZzlL1ThFlVN6baXVILdlpnwhMTh9rduV8kh89D5g5roNXIAB2-tkQ0mKNMBEEks20FNzlF0T-9jUC3z3aMGvvnSGYXPais7JH75omB8LpHTW6tNbU2tJVU0pOuOsNJ0cfi4_4-dAmiyxFITEzvpgfiy1wrjFRcSOcqQ7nUQb9k" />
            <div className="text-secondary-fixed-dim">
              <p className="font-label-md text-label-md m-0">Admin User</p>
              <p className="font-body-sm text-body-sm m-0 opacity-80">Settings</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-[var(--spacing-sidebar-width)] h-full w-[calc(100%-var(--spacing-sidebar-width))]">
        {/* TopNavBar */}
        <header className="fixed top-0 right-0 left-[var(--spacing-sidebar-width)] h-16 bg-surface dark:bg-surface-dim border-b border-outline-variant dark:border-outline flex items-center justify-between px-xl w-[calc(100%-var(--spacing-sidebar-width))] z-10">
          <div className="flex items-center flex-1">
            <h2 className="font-h2 text-h2 text-primary font-bold mr-8 hidden md:block">Dashboard</h2>
            <div className="relative w-64 max-w-md hidden sm:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" data-icon="search">search</span>
              <input className="w-full pl-10 pr-4 py-2 rounded-lg border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:border-transparent font-body-sm text-body-sm outline-none transition-all" placeholder="Search inventory..." type="text" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full text-on-surface-variant hover:bg-surface-container-high transition-all relative">
              <span className="material-symbols-outlined" data-icon="notifications">notifications</span>
              <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"></span>
            </button>
            <img alt="User profile" className="w-8 h-8 rounded-full bg-secondary-container object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYO6Ngk72MooRx-uhlBab_gC0bpr9woFgf5jr5GN4MaoO42Z4TtOu0QI9V6ytdHVVUMpKPfLewMhbFsIjBcq4OQkKIn21anxTJvtc6o8DJmK8vgnZW0Kg8yg4kKzaeAL9QQ7vfCg9GsHtJ_sNimTHlwdzamObEeBJY3V9hRiCsK_zEGOl4EIVGyDfbV5qSN8o3hTKoqt_x4gVMq505t0nuAt_ZrcMmRphrtuyyoVgQw3vOagLKDnTweYy6_H5bZdJR8knlT79eq-o" />
          </div>
        </header>

        {/* Dashboard Canvas wrapped in Main */}
        <main className="flex-1 overflow-y-auto pt-24 px-md md:px-xl pb-xl bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
