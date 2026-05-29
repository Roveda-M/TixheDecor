import React, { useState, useEffect, useCallback } from 'react';
import { FiEdit2, FiTrash2, FiPlus, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { api, formatApiError } from '../api';
import { useConfirmModal } from '../ConfirmModal';

const stripEventPrefix = (value) =>
  String(value || '')
    .replace(/^(Wedding|Baby Shower|Bride To Be)\s*-\s*/i, '')
    .trim();

const klientDisplayName = (k) => {
  const emri = (k?.emri || '').trim();
  const mbiemri = (k?.mbiemri || '').trim();
  const stripped = stripEventPrefix(emri);
  const name = stripped || emri;
  if (name && mbiemri && !name.toLowerCase().includes(mbiemri.toLowerCase())) {
    return `${name} ${mbiemri}`.trim();
  }
  return name || mbiemri || `Klient #${k?.klientiId}`;
};

const klientLabel = klientDisplayName;

const projektLabel = (p) => p.emriProjektit || `Projekt #${p.projektiId}`;

const projektMeKlientLabel = (p) => {
  const projectName = p.emriProjektit || `Projekt #${p.projektiId}`;
  const clientName = p.klienti ? klientLabel(p.klienti) : '';
  return clientName ? `${projectName} - ${clientName}` : projectName;
};

const punetoriLabel = (p) =>
  `${p.emri || ''} ${p.mbiemri || ''}`.trim() || `Punëtor #${p.punetoriId}`;

const furnitoriLabel = (f) => f.emri || `Furnitor #${f.furnitoriId}`;

const materialiLabel = (m) => m.emri || `Material #${m.materialiId}`;

const brideRequestLabel = (request) =>
  `BrideToBe - ${request.brideName || `Request #${request.requestId}`}`;

const isEventRequestTitle = (title) =>
  title === 'Kërkesat Bride To Be' ||
  title === 'Kërkesat Baby Shower' ||
  title === 'Kërkesat Wedding';

const isBabyShowerRequest = (item) => (item.brideName || '').startsWith('Baby Shower -');

const isWeddingRequest = (item) => (item.brideName || '').startsWith('Wedding -');

const filterEventRequests = (title, items) => {
  if (title === 'Kërkesat Baby Shower') return items.filter(isBabyShowerRequest);
  if (title === 'Kërkesat Wedding') return items.filter(isWeddingRequest);
  if (title === 'Kërkesat Bride To Be') {
    return items.filter((item) => !isBabyShowerRequest(item) && !isWeddingRequest(item));
  }
  return items;
};

const normalizeAssetUrl = (url) => {
  const trimmed = (url || '').trim();
  if (!trimmed) return '';
  if (/^(https?:|blob:|data:|\/uploads\/)/i.test(trimmed)) return trimmed;
  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
};

const parseSelectedDecorLinks = (value) => {
  if (!value) return [];
  const text = String(value);
  const links = [];
  const regex = /([^(),]+?)\s*\(([^)]+)\)/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    links.push({
      title: match[1].trim(),
      url: normalizeAssetUrl(match[2]),
    });
  }

  return links.length
    ? links
    : text
        .split(',')
        .map((item) => ({ title: item.trim(), url: normalizeAssetUrl(item) }))
        .filter((item) => item.title);
};

const statusBadgeClass = (value) => {
  const normalized = (value || '').toLowerCase();
  if (normalized.includes('përfunduar') || normalized.includes('perfunduar')) {
    return 'border-green-200 bg-green-50 text-green-700';
  }
  if (normalized.includes('proces')) {
    return 'border-amber-200 bg-amber-50 text-amber-700';
  }
  return 'border-blue-200 bg-blue-50 text-blue-700';
};

const buildRequestIndex = (requests) => {
  const requestByEmri = {};
  for (const req of requests) {
    const fullName = (req.brideName || '').trim().toLowerCase();
    const shortName = stripEventPrefix(req.brideName).toLowerCase();
    if (fullName) requestByEmri[fullName] = req;
    if (shortName) requestByEmri[shortName] = req;
  }
  return requestByEmri;
};

const findRequestForKlient = (klient, requestByEmri, requests) => {
  const emri = (klient.emri || '').trim();
  const mbiemri = (klient.mbiemri || '').trim();
  const fullName = `${emri} ${mbiemri}`.trim();

  for (const candidate of [emri, fullName, stripEventPrefix(emri), stripEventPrefix(fullName)]) {
    const key = candidate.trim().toLowerCase();
    if (key && requestByEmri[key]) {
      return requestByEmri[key];
    }
  }

  for (const req of requests) {
    const requestName = stripEventPrefix(req.brideName);
    if (requestName && (requestName === emri || requestName === fullName)) {
      return req;
    }
    if (emri && (req.brideName || '').toLowerCase().includes(emri.toLowerCase())) {
      return req;
    }
  }

  return null;
};

const enrichKlientetFromEventRequests = (clients, requests) => {
  const requestByEmri = buildRequestIndex(requests);

  return clients.map((k) => {
    const req = findRequestForKlient(k, requestByEmri, requests);
    if (!req) return k;

    const telefoni =
      (k.telefoni || '').trim() || (req.telefoni || req.phone || '').trim();
    const adresa =
      (k.adresa || '').trim() ||
      (req.location || req.adresa || req.address || '').trim();
    const email = (k.email || '').trim() || (req.email || '').trim();
    const emri = stripEventPrefix(k.emri || '') || k.emri;
    const lloji = formatLlojiEventType(k.lloji || req.brideName || '');

    if (
      telefoni === (k.telefoni || '') &&
      adresa === (k.adresa || '') &&
      email === (k.email || '') &&
      emri === (k.emri || '') &&
      lloji === (k.lloji || '')
    ) {
      return k;
    }

    return { ...k, telefoni, adresa, email, emri, lloji };
  });
};

const formatTimeValue = (value) => {
  if (!value) return '';
  const text = String(value);
  return text.length >= 5 ? text.slice(0, 5) : text;
};

const normalizeRequestStatus = (value) => {
  if (!value || value === 'PENDING') return 'I filluar';
  return value;
};

const EVENT_TYPE_LABELS = {
  wedding: 'Wedding',
  dasme: 'Wedding',
  bridetobe: 'Bride To Be',
  birthday: 'Birthday',
  engagement: 'Engagement',
  babyshower: 'Baby Shower',
  circumcision: 'Circumcision',
  individual: 'Individual',
  kontakt: 'Kontakt',
};

const formatLlojiEventType = (value) => {
  if (!value) return '';
  const text = String(value).trim();
  if (text.toLowerCase().startsWith('from:')) {
    return text;
  }
  if (text.includes(':') && !text.toLowerCase().startsWith('from')) {
    const label = text.split(':')[0].trim();
    const key = label.toLowerCase().replace(/\s+/g, '');
    if (EVENT_TYPE_LABELS[key]) return `From: ${EVENT_TYPE_LABELS[key]}`;
    return `From: ${label}`;
  }
  const key = text.toLowerCase().replace(/\s+/g, '');
  if (EVENT_TYPE_LABELS[key]) return `From: ${EVENT_TYPE_LABELS[key]}`;
  if (text.startsWith('Baby Shower -')) return 'From: Baby Shower';
  if (text.startsWith('Wedding -')) return 'From: Wedding';
  return `From: ${text}`;
};

const sortMappedData = (title, items) => {
  const copy = [...items];
  if (title === 'Rolet') {
    return copy.sort((a, b) =>
      (a.name || '').localeCompare(b.name || '', 'sq', { sensitivity: 'base' })
    );
  }
  if (title === 'Përdoruesit') {
    return copy.sort((a, b) =>
      (a.name || '').localeCompare(b.name || '', 'sq', { sensitivity: 'base' })
    );
  }
  if (title === 'Rolet e Përdoruesve') {
    return copy.sort((a, b) => {
      const byUser = (a.user || '').localeCompare(b.user || '', 'sq', { sensitivity: 'base' });
      if (byUser !== 0) return byUser;
      return (a.role || '').localeCompare(b.role || '', 'sq', { sensitivity: 'base' });
    });
  }
  return copy;
};

export default function Tabela({ title, columns, initialData, disableAdd, enableFilters }) {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lookupOptions, setLookupOptions] = useState({});
  const [filterStatus, setFilterStatus] = useState('');
  const [filterLloji, setFilterLloji] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const { alertDialog, confirmDialog, ConfirmModal } = useConfirmModal();

  const mapIncomingData = useCallback((title, items) => {
    if (title === 'Punetoret') {
      return items.map((item) => ({
        id: item.punetoriId,
        firstName: item.emri || '',
        lastName: item.mbiemri || '',
        position: item.pozita || '',
        phone: item.telefoni || '',
        salary: item.paga || 0,
        email: item.email || '',
        specialization: item.specializimi || '',
        hireDate: item.dataPunesimit || '',
        statusi: item.statusi || 'aktiv',
      }));
    }
    if (title === 'Detyrat e Projekteve') {
      return items.map((item) => ({
        id: item.detyrimiId,
        task: item.pershkrimi || '',
        project: item.projekti ? projektMeKlientLabel(item.projekti) : '',
        projektiId: item.projekti ? String(item.projekti.projektiId) : '',
        brideRequest: item.brideToBeRequest ? brideRequestLabel(item.brideToBeRequest) : '',
        brideRequestId: item.brideToBeRequest?.requestId ? String(item.brideToBeRequest.requestId) : '',
        assigned: item.punetori ? `${item.punetori.emri} ${item.punetori.mbiemri}` : '',
        workerEmail: item.punetori?.email || '',
        startDate: item.dataFillimit || '',
        endDate: item.dataPerfundimit || '',
        eventTime: formatTimeValue(item.projekti?.oraEventit),
        includeClientImages: item.includeClientImages ? 'Po' : 'Jo',
        clientImages: item.brideToBeRequest?.selectedDecors || item.projekti?.llojiDekorimit || '',
        status: item.statusi || 'I filluar',
        prioriteti: item.prioriteti || 'Normal',
      }));
    }
    if (title === 'Materialet') {
      return items.map((item) => ({
        id: item.materialiId,
        name: item.emri || '',
        supplier: item.furnitori ? furnitoriLabel(item.furnitori) : '',
        supplierId: item.furnitori?.furnitoriId ? String(item.furnitori.furnitoriId) : '',
        category: item.kategoria || '',
        unit: item.njesiaMatese || '',
        stock: item.sasiaStokut ?? 0,
        price: item.cmimiPerNjesi ?? 0,
      }));
    }
    if (title === 'Furnitorët') {
      return items.map((item) => ({
        id: item.furnitoriId,
        company: item.emri || '',
        contact: item.kontaktiKryesor || '',
        phone: item.telefoni || '',
        email: item.email || '',
        paymentTerms: item.kushtetPageses || '',
        rating: item.vleresimi ?? '',
        statusi: item.statusi || 'Aktiv',
      }));
    }
    if (title === 'Përdorimi i Materialeve') {
      return items.map((item) => ({
        id: item.mpId,
        project: item.projekti ? projektLabel(item.projekti) : '',
        projectId: item.projekti?.projektiId ? String(item.projekti.projektiId) : '',
        material: item.materiali ? materialiLabel(item.materiali) : '',
        materialId: item.materiali?.materialiId ? String(item.materiali.materialiId) : '',
        quantity: item.sasia ?? 0,
        date: item.dataPerdorimit || '',
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
        rendi: item.rendi ?? '',
      }));
    }
    if (isEventRequestTitle(title)) {
      return items.map((item) => ({
        id: item.requestId,
        brideName: item.brideName || '',
        telefoni: item.telefoni || '',
        eventDate: item.eventDate || '',
        eventTime: formatTimeValue(item.eventTime),
        location: item.location || '',
        selectedDecors: item.selectedDecors || '',
        punetori: item.punetori ? punetoriLabel(item.punetori) : '',
        punetoriId: item.punetori?.punetoriId ? String(item.punetori.punetoriId) : '',
        statusi: normalizeRequestStatus(item.statusi),
      }));
    }
    if (title === 'Përdoruesit') {
      return items.map((item) => ({
        id: item.id,
        name: `${item.emri || ''} ${item.mbiemri || ''}`.trim(),
        email: item.email || '',
        phone: item.phoneNumber || '',
        roles: Array.isArray(item.roles) ? item.roles.map((role) => role.emertimi).join(', ') : '',
        roleIds: Array.isArray(item.roles) ? item.roles.map((role) => role.id).join(',') : '',
        statusi: item.statusi || 'Aktiv',
        emailConfirmed: item.emailConfirmed ? 'Po' : 'Jo',
      }));
    }
    if (title === 'Rolet') {
      return items.map((item) => ({
        id: item.id,
        name: item.emertimi || '',
        description: item.pershkrimi || '',
        normalizedName: item.normalizedName || '',
      }));
    }
    if (title === 'Rolet e Përdoruesve') {
      return items.map((item) => ({
        id: item.id,
        userEmail: item.user?.email || '',
        user: item.user?.fullname || item.user?.emri || item.user?.email || '',
        roleName: item.role?.emertimi || '',
        role: item.role?.emertimi || '',
      }));
    }
    if (title === 'Menaxhimi i Klientëve') {
      return items.map((item) => ({
        id: item.klientiId,
        name: klientLabel(item),
        email: item.email || '',
        phone: item.telefoni || item.phone || '',
        address: item.adresa || item.address || '',
        status: item.statusi || 'Aktiv',
        lloji: formatLlojiEventType(item.lloji || 'Individual'),
      }));
    }
    if (title === 'Projektet e Dekorimit') {
      return items.map((item) => ({
        id: item.projektiId,
        title: item.emriProjektit || '',
        client: item.klienti ? klientLabel(item.klienti) : '',
        clientId: item.klienti?.klientiId ? String(item.klienti.klientiId) : '',
        date: item.dataFillimit || '',
        eventTime: formatTimeValue(item.oraEventit),
        endDate: item.dataPerfundimit || '',
        budget: item.buxheti ?? '',
        deposit: item.kapari ?? '',
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
        userName: item.user?.fullname || item.user?.username || '',
        userEmail: item.user?.email || '',
        client: item.klienti ? klientLabel(item.klienti) : '',
        clientId: item.klienti?.klientiId ? String(item.klienti.klientiId) : '',
        project: item.projekti ? projektLabel(item.projekti) : '',
        projectId: item.projekti?.projektiId ? String(item.projekti.projektiId) : '',
        rating: item.piket != null ? String(item.piket) : '',
        comment: item.komenti || '',
        recommendation: item.rekomandimi || '',
        date: item.dataVleresimit || '',
      }));
    }
    return items;
  }, []);

  const mapOutgoingData = (title, form) => {
    if (title === 'Punetoret') {
      const payload = {
        emri: form.firstName || '',
        mbiemri: form.lastName || '',
        pozita: form.position || '',
        telefoni: form.phone || '',
        paga: Number(form.salary) || 0,
        email: form.email || '',
        statusi: form.statusi || 'aktiv',
        specializimi: form.specialization || 'Dekorim',
        dataPunesimit: form.hireDate || null,
      };
      if (editingId) payload.punetoriId = Number(editingId);
      return payload;
    }
    if (title === 'Detyrat e Projekteve') {
      if (!form.projektiId || !form.workerEmail) {
        throw new Error('Zgjidh projektin dhe punetorin.');
      }
      const payload = {
        pershkrimi: form.task || '',
        dataFillimit: form.startDate || null,
        dataPerfundimit: form.endDate || null,
        statusi: form.status || 'I filluar',
        prioriteti: form.prioriteti || 'Normal',
        projekti: { projektiId: Number(form.projektiId) },
        punetori: { email: form.workerEmail },
        includeClientImages: form.includeClientImages === 'Po' || (!!form.brideRequestId && form.includeClientImages !== 'Jo'),
      };
      if (form.brideRequestId) {
        payload.brideToBeRequest = { requestId: Number(form.brideRequestId) };
      }
      if (editingId) payload.detyrimiId = Number(editingId);
      return payload;
    }
    if (title === 'Materialet') {
      const payload = {
        emri: form.name || '',
        kategoria: form.category || '',
        njesiaMatese: form.unit || '',
        sasiaStokut: Number(form.stock) || 0,
        cmimiPerNjesi: form.price !== '' && form.price != null ? Number(form.price) : 0,
      };
      if (form.supplierId) payload.furnitori = { furnitoriId: Number(form.supplierId) };
      if (editingId) payload.materialiId = Number(editingId);
      return payload;
    }
    if (title === 'Furnitorët') {
      const payload = {
        emri: form.company || '',
        kontaktiKryesor: form.contact || '',
        telefoni: form.phone || '',
        email: form.email || '',
        kushtetPageses: form.paymentTerms || '',
        vleresimi: Number(form.rating) || 1,
        statusi: form.statusi || 'Aktiv',
      };
      if (editingId) payload.furnitoriId = Number(editingId);
      return payload;
    }
    if (title === 'Përdorimi i Materialeve') {
      if (!form.projectId || !form.materialId) {
        throw new Error('Zgjidh projektin dhe materialin.');
      }
      const payload = {
        projekti: { projektiId: Number(form.projectId) },
        materiali: { materialiId: Number(form.materialId) },
        sasia: Number(form.quantity) || 0,
        dataPerdorimit: form.date || null,
      };
      if (editingId) payload.mpId = Number(editingId);
      return payload;
    }
    if (title === 'Fotografitë e Projekteve') {
      const payload = {
        pershkrimi: form.description || '',
        shtegu: (form.url || '').trim(),
        lloji: (form.lloji || 'wedding').trim().toLowerCase(),
      };
      if (!payload.shtegu && !form.photoFiles?.length) {
        throw new Error('Zgjidh nje foto nga pajisja.');
      }
      if (editingId) payload.fotografiaId = Number(editingId);
      return payload;
    }
    if (isEventRequestTitle(title)) {
      const payload = {
        brideName: form.brideName || '',
        telefoni: form.telefoni || '',
        eventDate: form.eventDate || null,
        eventTime: form.eventTime || null,
        location: form.location || '',
        selectedDecors: form.selectedDecors || '',
        statusi: form.statusi || 'I filluar',
      };
      if (form.punetoriId) {
        payload.punetori = { punetoriId: Number(form.punetoriId) };
      }
      if (editingId) payload.requestId = Number(editingId);
      return payload;
    }
    if (title === 'Përdoruesit') {
      const nameParts = (form.name || '').trim().split(' ');
      const payload = {
        emri: nameParts[0] || '',
        mbiemri: nameParts.slice(1).join(' ') || '',
        email: form.email || '',
        phoneNumber: form.phone || '',
        statusi: form.statusi || 'Aktiv',
        emailConfirmed: form.emailConfirmed === 'Po',
      };
      if (form.password) payload.passwordHash = form.password;
      if (form.roleIds) {
        payload.roles = form.roleIds
          .split(',')
          .map((id) => id.trim())
          .filter(Boolean)
          .map((id) => ({ id: Number(id) }));
      }
      if (!editingId && !payload.passwordHash) {
        throw new Error('Shkruaj fjalëkalimin për përdoruesin e ri.');
      }
      if (editingId) payload.id = Number(editingId);
      return payload;
    }
    if (title === 'Rolet') {
      const payload = {
        emertimi: form.name || '',
        pershkrimi: form.description || '',
        normalizedName: form.normalizedName || (form.name || '').toUpperCase(),
      };
      if (editingId) payload.id = Number(editingId);
      return payload;
    }
    if (title === 'Rolet e Përdoruesve') {
      if (!form.userEmail || !form.roleName) {
        throw new Error('Zgjidh perdoruesin dhe rolin.');
      }
      const payload = {
        userEmail: form.userEmail,
        roleName: form.roleName,
      };
      if (editingId) payload.id = Number(editingId);
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
        oraEventit: form.eventTime || null,
        buxheti: form.budget !== '' && form.budget != null ? Number(form.budget) : null,
        kapari: form.deposit !== '' && form.deposit != null ? Number(form.deposit) : null,
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
        rekomandimi: form.recommendation || '',
        dataVleresimit: form.date || null,
      };
      if (form.clientId) payload.klienti = { klientiId: Number(form.clientId) };
      if (form.projectId) payload.projekti = { projektiId: Number(form.projectId) };
      if (editingId) payload.vleresimiId = Number(editingId);
      return payload;
    }
    return form;
  };

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      let items = [];
      if (title === 'Punetoret') items = await api.getWorkers();
      else if (title === 'Detyrat e Projekteve') items = await api.getTasks();
      else if (title === 'Materialet') items = await api.getMaterials();
      else if (title === 'Furnitorët') items = await api.getSuppliers();
      else if (title === 'Përdorimi i Materialeve') items = await api.getMaterialUsage();
      else if (title === 'Fotografitë e Projekteve') items = await api.getPhotos();
      else if (title === 'Përdoruesit') items = await api.getUsers();
      else if (title === 'Rolet') items = await api.getRoles();
      else if (title === 'Rolet e Përdoruesve') items = await api.getUserRoles();
      else if (title === 'Menaxhimi i Klientëve') {
        items = await api.getKlientet();
        try {
          const requests = await api.getBrideToBeRequests();
          items = enrichKlientetFromEventRequests(items, requests);
        } catch {
          // vazhdo pa të dhëna nga kërkesat
        }
        if (filterStatus.trim()) {
          const q = filterStatus.trim().toLowerCase();
          items = items.filter((k) => (k.statusi || '').toLowerCase().includes(q));
        }
        if (filterLloji.trim()) {
          const q = filterLloji.trim().toLowerCase();
          items = items.filter((k) =>
            formatLlojiEventType(k.lloji || '').toLowerCase().includes(q)
          );
        }
      } else if (title === 'Projektet e Dekorimit') items = await api.getProjektet();
      else if (isEventRequestTitle(title)) {
        items = await api.getBrideToBeRequests();
        items = filterEventRequests(title, items);
      }
      else if (title === 'Faturat') items = await api.getFaturat();
      else if (title === 'Vlerësimet e Klientëve') items = await api.getVleresimet();
      else items = initialData || [];
      setData(sortMappedData(title, mapIncomingData(title, items)));
    } catch (error) {
      console.error('Gabim:', error);
      await alertDialog('Gabim ngarkimi: ' + formatApiError(error));
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, [alertDialog, filterLloji, filterStatus, initialData, mapIncomingData, title]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    const loadLookupOptions = async () => {
      const sources = [...new Set(columns.map((col) => col.optionsSource).filter(Boolean))];
      if (!sources.length) {
        setLookupOptions({});
        return;
      }

      try {
        const entries = await Promise.all(
          sources.map(async (source) => {
            if (source === 'projects') {
              const projects = await api.getProjektet();
              return [
                source,
                projects.map((project) => ({
                  value: String(project.projektiId),
                  label: title === 'Detyrat e Projekteve' ? projektMeKlientLabel(project) : projektLabel(project),
                })),
              ];
            }
            if (source === 'clients') {
              const clients = await api.getKlientet();
              return [
                source,
                clients.map((client) => ({
                  value: String(client.klientiId),
                  label: klientLabel(client),
                })),
              ];
            }
            if (source === 'users') {
              const users = await api.getUsers();
              const options = users
                .map((user) => ({
                  value: user.email || '',
                  label: `${user.fullname || user.emri || user.email}${user.email ? ' - ' + user.email : ''}`,
                }))
                .sort((a, b) => a.label.localeCompare(b.label, 'sq', { sensitivity: 'base' }));
              return [source, options];
            }
            if (source === 'suppliers') {
              const suppliers = await api.getSuppliers();
              return [
                source,
                suppliers.map((supplier) => ({
                  value: String(supplier.furnitoriId),
                  label: furnitoriLabel(supplier),
                })),
              ];
            }
            if (source === 'materials') {
              const materials = await api.getMaterials();
              return [
                source,
                materials.map((material) => ({
                  value: String(material.materialiId),
                  label: materialiLabel(material),
                })),
              ];
            }
            if (source === 'roles') {
              const roles = await api.getRoles();
              const options = roles
                .map((role) => ({
                  value: role.emertimi || '',
                  label: role.emertimi || '',
                }))
                .sort((a, b) => a.label.localeCompare(b.label, 'sq', { sensitivity: 'base' }));
              return [source, options];
            }
            if (source === 'brideRequests') {
              const requests = await api.getBrideToBeRequests();
              return [
                source,
                requests
                  .filter((request) => !isBabyShowerRequest(request) && !isWeddingRequest(request))
                  .map((request) => ({
                    value: String(request.requestId),
                    label: `${brideRequestLabel(request)}${request.eventDate ? ' - ' + request.eventDate : ''}`,
                  })),
              ];
            }
            if (source === 'workers') {
              const workers = await api.getWorkers();
              return [
                source,
                workers.map((worker) => ({
                  value: worker.email || '',
                  label: `${punetoriLabel(worker)}${worker.email ? ' - ' + worker.email : ''}`,
                })),
              ];
            }
            return [source, []];
          })
        );
        setLookupOptions(Object.fromEntries(entries));
      } catch (error) {
        console.error('Gabim gjate ngarkimit te listave:', error);
        setLookupOptions({});
      }
    };

    loadLookupOptions();
  }, [columns, title]);

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
      columns.filter((col) => !col.tableOnly).forEach((col) => {
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
    setFormErrors({});
  };

  const handleChange = (e, key) => {
    setFormData({ ...formData, [key]: e.target.value });
    setFormErrors((errors) => ({ ...errors, [key]: undefined, _form: undefined }));
  };

  const validateForm = () => {
    const errors = {};
    const addError = (key, message) => {
      if (!errors[key]) errors[key] = message;
    };

    formColumns.forEach((col) => {
      if (col.tableOnly || col.required === false) return;

      const value = formData[col.key];
      const missingFile = col.type === 'file' && !formData.url && (!value || value.length === 0);
      const missingValue = col.type !== 'file' && (value == null || String(value).trim() === '');

      if (missingFile || missingValue) {
        addError(col.key, `${col.label} eshte e detyrueshme.`);
      }
    });

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      addError('email', 'Shkruaj nje email valid.');
    }

    if (title === 'Punetoret') {
      if (formData.salary !== '' && formData.salary != null && Number(formData.salary) < 0) {
        addError('salary', 'Paga nuk mund te jete negative.');
      }
    }

    if (title === 'Detyrat e Projekteve') {
      if (!formData.projektiId) addError('projektiId', 'Zgjidh projektin.');
      if (!formData.workerEmail) addError('workerEmail', 'Zgjidh punetorin.');
      if (formData.startDate && formData.endDate && formData.endDate < formData.startDate) {
        addError('endDate', 'Data e perfundimit nuk mund te jete para dates se fillimit.');
      }
    }

    if (title === 'Fotografitë e Projekteve') {
      const hasNewFiles = Array.isArray(formData.photoFiles)
        ? formData.photoFiles.length > 0
        : Boolean(formData.photoFiles);
      if (!editingId && !hasNewFiles) {
        addError('photoFiles', 'Zgjidh te pakten nje fotografi.');
      }
      if (!formData.lloji) {
        addError('lloji', 'Zgjidh faqen ku do te shfaqet fotografia.');
      }
    }

    if (title === 'Përdoruesit') {
      if (!editingId && !formData.password) {
        addError('password', 'Fjalekalimi eshte i detyrueshem per perdorues te rinj.');
      }
      if (formData.password && formData.password.length < 6) {
        addError('password', 'Fjalekalimi duhet te kete se paku 6 karaktere.');
      }
    }

    if (title === 'Rolet') {
      if (!formData.name) {
        addError('name', 'Shkruaj emertimin e rolit.');
      }
    }

    if (title === 'Rolet e Përdoruesve') {
      if (!formData.userEmail) addError('userEmail', 'Zgjidh perdoruesin.');
      if (!formData.roleName) addError('roleName', 'Zgjidh rolin.');
    }

    if (title === 'Faturat') {
      if (!formData.clientId) addError('clientId', 'Zgjidh klientin.');
      if (formData.amount !== '' && formData.amount != null && Number(formData.amount) < 0) {
        addError('amount', 'Shuma nuk mund te jete negative.');
      }
    }

    if (formData.rating !== undefined && formData.rating !== '') {
      const rating = Number(formData.rating);
      if (Number.isNaN(rating) || rating < 1 || rating > 5) {
        addError('rating', 'Vleresimi duhet te jete nga 1 deri ne 5.');
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const body = mapOutgoingData(title, formData);

      if (title === 'Punetoret') {
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
      } else if (title === 'Materialet') {
        if (editingId) {
          const updated = await api.updateMaterial(editingId, body);
          setData(data.map((item) => (item.id === editingId ? mapIncomingData(title, [updated])[0] : item)));
        } else {
          const created = await api.createMaterial(body);
          setData([...data, mapIncomingData(title, [created])[0]]);
        }
      } else if (title === 'Furnitorët') {
        if (editingId) {
          const updated = await api.updateSupplier(editingId, body);
          setData(data.map((item) => (item.id === editingId ? mapIncomingData(title, [updated])[0] : item)));
        } else {
          const created = await api.createSupplier(body);
          setData([...data, mapIncomingData(title, [created])[0]]);
        }
      } else if (title === 'Përdorimi i Materialeve') {
        if (editingId) {
          const updated = await api.updateMaterialUsage(editingId, body);
          setData(data.map((item) => (item.id === editingId ? mapIncomingData(title, [updated])[0] : item)));
        } else {
          const created = await api.createMaterialUsage(body);
          setData([...data, mapIncomingData(title, [created])[0]]);
        }
      } else if (title === 'Fotografitë e Projekteve') {
        if (editingId) {
          if (formData.photoFiles?.[0]) {
            const uploaded = await api.uploadPhoto(formData.photoFiles[0]);
            body.shtegu = uploaded.url;
          }
          const updated = await api.updatePhoto(editingId, body);
          setData(data.map((item) => (item.id === editingId ? mapIncomingData(title, [updated])[0] : item)));
        } else {
          const createdPhotos = [];
          for (const file of formData.photoFiles || []) {
            const uploaded = await api.uploadPhoto(file);
            createdPhotos.push(await api.createPhoto({ ...body, shtegu: uploaded.url }));
          }
          setData([...data, ...mapIncomingData(title, createdPhotos)]);
        }
      } else if (isEventRequestTitle(title)) {
        if (editingId) {
          const updated = await api.updateBrideToBeRequest(editingId, body);
          setData(data.map((item) => (item.id === editingId ? mapIncomingData(title, [updated])[0] : item)));
        }
      } else if (title === 'Përdoruesit') {
        if (editingId) {
          const updated = await api.updateUser(editingId, body);
          setData(data.map((item) => (item.id === editingId ? mapIncomingData(title, [updated])[0] : item)));
        } else {
          const created = await api.createUser(body);
          setData([...data, mapIncomingData(title, [created])[0]]);
        }
      } else if (title === 'Rolet') {
        if (editingId) {
          const updated = await api.updateRole(editingId, body);
          setData(data.map((item) => (item.id === editingId ? mapIncomingData(title, [updated])[0] : item)));
        } else {
          const created = await api.createRole(body);
          setData([...data, mapIncomingData(title, [created])[0]]);
        }
      } else if (title === 'Rolet e Përdoruesve') {
        if (editingId) {
          const updated = await api.updateUserRole(editingId, body);
          setData(data.map((item) => (item.id === editingId ? mapIncomingData(title, [updated])[0] : item)));
        } else {
          const created = await api.createUserRole(body);
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
      await alertDialog('Operacioni u krye me sukses!');
    } catch (error) {
      setFormErrors({ _form: formatApiError(error) });
    }
  };

  const handleDelete = async (id) => {
    if (await confirmDialog('A jeni i sigurt që doni të fshini këtë rekord?')) {
      try {
        if (title === 'Punetoret') await api.deleteWorker(id);
        else if (title === 'Detyrat e Projekteve') await api.deleteTask(id);
        else if (title === 'Materialet') await api.deleteMaterial(id);
        else if (title === 'Furnitorët') await api.deleteSupplier(id);
        else if (title === 'Përdorimi i Materialeve') await api.deleteMaterialUsage(id);
        else if (title === 'Fotografitë e Projekteve') await api.deletePhoto(id);
        else if (isEventRequestTitle(title)) await api.deleteBrideToBeRequest(id);
        else if (title === 'Përdoruesit') await api.deleteUser(id);
        else if (title === 'Rolet') await api.deleteRole(id);
        else if (title === 'Rolet e Përdoruesve') await api.deleteUserRole(id);
        else if (title === 'Menaxhimi i Klientëve') await api.deleteKlient(id);
        else if (title === 'Projektet e Dekorimit') await api.deleteProjekt(id);
        else if (title === 'Faturat') await api.deleteFatura(id);
        else if (title === 'Vlerësimet e Klientëve') await api.deleteVleresim(id);
        setData(data.filter((item) => item.id !== id));
        await alertDialog('Fshirja u krye me sukses!');
        await loadData();
      } catch (error) {
        await alertDialog('Ndodhi një gabim gjatë fshirjes: ' + formatApiError(error));
      }
    }
  };

  const renderField = (col) => {
    const fieldClassName = `w-full px-4 py-2 bg-[#f6f1e8] border rounded-lg outline-none ${
      formErrors[col.key] ? 'border-red-500 ring-1 ring-red-200' : 'border-[#c9c1b5]'
    }`;

    if (col.type === 'photoLinks') {
      return (
        <textarea
          required={col.required !== false}
          value={formData[col.key] || ''}
          onChange={(e) => handleChange(e, col.key)}
          aria-invalid={Boolean(formErrors[col.key])}
          className={`${fieldClassName} min-h-[120px]`}
        />
      );
    }
    if (col.type === 'file') {
      return (
        <input
          type="file"
          accept="image/*"
          multiple={col.multiple}
          required={col.required !== false && !formData.url}
          onChange={(e) => {
            setFormData({
              ...formData,
              [col.key]: col.multiple ? Array.from(e.target.files || []) : e.target.files?.[0] || null,
            });
            setFormErrors((errors) => ({ ...errors, [col.key]: undefined, _form: undefined }));
          }}
          aria-invalid={Boolean(formErrors[col.key])}
          className={`${fieldClassName} file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#2b2b2b] file:text-white`}
        />
      );
    }
    if (col.type === 'select') {
      const options = col.options || lookupOptions[col.optionsSource] || [];
      return (
        <select
          required={col.required !== false}
          value={formData[col.key] || ''}
          onChange={(e) => handleChange(e, col.key)}
          disabled={col.optionsSource && options.length === 0}
          aria-invalid={Boolean(formErrors[col.key])}
          className={fieldClassName}
        >
          <option value="">
            {options.length === 0 && col.optionsSource ? 'Nuk ka të dhëna' : 'Zgjidh...'}
          </option>
          {options.map((option) => (
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
          aria-invalid={Boolean(formErrors[col.key])}
          className={`${fieldClassName} min-h-[100px]`}
        />
      );
    }
    return (
      <input
        type={col.type || 'text'}
        required={col.required !== false}
        value={formData[col.key] || ''}
        onChange={(e) => handleChange(e, col.key)}
        aria-invalid={Boolean(formErrors[col.key])}
        className={fieldClassName}
      />
    );
  };

  const tableColumns = columns.filter((col) => !col.formOnly);
  const formColumns = columns.filter((col) => !col.tableOnly);

  const renderCellValue = (item, col) => {
    const value = getCellValue(item, col);

    if (col.type === 'photoLinks') {
      const links = parseSelectedDecorLinks(value);
      if (!links.length) return '';

      return (
        <div className="flex flex-wrap gap-2 max-w-xs">
          {links.map((link, index) => (
            <a
              key={`${link.url}-${index}`}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-lg border border-[#c9c1b5] bg-[#f6f1e8] px-3 py-1 text-xs font-medium text-[#2b2b2b] hover:bg-white"
              title={link.title}
            >
              Hap foton {index + 1}
            </a>
          ))}
        </div>
      );
    }

    if (col.type === 'image') {
      const src = normalizeAssetUrl(value);
      if (!src) return '';

      return (
        <a href={src} target="_blank" rel="noreferrer" className="inline-block">
          <img
            src={src}
            alt={item.description || 'Foto'}
            className="h-16 w-16 rounded-lg object-cover border border-[#c9c1b5]"
          />
        </a>
      );
    }

    if (col.badge) {
      return (
        <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${statusBadgeClass(value)}`}>
          {value}
        </span>
      );
    }

    if (col.type === 'time') {
      return formatTimeValue(value);
    }

    return value;
  };

  return (
    <div className="bg-[#efe9df] rounded-xl shadow-sm border border-[#c9c1b5] p-6">
      <ConfirmModal />
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
                  <th
                    key={col.key}
                    className={`p-4 text-sm font-medium text-gray-600 ${col.cellClassName || ''}`}
                  >
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
                      <td
                        key={col.key}
                        className={`p-4 text-sm text-gray-700 ${col.cellClassName || ''}`}
                      >
                        {renderCellValue(item, col)}
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
                  {formColumns.map((col) => (
                    <div key={col.key}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {col.label}
                      </label>
                      {renderField(col)}
                      {formErrors[col.key] && (
                        <p className="mt-1 text-sm text-red-600">{formErrors[col.key]}</p>
                      )}
                    </div>
                  ))}
                </div>
                {formErrors._form && (
                  <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {formErrors._form}
                  </div>
                )}
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
