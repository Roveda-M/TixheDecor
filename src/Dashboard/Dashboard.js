import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiUsers, FiBriefcase, FiUserCheck, FiBox, 
  FiTruck, FiCheckSquare, FiLayers, FiFileText, 
  FiImage, FiStar, FiLogOut, FiMenu, FiX
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Tabela from './Tabela';

const crudConfigs = {
  clients: {
    id: 'clients',
    title: 'Menaxhimi i Klientëve',
    icon: <FiUsers />,
    columns: [
      { key: 'name', label: 'Emri i Klientit', type: 'text' },
      { key: 'email', label: 'Email', type: 'email' },
      { key: 'phone', label: 'Telefoni', type: 'text' },
      { key: 'address', label: 'Adresa', type: 'text' },
    ],
    initialData: [],
    disableAdd: true
  },
  projects: {
    id: 'projects',
    title: 'Projektet e Dekorimit',
    icon: <FiBriefcase />,
    columns: [
      { key: 'title', label: 'Titulli i Projektit', type: 'text' },
      { key: 'client', label: 'Klienti', type: 'text' },
      { key: 'date', label: 'Data', type: 'date' },
      { key: 'status', label: 'Statusi', type: 'select', options: ['Në Pritje', 'Aktiv', 'Përfunduar'] },
    ],
    initialData: [
      { id: '1', title: 'Dasma e Artës', client: 'Arta Hoxha', date: '2026-06-15', status: 'Aktiv' },
    ]
  },
  employees: {
    id: 'employees',
    title: 'Punëtorët',
    icon: <FiUserCheck />,
    columns: [
      { key: 'name', label: 'Emri i Plotë', type: 'text' },
      { key: 'role', label: 'Roli', type: 'text' },
      { key: 'phone', label: 'Telefoni', type: 'text' },
      { key: 'salary', label: 'Paga (€)', type: 'number' },
    ],
    initialData: [
      { id: '1', name: 'Blerim Gashi', role: 'Dekorues Kryesor', phone: '+383 45 111 222', salary: '800' },
    ]
  },
  materials: {
    id: 'materials',
    title: 'Materialet',
    icon: <FiBox />,
    columns: [
      { key: 'name', label: 'Emri i Materialit', type: 'text' },
      { key: 'category', label: 'Kategoria', type: 'text' },
      { key: 'stock', label: 'Sasia në Stok', type: 'number' },
      { key: 'price', label: 'Çmimi për Njësi (€)', type: 'number' },
    ],
    initialData: [
      { id: '1', name: 'Trëndafila të Bardhë', category: 'Lule Natyrale', stock: '500', price: '1.5' },
    ]
  },
  suppliers: {
    id: 'suppliers',
    title: 'Furnitorët',
    icon: <FiTruck />,
    columns: [
      { key: 'company', label: 'Kompania', type: 'text' },
      { key: 'contact', label: 'Personi Kontaktues', type: 'text' },
      { key: 'phone', label: 'Telefoni', type: 'text' },
      { key: 'email', label: 'Email', type: 'email' },
    ],
    initialData: [
      { id: '1', name: 'Florist L.L.C', contact: 'Agron Kelmendi', phone: '+383 49 999 888', email: 'info@florist.com' },
    ]
  },
  tasks: {
    id: 'tasks',
    title: 'Detyrat e Projekteve',
    icon: <FiCheckSquare />,
    columns: [
      { key: 'task', label: 'Përshkrimi i Detyrës', type: 'text' },
      { key: 'project', label: 'Projekti', type: 'text' },
      { key: 'assigned', label: 'Caktuar Për', type: 'text' },
      { key: 'status', label: 'Statusi', type: 'select', options: ['Për t\'u bërë', 'Në proces', 'Përfunduar'] },
    ],
    initialData: [
      { id: '1', task: 'Rregullimi i Harkut të Luleve', project: 'Dasma e Artës', assigned: 'Blerim Gashi', status: 'Në proces' },
    ]
  },
  materialUsage: {
    id: 'materialUsage',
    title: 'Përdorimi i Materialeve',
    icon: <FiLayers />,
    columns: [
      { key: 'project', label: 'Projekti', type: 'text' },
      { key: 'material', label: 'Materiali', type: 'text' },
      { key: 'quantity', label: 'Sasia e Përdorur', type: 'number' },
      { key: 'date', label: 'Data', type: 'date' },
    ],
    initialData: [
      { id: '1', project: 'Dasma e Artës', material: 'Trëndafila të Bardhë', quantity: '150', date: '2026-06-14' },
    ]
  },
  invoices: {
    id: 'invoices',
    title: 'Faturat',
    icon: <FiFileText />,
    columns: [
      { key: 'invoiceNo', label: 'Nr. Faturës', type: 'text' },
      { key: 'client', label: 'Klienti', type: 'text' },
      { key: 'amount', label: 'Shuma Totale (€)', type: 'number' },
      { key: 'status', label: 'Statusi', type: 'select', options: ['E Paguar', 'E Papaguar', 'Pjesërisht'] },
    ],
    initialData: [
      { id: '1', invoiceNo: 'INV-2026-001', client: 'Arta Hoxha', amount: '2500', status: 'E Papaguar' },
    ]
  },
  photos: {
    id: 'photos',
    title: 'Fotografitë e Projekteve',
    icon: <FiImage />,
    columns: [
      { key: 'project', label: 'Projekti', type: 'text' },
      { key: 'description', label: 'Përshkrimi', type: 'text' },
      { key: 'url', label: 'URL e Fotos (Ose Emri)', type: 'text' },
    ],
    initialData: [
      { id: '1', project: 'Dasma e Artës', description: 'Dekori i tavolinës kryesore', url: 'tavolina1.jpg' },
    ]
  },
  reviews: {
    id: 'reviews',
    title: 'Vlerësimet e Klientëve',
    icon: <FiStar />,
    columns: [
      { key: 'client', label: 'Klienti', type: 'text' },
      { key: 'project', label: 'Projekti', type: 'text' },
      { key: 'rating', label: 'Vlerësimi (1-5)', type: 'select', options: ['1', '2', '3', '4', '5'] },
      { key: 'comment', label: 'Koment', type: 'textarea' },
    ],
    initialData: [],
    disableAdd: true
  }
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('clients');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const activeConfig = crudConfigs[activeTab];

  return (
    <div className="flex h-screen bg-[#f6f1e8] overflow-hidden font-sans">
      <AnimatePresence>
        {!isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(true)}
            className="fixed inset-0 bg-black/20 z-20 lg:hidden"
          />
        )}
      </AnimatePresence>
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? '280px' : '0px' }}
        className={`bg-[#f6f1e8] border-r border-[#c9c1b5] z-30 flex flex-col h-full overflow-hidden shrink-0 ${
          isSidebarOpen ? 'w-[280px]' : 'w-0'
        } absolute lg:relative`}
      >
        <div className="p-6 flex items-center justify-between border-b border-gray-100 min-w-[280px]">
          <Link to="/" className="text-lg sm:text-2xl tracking-[4px] font-light text-[#2b2b2b]" style={{ fontFamily: "Playfair Display, serif" }}>
            TIXHE DECOR
          </Link>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
            <FiX size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1 min-w-[280px]">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-3">
            Menyja Kryesore
          </div>
          {Object.values(crudConfigs).map((config) => (
            <button
              key={config.id}
              onClick={() => {
                setActiveTab(config.id);
                if (window.innerWidth < 1024) setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                activeTab === config.id
                  ? 'bg-[#e6dfd3] text-[#2b2b2b] font-medium'
                  : 'text-gray-600 hover:bg-[#e6dfd3] hover:text-[#2b2b2b]'
              }`}
            >
              <span className={activeTab === config.id ? 'text-[#2b2b2b]' : 'text-gray-400'}>
                {config.icon}
              </span>
              {config.title}
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-gray-100 min-w-[280px]">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-[#e6dfd3] hover:text-[#2b2b2b] rounded-xl transition-colors"
          >
            <FiLogOut className="text-gray-400" />
            Kthehu te Fapja
          </Link>
        </div>
      </motion.aside>
      <main className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
        <header className="bg-[#f6f1e8]/70 backdrop-blur-md border-b border-[#c9c1b5] p-4 lg:p-6 flex items-center gap-4 sticky top-0 z-10">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiMenu size={20} />
          </button>
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-gray-800">Paneli i Administrimit</h1>
            <p className="text-sm text-gray-500 hidden sm:block">Mirësevini! Menaxhoni të dhënat e biznesit tuaj këtu.</p>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="max-w-7xl mx-auto"
          >
            <Tabela
              title={activeConfig.title}
              columns={activeConfig.columns}
              initialData={activeConfig.initialData}
              disableAdd={activeConfig.disableAdd}
            />
          </motion.div>
        </div>
      </main>
    </div>
  );
}
