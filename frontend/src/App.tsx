import { useState } from 'react';
import { Toaster } from "react-hot-toast";
import FormPengajuan from './components/FormPengajuan';
import TabelPengajuan from './components/TabelPengajuan';

type ActivePage = 'form' | 'tabel';

const Icons = {
  Form: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
      <rect x="9" y="2" width="6" height="4" rx="1" />
      <path d="M5 4h-1a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1" />
      <path d="M9 12h6M9 16h4" />
    </svg>
  ),
  Table: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M3 15h18M9 3v18" />
    </svg>
  )
};

const NAV_ITEMS = [
  {
    id: 'form' as ActivePage,
    label: 'Pengajuan Kredit',
    description: 'Tambah pengajuan kredit baru',
    Icon: Icons.Form,
  },
  {
    id: 'tabel' as ActivePage,
    label: 'Tabel Pengajuan',
    description: 'Lihat & kelola semua pengajuan',
    Icon: Icons.Table,
  },
];

export default function Home() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [activePage, setActivePage] = useState<ActivePage>('form');

  const handlePengajuanSukses = () => setRefreshTrigger((prev) => prev + 1);

  // Ambil data halaman yang sedang aktif untuk Header
  const activePageData = NAV_ITEMS.find(item => item.id === activePage) || NAV_ITEMS[0];

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex min-h-screen bg-gray-50">
        
        {/* Panggil Sub-Komponen Sidebar */}
        <Sidebar activePage={activePage} setActivePage={setActivePage} />

        <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
          {/* Panggil Sub-Komponen Header */}
          <Header title={activePageData.label} subtitle={activePageData.description} />

          {/* Main Content */}
          <main className="flex-1 p-8 flex flex-col items-center">
            {activePage === 'form' ? (
              <div className="max-w-lg w-full">
                <FormPengajuan onPengajuanSukses={handlePengajuanSukses} />
              </div>
            ) : (
              <div className="w-full">
                <TabelPengajuan refreshTrigger={refreshTrigger} />
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}

interface SidebarProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
}

function Sidebar({ activePage, setActivePage }: SidebarProps) {
  // State hover dipindah ke dalam komponen ini saja
  const [isHovered, setIsHovered] = useState(false);

  return (
    <aside 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`sticky top-0 h-screen flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ease-in-out shrink-0 z-50 overflow-hidden ${isHovered ? 'w-64' : 'w-16'}`}
    >
      
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-gray-100 overflow-hidden shrink-0">
        <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-black text-sm shrink-0">
          C
        </div>
        
        {/* Konten ini muncul perlahan saat di-hover */}
        <div className={`transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-sm font-bold text-black leading-tight whitespace-nowrap">Capella</p>
          <p className="text-xs text-gray-700 whitespace-nowrap">Multidana</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 flex flex-col gap-1">
        {NAV_ITEMS.map(({ id, label, Icon }) => {
          const isActive = activePage === id;
          return (
            <button
              key={id}
              onClick={() => setActivePage(id)}
              title={!isHovered ? label : undefined}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-150 w-full text-left cursor-pointer ${isActive ? 'bg-yellow-400 text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-black'} ${!isHovered ? 'justify-center' : ''}`}
            >
              <Icon />
              {isHovered && <span className="whitespace-nowrap overflow-hidden">{label}</span>}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

function Header({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 h-16 flex items-center px-8 justify-between">
      <div>
        <h1 className="text-base font-bold text-black leading-tight">{title}</h1>
        <p className="text-xs text-gray-400">{subtitle}</p>
      </div>
      <span className="text-xs font-semibold text-gray-600 uppercase tracking-widest border border-gray-200 rounded-full px-3 py-1">
        PT Capella Multidana
      </span>
    </header>
  );
}