import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiUsers, FiBriefcase, FiUserCheck, FiBox, 
  FiTruck, FiCheckSquare, FiLayers, FiFileText, 
  FiImage, FiStar, FiLogOut, FiMenu, FiX
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Tabela from './Tabela';
import { api, formatApiError } from '../api';

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
      { key: 'status', label: 'Statusi', type: 'text' },
      { key: 'lloji', label: 'Lloji', type: 'text' },
    ],
    initialData: [],
    enableFilters: true,
  },
  projects: {
    id: 'projects',
    title: 'Projektet e Dekorimit',
    icon: <FiBriefcase />,
    columns: [
      { key: 'title', label: 'Titulli i Projektit', type: 'text' },
      { key: 'clientId', label: 'ID Klienti', type: 'number', tableKey: 'client' },
      { key: 'date', label: 'Data fillimit', type: 'date' },
      { key: 'endDate', label: 'Data mbarimit', type: 'date' },
      { key: 'budget', label: 'Buxheti (€)', type: 'number' },
      { key: 'location', label: 'Lokacioni', type: 'text' },
      { key: 'status', label: 'Statusi', type: 'text' },
    ],
    initialData: [],
  },
  employees: {
    id: 'employees',
    title: 'Punëtorët',
    icon: <FiUserCheck />,
    columns: [
      { key: 'name', label: 'Emri i Plotë', type: 'text' },
      { key: 'role', label: 'Roli', type: 'text' },
      { key: 'specialization', label: 'Specializimi', type: 'text' },
      { key: 'phone', label: 'Telefoni', type: 'text' },
      { key: 'salary', label: 'Paga (€)', type: 'number' },
      { key: 'hireDate', label: 'Data e Punësimit', type: 'date' },
      { key: 'statusi', label: 'Statusi', type: 'text' },
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
      { key: 'projektiId', label: 'ID e Projektit', type: 'number' },
      { key: 'punetoriId', label: 'ID e Punëtorit', type: 'number' },
      { key: 'startDate', label: 'Data fillimit', type: 'date' },
      { key: 'endDate', label: 'Afati / Data përfundimit', type: 'date' },
      { key: 'status', label: 'Statusi', type: 'text' },
      { key: 'prioriteti', label: 'Prioriteti', type: 'text' },
    ],
    initialData: []
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
      { key: 'clientId', label: 'ID Klienti', type: 'number', tableKey: 'client' },
      { key: 'projectId', label: 'ID Projekti', type: 'number', tableKey: 'project' },
      { key: 'amount', label: 'Shuma Totale (€)', type: 'number' },
      { key: 'paymentMethod', label: 'Metoda e pagesës', type: 'text' },
      { key: 'status', label: 'Statusi i pagesës', type: 'text' },
    ],
    initialData: [],
  },
  photos: {
    id: 'photos',
    title: 'Fotografitë e Projekteve',
    icon: <FiImage />,
    columns: [
      { key: 'projectId', label: 'ID Projekti', type: 'number', tableKey: 'project', required: false },
      { key: 'description', label: 'Përshkrimi', type: 'text' },
      { key: 'rendi', label: 'Renditja', type: 'number' },
      { key: 'photoFile', label: 'Zgjidh Foto nga Pajisja', type: 'file', formOnly: true, required: false },
      { key: 'url', label: 'Foto e Ruajtur', type: 'text', required: false },
      {
        key: 'lloji',
        label: 'Lloji / faqja ku shfaqet',
        type: 'select',
        options: [
          { value: 'para', label: 'Para dekorimit' },
          { value: 'pas', label: 'Pas dekorimit' },
          { value: 'wedding', label: 'Wedding' },
          { value: 'birthday', label: 'Birthday' },
          { value: 'engagement', label: 'Engagement' },
          { value: 'babyshower', label: 'Baby Shower' },
          { value: 'bridetobe', label: 'Bride To Be' },
          { value: 'circumcision', label: 'Circumcision' },
        ],
      },
    ],
    initialData: [
      { id: '1', project: 'Dasma e Artës', description: 'Dekori i tavolinës kryesore', url: 'tavolina1.jpg' },
    ]
  },
  users: {
    id: 'users',
    title: 'Përdoruesit',
    icon: <FiUsers />,
    columns: [
      { key: 'name', label: 'Emri i Plotë', type: 'text' },
      { key: 'email', label: 'Email', type: 'email' },
      { key: 'password', label: 'Fjalëkalimi', type: 'password', formOnly: true, required: false },
      { key: 'phone', label: 'Telefoni', type: 'text', required: false },
      { key: 'roles', label: 'Rolet', type: 'text', required: false },
      {
        key: 'statusi',
        label: 'Statusi',
        type: 'select',
        options: [
          { value: 'Aktiv', label: 'Aktiv' },
          { value: 'Joaktiv', label: 'Joaktiv' },
        ],
      },
      {
        key: 'emailConfirmed',
        label: 'Email i konfirmuar',
        type: 'select',
        options: [
          { value: 'Jo', label: 'Jo' },
          { value: 'Po', label: 'Po' },
        ],
      },
    ],
    initialData: [],
  },
  roles: {
    id: 'roles',
    title: 'Rolet',
    icon: <FiUserCheck />,
    columns: [
      { key: 'name', label: 'Emërtimi', type: 'text' },
      { key: 'description', label: 'Përshkrimi', type: 'text', required: false },
      { key: 'normalizedName', label: 'Emri i normalizuar', type: 'text', required: false },
    ],
    initialData: [],
  },
  userRoles: {
    id: 'userRoles',
    title: 'Rolet e Përdoruesve',
    icon: <FiCheckSquare />,
    columns: [
      { key: 'userId', label: 'ID Përdoruesi', type: 'number', tableKey: 'user' },
      { key: 'roleId', label: 'ID Roli', type: 'number', tableKey: 'role' },
    ],
    initialData: [],
  },
  stats: {
    id: 'stats',
    title: 'Statistikat',
    icon: <FiStar />,
    columns: [],
    initialData: [],
    disableAdd: true,
  },
  reviews: {
    id: 'reviews',
    title: 'Vlerësimet e Klientëve',
    icon: <FiStar />,
    columns: [
      { key: 'clientId', label: 'ID Klienti', type: 'number', tableKey: 'client' },
      { key: 'projectId', label: 'ID Projekti', type: 'number', tableKey: 'project' },
      { key: 'rating', label: 'Vlerësimi (1-5)', type: 'number' },
      { key: 'comment', label: 'Koment', type: 'textarea' },
    ],
    initialData: [],
  }
};

function DashboardStats() {
  const [stats, setStats] = useState({
    totalInvoices: 0,
    activeProjects: 0,
    topMaterial: 'Nuk ka të dhëna',
    averageRating: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [invoices, projects, materialUsage, reviews] = await Promise.all([
          api.getFaturat(),
          api.getProjektet(),
          api.getMaterialUsage(),
          api.getVleresimet(),
        ]);

        const totalInvoices = invoices.reduce((sum, invoice) => sum + Number(invoice.shumaTotale || 0), 0);
        const activeProjects = projects.filter((project) => {
          const status = (project.statusi || '').toLowerCase();
          return status.includes('aktiv') || status.includes('progres');
        }).length;

        const materialTotals = materialUsage.reduce((totals, item) => {
          const name = item.materiali?.emri || 'Material pa emër';
          totals[name] = (totals[name] || 0) + Number(item.sasia || 0);
          return totals;
        }, {});
        const topMaterialEntry = Object.entries(materialTotals).sort((a, b) => b[1] - a[1])[0];

        const ratedReviews = reviews.filter((review) => review.piket != null);
        const averageRating = ratedReviews.length
          ? ratedReviews.reduce((sum, review) => sum + Number(review.piket || 0), 0) / ratedReviews.length
          : 0;

        setStats({
          totalInvoices,
          activeProjects,
          topMaterial: topMaterialEntry ? `${topMaterialEntry[0]} (${topMaterialEntry[1]})` : 'Nuk ka të dhëna',
          averageRating,
        });
        setError('');
      } catch (err) {
        setError(formatApiError(err));
      } finally {
        setIsLoading(false);
      }
    };

    loadStats();
  }, []);

  const cards = [
    { label: 'Shuma totale e faturave', value: `${stats.totalInvoices.toFixed(2)} €` },
    { label: 'Projektet aktive', value: stats.activeProjects },
    { label: 'Materiali më i përdorur', value: stats.topMaterial },
    { label: 'Vlerësimi mesatar', value: stats.averageRating.toFixed(1) },
  ];

  return (
    <div className="bg-[#efe9df] rounded-xl shadow-sm border border-[#c9c1b5] p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Statistikat</h2>
      {isLoading ? (
        <div className="p-8 text-center text-gray-500">Duke ngarkuar të dhënat...</div>
      ) : error ? (
        <div className="p-4 rounded-lg border border-red-200 bg-red-50 text-red-600">{error}</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <div key={card.label} className="rounded-lg border border-[#c9c1b5] bg-[#f6f1e8] p-5">
              <p className="text-sm text-gray-500 mb-2">{card.label}</p>
              <p className="text-2xl font-semibold text-gray-800 break-words">{card.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

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
          <h1
              className="text-lg sm:text-2xl tracking-[4px] font-light text-[#2b2b2b]"
              style={{ fontFamily: "Playfair Display, serif" }}
          >
            TIXHE DECOR
          </h1>
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

        <div className="p-4 border-t border-gray-100 min-w-[280px] space-y-1">
          <Link
              to="/home"
              className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-[#e6dfd3] hover:text-[#2b2b2b] rounded-xl transition-colors"
          >
            <FiLogOut className="text-gray-400" />
            Kthehu te Faqja
          </Link>

          <button
              onClick={() => {
                localStorage.removeItem("refreshToken");
                sessionStorage.removeItem("accessToken");
                sessionStorage.removeItem("role");
                window.location.href = "/login";
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
          >
            <FiLogOut />
            Logout
          </button>
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
            {activeConfig.id === 'stats' ? (
              <DashboardStats />
            ) : (
              <Tabela
                title={activeConfig.title}
                columns={activeConfig.columns}
                initialData={activeConfig.initialData}
                disableAdd={activeConfig.disableAdd}
                enableFilters={activeConfig.enableFilters}
              />
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
