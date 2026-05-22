import React, { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiPlus, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../api';

export default function Tabela({ title, columns, initialData, disableAdd }) {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const mapIncomingData = (title, items) => {
    if (title === 'Punëtorët') {
      return items.map(item => ({
        id: item.punetoriId,
        name: `${item.emri || ''} ${item.mbiemri || ''}`.trim(),
        role: item.pozita || '',
        phone: item.telefoni || '',
        salary: item.paga || 0,
        email: item.email || '',
        statusi: item.statusi || 'Aktiv'
      }));
    }
    if (title === 'Detyrat e Projekteve') {
      return items.map(item => ({
        id: item.detyrimiId,
        task: item.pershkrimi || '',
        project: item.projekti ? item.projekti.emriProjektit : '',
        assigned: item.punetori ? `${item.punetori.emri} ${item.punetori.mbiemri}` : '',
        status: item.statusi || 'Për t\'u bërë',
        prioriteti: item.prioriteti || 'Normal'
      }));
    }
    if (title === 'Fotografitë e Projekteve') {
      return items.map(item => ({
        id: item.fotografiaId,
        project: item.projekti ? item.projekti.emriProjektit : '',
        description: item.pershkrimi || '',
        url: item.shtegu || ''
      }));
    }
    return items;
  };

  const mapOutgoingData = (title, formData, originalItem = null) => {
    if (title === 'Punëtorët') {
      const nameParts = (formData.name || '').trim().split(' ');
      const emri = nameParts[0] || '';
      const mbiemri = nameParts.slice(1).join(' ') || '';
      return {
        punetoriId: editingId ? Number(editingId) : null,
        emri,
        mbiemri,
        pozita: formData.role || '',
        telefoni: formData.phone || '',
        paga: Number(formData.salary) || 0,
        email: formData.email || `${emri.toLowerCase() || 'staf'}@tixhedecor.com`,
        statusi: formData.statusi || 'Aktiv',
        specializimi: 'Dekorim'
      };
    }
    if (title === 'Detyrat e Projekteve') {
      return {
        detyrimiId: editingId ? Number(editingId) : null,
        pershkrimi: formData.task || '',
        statusi: formData.status || 'Për t\'u bërë',
        prioriteti: formData.prioriteti || 'Normal',
        // Për thjeshtësi gjatë prezantimit, mund t'i dërgojmë si objekte me id: 1
        projekti: { projektiId: 1 }, 
        punetori: { punetoriId: 1 }
      };
    }
    if (title === 'Fotografitë e Projekteve') {
      return {
        fotografiaId: editingId ? Number(editingId) : null,
        pershkrimi: formData.description || '',
        shtegu: formData.url || '',
        projekti: { projektiId: 1 },
        lloji: 'pas',
        rendi: 1
      };
    }
    return formData;
  };

  const loadData = async () => {
    setIsLoading(true);
    try {
      let items = [];
      if (title === 'Punëtorët') {
        items = await api.getWorkers();
      } else if (title === 'Detyrat e Projekteve') {
        items = await api.getTasks();
      } else if (title === 'Fotografitë e Projekteve') {
        items = await api.getPhotos();
      } else {
        items = initialData || [];
      }
      setData(mapIncomingData(title, items));
    } catch (error) {
      console.error("Gabim gjatë ngarkimit të të dhënave:", error);
      setData(initialData || []);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [title]);

  const handleOpenModal = (item = null) => {
    if (item) {
      setFormData(item);
      setEditingId(item.id);
    } else {
      const emptyForm = {};
      columns.forEach(col => {
        emptyForm[col.key] = '';
      });
      setFormData(emptyForm);
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({});
    setEditingId(null);
  };

  const handleChange = (e, key) => {
    setFormData({ ...formData, [key]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = mapOutgoingData(title, formData);

      if (title === 'Punëtorët') {
        if (editingId) {
          const updated = await api.updateWorker(editingId, body);
          setData(data.map(item => (item.id === editingId ? mapIncomingData(title, [updated])[0] : item)));
        } else {
          const created = await api.createWorker(body);
          setData([...data, mapIncomingData(title, [created])[0]]);
        }
      } else if (title === 'Detyrat e Projekteve') {
        if (editingId) {
          const updated = await api.updateTask(editingId, body);
          setData(data.map(item => (item.id === editingId ? mapIncomingData(title, [updated])[0] : item)));
        } else {
          const created = await api.createTask(body);
          setData([...data, mapIncomingData(title, [created])[0]]);
        }
      } else if (title === 'Fotografitë e Projekteve') {
        if (editingId) {
          const updated = await api.updatePhoto(editingId, body);
          setData(data.map(item => (item.id === editingId ? mapIncomingData(title, [updated])[0] : item)));
        } else {
          const created = await api.createPhoto(body);
          setData([...data, mapIncomingData(title, [created])[0]]);
        }
      } else {
        if (editingId) {
          setData(data.map(item => (item.id === editingId ? { ...formData, id: editingId } : item)));
        } else {
          setData([...data, { ...formData, id: Date.now().toString() }]);
        }
      }
      handleCloseModal();
      alert("Operacioni u kreh me sukses! ");
    } catch (error) {
      alert("Ndodhi një gabim: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("A jeni i sigurt që doni të fshini këtë rekord?")) {
      try {
        if (title === 'Punëtorët') {
          await api.deleteWorker(id);
        } else if (title === 'Detyrat e Projekteve') {
          await api.deleteTask(id);
        } else if (title === 'Fotografitë e Projekteve') {
          await api.deletePhoto(id);
        }
        setData(data.filter(item => item.id !== id));
        alert("Fshirja u krye me sukses!");
      } catch (error) {
        alert("Ndodhi një gabim gjatë fshirjes: " + error.message);
      }
    }
  };

  return (
    <div className="bg-[#efe9df] rounded-xl shadow-sm border border-[#c9c1b5] p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
        {!disableAdd && (
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-[#2b2b2b] hover:bg-black text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            <FiPlus /> Shto të re
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500">Duke ngarkuar të dhënat... ⏳</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#e6dfd3] border-b border-[#c9c1b5]">
                {columns.map((col) => (
                  <th key={col.key} className="p-4 text-sm font-medium text-gray-600">
                    {col.label}
                  </th>
                ))}
                <th className="p-4 text-sm font-medium text-gray-600 text-right">Veprimet</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1} className="p-8 text-center text-gray-500">
                    Nuk ka të dhëna.
                  </td>
                </tr>
              ) : (
                data.map((item) => (
                  <tr key={item.id} className="border-b border-[#c9c1b5]/30 hover:bg-[#e6dfd3]/50 transition-colors">
                    {columns.map((col) => (
                      <td key={col.key} className="p-4 text-sm text-gray-700">
                        {col.type === 'color' ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full border border-gray-200" style={{ backgroundColor: item[col.key] }}></div>
                            {item[col.key]}
                          </div>
                        ) : col.type === 'rating' ? (
                          <div className="flex text-yellow-400">
                            {"★".repeat(Number(item[col.key]) || 0)}
                            <span className="text-gray-300">
                              {"★".repeat(5 - (Number(item[col.key]) || 0))}
                            </span>
                          </div>
                        ) : (
                          item[col.key]
                        )}
                      </td>
                    ))}
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenModal(item)}
                          className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Ndrysho"
                        >
                          <FiEdit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Fshi"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-[#efe9df] rounded-2xl shadow-xl w-full max-w-lg overflow-hidden"
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800">
                  {editingId ? 'Ndrysho' : 'Shto'} {title}
                </h3>
                <button
                  onClick={handleCloseModal}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FiX size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6">
                <div className="space-y-4">
                  {columns.map((col) => (
                    <div key={col.key}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {col.label}
                      </label>
                      {col.type === 'select' ? (
                        <select
                          required={col.required !== false}
                          value={formData[col.key] || ''}
                          onChange={(e) => handleChange(e, col.key)}
                          className="w-full px-4 py-2 bg-[#f6f1e8] border border-[#c9c1b5] rounded-lg focus:ring-2 focus:ring-[#2b2b2b]/20 focus:border-[#2b2b2b] outline-none transition-all"
                        >
                          <option value="">Zgjidh...</option>
                          {col.options?.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      ) : col.type === 'textarea' ? (
                        <textarea
                          required={col.required !== false}
                          value={formData[col.key] || ''}
                          onChange={(e) => handleChange(e, col.key)}
                          className="w-full px-4 py-2 bg-[#f6f1e8] border border-[#c9c1b5] rounded-lg focus:ring-2 focus:ring-[#2b2b2b]/20 focus:border-[#2b2b2b] outline-none transition-all min-h-[100px]"
                        />
                      ) : (
                        <input
                          type={col.type || 'text'}
                          required={col.required !== false}
                          value={formData[col.key] || ''}
                          onChange={(e) => handleChange(e, col.key)}
                          className="w-full px-4 py-2 bg-[#f6f1e8] border border-[#c9c1b5] rounded-lg focus:ring-2 focus:ring-[#2b2b2b]/20 focus:border-[#2b2b2b] outline-none transition-all"
                        />
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-5 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                  >
                    Anulo
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#2b2b2b] hover:bg-black text-white rounded-lg transition-colors font-medium shadow-sm shadow-black/20"
                  >
                    Ruaj
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
