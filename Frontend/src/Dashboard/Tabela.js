import React, { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiPlus, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { api, formatApiError } from '../api';

const klientLabel = (k) =>
  `${k.emri || ''} ${k.mbiemri || ''}`.trim() || `Klient #${k.klientiId}`;

const projektLabel = (p) => p.emriProjektit || `Projekt #${p.projektiId}`;

export default function Tabela({ title, columns, initialData, disableAdd, enableFilters }) {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterLloji, setFilterLloji] = useState('');

  const mapIncomingData = (title, items) => {
    if (title === 'Punëtorët') {
      return items.map((item) => ({
        id: item.punetoriId,
        name: `${item.emri || ''} ${item.mbiemri || ''}`.trim(),
        role: item.pozita || '',
        phone: item.telefoni || '',
        salary: item.paga || 0,
        email: item.email || '',
        statusi: item.statusi || 'Aktiv',
      }));
    }
    if (title === 'Detyrat e Projekteve') {
      return items.map((item) => ({
        id: item.detyrimiId,
        task: item.pershkrimi || '',
        project: item.projekti ? item.projekti.emriProjektit : '',
        projektiId: item.projekti ? String(item.projekti.projektiId) : '',
        assigned: item.punetori ? `${item.punetori.emri} ${item.punetori.mbiemri}` : '',
        punetoriId: item.punetori ? String(item.punetori.punetoriId) : '',
        status: item.statusi || "Për t'u bërë",
        prioriteti: item.prioriteti || 'Normal',
      }));
    }
    if (title === 'Fotografitë e Projekteve') {
      return items.map((item) => ({
        id: item.fotografiaId,
        project: item.projekti ? item.projekti.emriProjektit : '',
        projectId: item.projekti ? String(item.projekti.projektiId) : '',
        description: item.pershkrimi || '',
        url: item.shtegu || '',
        lloji: item.lloji || '',
      }));
    }
    if (title === 'Menaxhimi i Klientëve') {
      return items.map((item) => ({
        id: item.klientiId,
        name: klientLabel(item),
        email: item.email || '',
        phone: item.telefoni || '',
        address: item.adresa || '',
        status: item.statusi || 'Aktiv',
        lloji: item.lloji || 'Individual',
      }));
    }
    if (title === 'Projektet e Dekorimit') {
      return items.map((item) => ({
        id: item.projektiId,
        title: item.emriProjektit || '',
        client: item.klienti ? klientLabel(item.klienti) : '',
        clientId: item.klienti?.klientiId ? String(item.klienti.klientiId) : '',
        date: item.dataFillimit || '',
        endDate: item.dataPerfundimit || '',
        budget: item.buxheti ?? '',
        location: item.lokacioni || '',
        status: item.statusi || '',
      }));
    }
    if (title === 'Faturat') {
      return items.map((item) => ({
        id: item.faturaId,
        invoiceNo: item.nrFatures || '',
        client: item.klienti ? klientLabel(item.klienti) : '',
        clientId: item.klienti?.klientiId ? String(item.klienti.klientiId) : '',
        project: item.projekti ? projektLabel(item.projekti) : '',
        projectId: item.projekti?.projektiId ? String(item.projekti.projektiId) : '',
        amount: item.shumaTotale ?? 0,
        paymentMethod: item.metodaPageses || '',
        status: item.statusi || '',
      }));
    }
    if (title === 'Vlerësimet e Klientëve') {
      return items.map((item) => ({
        id: item.vleresimiId,
        client: item.klienti ? klientLabel(item.klienti) : '',
        clientId: item.klienti?.klientiId ? String(item.klienti.klientiId) : '',
        project: item.projekti ? projektLabel(item.projekti) : '',
        projectId: item.projekti?.projektiId ? String(item.projekti.projektiId) : '',
        rating: item.piket != null ? String(item.piket) : '',
        comment: item.komenti || '',
      }));
    }
    return items;
  };

  const mapOutgoingData = (title, form) => {
    if (title === 'Punëtorët') {
      const nameParts = (form.name || '').trim().split(' ');
      const emri = nameParts[0] || '';
      const mbiemri = nameParts.slice(1).join(' ') || '';
      const payload = {
        emri,
        mbiemri,
        pozita: form.role || '',
        telefoni: form.phone || '',
        paga: Number(form.salary) || 0,
        email: form.email || `${emri.toLowerCase()}@tixhedecor.com`,
        statusi: form.statusi || 'Aktiv',
        specializimi: 'Dekorim',
      };
      if (editingId) payload.punetoriId = Number(editingId);
      return payload;
    }
    if (title === 'Detyrat e Projekteve') {
      if (!form.projektiId || !form.punetoriId) {
        throw new Error('Shkruaj ID ekzistuese te projektit dhe punetorit.');
      }
      const payload = {
        pershkrimi: form.task || '',
        statusi: form.status || "Për t'u bërë",
        prioriteti: form.prioriteti || 'Normal',
        projekti: { projektiId: Number(form.projektiId) },
        punetori: { punetoriId: Number(form.punetoriId) },
      };
      if (editingId) payload.detyrimiId = Number(editingId);
      return payload;
    }
    if (title === 'Fotografitë e Projekteve') {
      const payload = {
        pershkrimi: form.description || '',
        shtegu: (form.url || '').trim(),
        lloji: (form.lloji || 'wedding').trim().toLowerCase(),
        rendi: 1,
      };
      if (form.projectId) {
        payload.projekti = { projektiId: Number(form.projectId) };
      }
      if (!payload.shtegu && !form.photoFile) {
        throw new Error('Zgjidh nje foto nga pajisja.');
      }
      if (editingId) payload.fotografiaId = Number(editingId);
      return payload;
    }
    if (title === 'Menaxhimi i Klientëve') {
      const nameParts = (form.name || '').trim().split(' ');
      const payload = {
        emri: nameParts[0] || '',
        mbiemri: nameParts.slice(1).join(' ') || '',
        email: form.email || '',
        telefoni: form.phone || '',
        adresa: form.address || '',
        statusi: form.status || 'Aktiv',
        lloji: form.lloji || 'Individual',
      };
      if (editingId) payload.klientiId = Number(editingId);
      return payload;
    }
    if (title === 'Projektet e Dekorimit') {
      const payload = {
        emriProjektit: form.title || '',
        statusi: form.status || '',
        dataFillimit: form.date || null,
        dataPerfundimit: form.endDate || null,
        buxheti: form.budget !== '' && form.budget != null ? Number(form.budget) : null,
        lokacioni: form.location || '',
      };
      if (form.clientId) {
        payload.klienti = { klientiId: Number(form.clientId) };
      }
      if (editingId) payload.projektiId = Number(editingId);
      return payload;
    }
    if (title === 'Faturat') {
      const payload = {
        nrFatures: form.invoiceNo || '',
        shumaTotale: Number(form.amount) || 0,
        statusi: form.status || '',
        metodaPageses: form.paymentMethod || '',
      };
      if (form.clientId) payload.klienti = { klientiId: Number(form.clientId) };
      if (form.projectId) payload.projekti = { projektiId: Number(form.projectId) };
      if (editingId) payload.faturaId = Number(editingId);
      return payload;
    }
    if (title === 'Vlerësimet e Klientëve') {
      const payload = {
        piket: Number(form.rating) || 0,
        komenti: form.comment || '',
      };
      if (form.clientId) payload.klienti = { klientiId: Number(form.clientId) };
      if (form.projectId) payload.projekti = { projektiId: Number(form.projectId) };
      if (editingId) payload.vleresimiId = Number(editingId);
      return payload;
    }
    return form;
  };

  const loadData = async () => {
    setIsLoading(true);
    try {
      let items = [];
      if (title === 'Punëtorët') items = await api.getWorkers();
      else if (title === 'Detyrat e Projekteve') items = await api.getTasks();
      else if (title === 'Fotografitë e Projekteve') items = await api.getPhotos();
      else if (title === 'Menaxhimi i Klientëve') {
        items = await api.getKlientet();
        if (filterStatus.trim()) {
          const q = filterStatus.trim().toLowerCase();
          items = items.filter((k) => (k.statusi || '').toLowerCase().includes(q));
        }
        if (filterLloji.trim()) {
          const q = filterLloji.trim().toLowerCase();
          items = items.filter((k) => (k.lloji || '').toLowerCase().includes(q));
        }
      } else if (title === 'Projektet e Dekorimit') items = await api.getProjektet();
      else if (title === 'Faturat') items = await api.getFaturat();
      else if (title === 'Vlerësimet e Klientëve') items = await api.getVleresimet();
      else items = initialData || [];
      setData(mapIncomingData(title, items));
    } catch (error) {
      console.error('Gabim:', error);
      alert('Gabim ngarkimi: ' + formatApiError(error));
      setData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [title, filterStatus, filterLloji]);

  const getCellValue = (item, col) => {
    if (col.tableKey) return item[col.tableKey] ?? '';
    return item[col.key] ?? '';
  };

  const handleOpenModal = (item = null) => {
    if (item) {
      setFormData(item);
      setEditingId(item.id);
    } else {
      const emptyForm = {};
      columns.forEach((col) => {
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
          setData(data.map((item) => (item.id === editingId ? mapIncomingData(title, [updated])[0] : item)));
        } else {
          const created = await api.createWorker(body);
          setData([...data, mapIncomingData(title, [created])[0]]);
        }
      } else if (title === 'Detyrat e Projekteve') {
        if (editingId) {
          const updated = await api.updateTask(editingId, body);
          setData(data.map((item) => (item.id === editingId ? mapIncomingData(title, [updated])[0] : item)));
        } else {
          const created = await api.createTask(body);
          setData([...data, mapIncomingData(title, [created])[0]]);
        }
      } else if (title === 'Fotografitë e Projekteve') {
        if (formData.photoFile) {
          const uploaded = await api.uploadPhoto(formData.photoFile);
          body.shtegu = uploaded.url;
        }
        if (editingId) {
          const updated = await api.updatePhoto(editingId, body);
          setData(data.map((item) => (item.id === editingId ? mapIncomingData(title, [updated])[0] : item)));
        } else {
          const created = await api.createPhoto(body);
          setData([...data, mapIncomingData(title, [created])[0]]);
        }
      } else if (title === 'Menaxhimi i Klientëve') {
        if (editingId) {
          const updated = await api.updateKlient(editingId, body);
          setData(data.map((item) => (item.id === editingId ? mapIncomingData(title, [updated])[0] : item)));
        } else {
          const created = await api.createKlient(body);
          setData([...data, mapIncomingData(title, [created])[0]]);
        }
      } else if (title === 'Projektet e Dekorimit') {
        if (editingId) {
          const updated = await api.updateProjekt(editingId, body);
          setData(data.map((item) => (item.id === editingId ? mapIncomingData(title, [updated])[0] : item)));
        } else {
          const created = await api.createProjekt(body);
          setData([...data, mapIncomingData(title, [created])[0]]);
        }
      } else if (title === 'Faturat') {
        if (editingId) {
          const updated = await api.updateFatura(editingId, body);
          setData(data.map((item) => (item.id === editingId ? mapIncomingData(title, [updated])[0] : item)));
        } else {
          const created = await api.createFatura(body);
          setData([...data, mapIncomingData(title, [created])[0]]);
        }
      } else if (title === 'Vlerësimet e Klientëve') {
        if (editingId) {
          const updated = await api.updateVleresim(editingId, body);
          setData(data.map((item) => (item.id === editingId ? mapIncomingData(title, [updated])[0] : item)));
        } else {
          const created = await api.createVleresim(body);
          setData([...data, mapIncomingData(title, [created])[0]]);
        }
      } else {
        if (editingId) {
          setData(data.map((item) => (item.id === editingId ? { ...formData, id: editingId } : item)));
        } else {
          setData([...data, { ...formData, id: Date.now().toString() }]);
        }
      }
      handleCloseModal();
      alert('Operacioni u krye me sukses! ✅');
    } catch (error) {
      alert('Ndodhi një gabim: ' + formatApiError(error));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('A jeni i sigurt që doni të fshini këtë rekord?')) {
      try {
        if (title === 'Punëtorët') await api.deleteWorker(id);
        else if (title === 'Detyrat e Projekteve') await api.deleteTask(id);
        else if (title === 'Fotografitë e Projekteve') await api.deletePhoto(id);
        else if (title === 'Menaxhimi i Klientëve') await api.deleteKlient(id);
        else if (title === 'Projektet e Dekorimit') await api.deleteProjekt(id);
        else if (title === 'Faturat') await api.deleteFatura(id);
        else if (title === 'Vlerësimet e Klientëve') await api.deleteVleresim(id);
        setData(data.filter((item) => item.id !== id));
        alert('Fshirja u krye me sukses!');
      } catch (error) {
        alert('Ndodhi një gabim gjatë fshirjes: ' + formatApiError(error));
      }
    }
  };

  const renderField = (col) => {
    if (col.type === 'file') {
      return (
        <input
          type="file"
          accept="image/*"
          required={col.required !== false && !formData.url}
          onChange={(e) => setFormData({ ...formData, [col.key]: e.target.files?.[0] || null })}
          className="w-full px-4 py-2 bg-[#f6f1e8] border border-[#c9c1b5] rounded-lg outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#2b2b2b] file:text-white"
        />
      );
    }
    if (col.type === 'select') {
      return (
        <select
          required={col.required !== false}
          value={formData[col.key] || col.options?.[0]?.value || ''}
          onChange={(e) => handleChange(e, col.key)}
          className="w-full px-4 py-2 bg-[#f6f1e8] border border-[#c9c1b5] rounded-lg outline-none"
        >
          {(col.options || []).map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }
    if (col.type === 'textarea') {
      return (
        <textarea
          required={col.required !== false}
          value={formData[col.key] || ''}
          onChange={(e) => handleChange(e, col.key)}
          className="w-full px-4 py-2 bg-[#f6f1e8] border border-[#c9c1b5] rounded-lg outline-none min-h-[100px]"
        />
      );
    }
    return (
      <input
        type={col.type || 'text'}
        required={col.required !== false}
        value={formData[col.key] || ''}
        onChange={(e) => handleChange(e, col.key)}
        className="w-full px-4 py-2 bg-[#f6f1e8] border border-[#c9c1b5] rounded-lg outline-none"
      />
    );
  };

  const tableColumns = columns.filter((col) => !col.formOnly);

  return (
    <div className="bg-[#efe9df] rounded-xl shadow-sm border border-[#c9c1b5] p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
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

      {enableFilters && (
        <div className="flex flex-wrap gap-3 mb-4 p-4 bg-[#f6f1e8] rounded-lg border border-[#c9c1b5]">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Filtro sipas statusit</label>
            <input
              type="text"
              placeholder="p.sh. Aktiv"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-white border border-[#c9c1b5] rounded-lg text-sm w-40"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Filtro sipas llojit</label>
            <input
              type="text"
              placeholder="p.sh. Individual"
              value={filterLloji}
              onChange={(e) => setFilterLloji(e.target.value)}
              className="px-3 py-2 bg-white border border-[#c9c1b5] rounded-lg text-sm w-40"
            />
          </div>
          <div className="flex items-end">
            <button
              type="button"
              onClick={() => {
                setFilterStatus('');
                setFilterLloji('');
              }}
              className="px-3 py-2 text-sm text-gray-600 hover:bg-white rounded-lg border border-[#c9c1b5]"
            >
              Pastro filtrat
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500">Duke ngarkuar të dhënat... ⏳</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#e6dfd3] border-b border-[#c9c1b5]">
                {tableColumns.map((col) => (
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
                  <td colSpan={tableColumns.length + 1} className="p-8 text-center text-gray-500">
                    Nuk ka të dhëna.
                  </td>
                </tr>
              ) : (
                data.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#c9c1b5]/30 hover:bg-[#e6dfd3]/50 transition-colors"
                  >
                    {tableColumns.map((col) => (
                      <td key={col.key} className="p-4 text-sm text-gray-700">
                        {getCellValue(item, col)}
                      </td>
                    ))}
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenModal(item)}
                          className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <FiEdit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
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
              className="bg-[#efe9df] rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-100 sticky top-0 bg-[#efe9df]">
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
                      {renderField(col)}
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-5 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium"
                  >
                    Anulo
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#2b2b2b] hover:bg-black text-white rounded-lg font-medium"
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
