import React, { useEffect, useState } from 'react';
import { FiCheckSquare, FiLogOut, FiRefreshCw } from 'react-icons/fi';
import { api, formatApiError } from '../api';
import { useConfirmModal } from '../ConfirmModal';

const statuses = ['I filluar', 'Ne proces', 'I perfunduar'];

const statusClass = (status) => {
  if (status === 'I perfunduar') return 'border-green-200 bg-green-50 text-green-700';
  if (status === 'Ne proces') return 'border-amber-200 bg-amber-50 text-amber-700';
  return 'border-blue-200 bg-blue-50 text-blue-700';
};

const projectName = (task) =>
  task.brideToBeRequest?.brideName
    ? `BrideToBe - ${task.brideToBeRequest.brideName}`
    : task.projekti?.emriProjektit || task.projekti?.llojiDekorimit || `Projekti #${task.projekti?.projektiId || ''}`;

const normalizeStatus = (status) => {
  if (status === 'Ne proces') return 'Ne proces';
  if (status === 'I perfunduar') return 'I perfunduar';
  return status || 'I filluar';
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
        .filter((item) => item.title && item.url);
};

const taskImages = (task) => {
  const selectedDecors = task.brideToBeRequest?.selectedDecors || task.projekti?.llojiDekorimit;
  if (!selectedDecors) return [];
  return parseSelectedDecorLinks(selectedDecors);
};

export default function WorkerDashboard() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState(null);
  const { alertDialog, ConfirmModal } = useConfirmModal();

  const loadTasks = async () => {
    setIsLoading(true);
    try {
      const items = await api.getMyTasks();
      setTasks(items);
      setError('');
    } catch (err) {
      setError(formatApiError(err));
      setTasks([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const updateStatus = async (taskId, statusi) => {
    setUpdatingId(taskId);
    try {
      const updated = await api.updateMyTaskStatus(taskId, statusi);
      setTasks((current) =>
        current.map((task) => (task.detyrimiId === taskId ? updated : task))
      );
    } catch (err) {
      await alertDialog(formatApiError(err));
    } finally {
      setUpdatingId(null);
    }
  };

  const logout = () => {
    localStorage.removeItem('refreshToken');
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('role');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-[#f6f1e8] text-[#2b2b2b]">
      <ConfirmModal />
      <header className="border-b border-[#c9c1b5] bg-[#f6f1e8]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 lg:px-8">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">Dashboard i Punëtorit</h1>
            <p className="text-sm text-gray-500">Detyrat e caktuara për ty</p>
          </div>
          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 lg:px-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="inline-flex items-center gap-3 rounded-xl border border-[#c9c1b5] bg-[#efe9df] px-4 py-3">
            <FiCheckSquare className="text-[#8b6a4a]" />
            <span className="text-sm font-semibold">{tasks.length} detyra</span>
          </div>
          <button
            type="button"
            onClick={loadTasks}
            className="inline-flex items-center gap-2 rounded-lg border border-[#c9c1b5] px-4 py-2 text-sm font-medium hover:bg-[#efe9df]"
          >
            <FiRefreshCw /> Rifresko
          </button>
        </div>

        <div className="overflow-hidden rounded-xl border border-[#c9c1b5] bg-[#efe9df] shadow-sm">
          {isLoading ? (
            <div className="p-8 text-center text-gray-500">Duke ngarkuar detyrat...</div>
          ) : error ? (
            <div className="m-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">{error}</div>
          ) : tasks.length === 0 ? (
            <div className="p-8 text-center text-gray-500">Nuk ka detyra të caktuara.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[#c9c1b5] bg-[#e6dfd3]">
                    <th className="p-4 text-sm font-medium text-gray-600">Detyra</th>
                    <th className="p-4 text-sm font-medium text-gray-600">Projekti/Eventi</th>
                    <th className="p-4 text-sm font-medium text-gray-600">Afati</th>
                    <th className="p-4 text-sm font-medium text-gray-600">Client Reference Images</th>
                    <th className="p-4 text-sm font-medium text-gray-600">Statusi</th>
                    <th className="p-4 text-sm font-medium text-gray-600">Ndrysho</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => {
                    const currentStatus = normalizeStatus(task.statusi);
                    const images = taskImages(task);
                    return (
                      <tr key={task.detyrimiId} className="border-b border-[#c9c1b5]/30 last:border-0">
                        <td className="p-4 text-sm text-gray-700">{task.pershkrimi || 'Detyrë pa përshkrim'}</td>
                        <td className="p-4 text-sm text-gray-700">{projectName(task)}</td>
                        <td className="p-4 text-sm text-gray-700">{task.dataPerfundimit || task.dataFillimit || '-'}</td>
                        <td className="p-4">
                          {images.length ? (
                            <div className="grid min-w-[180px] grid-cols-3 gap-2">
                              {images.map((image, index) => (
                                <a key={`${image.url}-${index}`} href={image.url} target="_blank" rel="noreferrer">
                                  <img
                                    src={image.url}
                                    alt={image.title || `Reference ${index + 1}`}
                                    className="h-16 w-16 rounded-lg border border-[#c9c1b5] object-cover"
                                  />
                                </a>
                              ))}
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400">-</span>
                          )}
                        </td>
                        <td className="p-4">
                          <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${statusClass(currentStatus)}`}>
                            {currentStatus}
                          </span>
                        </td>
                        <td className="p-4">
                          <select
                            value={currentStatus}
                            onChange={(e) => updateStatus(task.detyrimiId, e.target.value)}
                            disabled={updatingId === task.detyrimiId}
                            className="rounded-lg border border-[#c9c1b5] bg-[#f6f1e8] px-3 py-2 text-sm outline-none disabled:opacity-60"
                          >
                            {statuses.map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
