const BASE_URL = "http://localhost:3360/api";

const getHeaders = () => {
  const token = sessionStorage.getItem("accessToken");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const api = {
  getWorkers: async () => {
    const res = await fetch(`${BASE_URL}/punetoret`, { headers: getHeaders() });
    if (!res.ok) throw new Error("Dështoi ngarkimi i punëtorëve");
    return res.json();
  },
  createWorker: async (data) => {
    const res = await fetch(`${BASE_URL}/punetoret`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Dështoi shtimi i punëtorit");
    return res.json();
  },
  updateWorker: async (id, data) => {
    const res = await fetch(`${BASE_URL}/punetoret/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Dështoi përditësimi i punëtorit");
    return res.json();
  },
  deleteWorker: async (id) => {
    const res = await fetch(`${BASE_URL}/punetoret/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error("Dështoi fshirja e punëtorit");
    return res;
  },

  getTasks: async () => {
    const res = await fetch(`${BASE_URL}/detyrimet-projektit`, { headers: getHeaders() });
    if (!res.ok) throw new Error("Dështoi ngarkimi i detyrave");
    return res.json();
  },
  createTask: async (data) => {
    const res = await fetch(`${BASE_URL}/detyrimet-projektit`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Dështoi shtimi i detyrës");
    return res.json();
  },
  updateTask: async (id, data) => {
    const res = await fetch(`${BASE_URL}/detyrimet-projektit/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Dështoi përditësimi i detyrës");
    return res.json();
  },
  deleteTask: async (id) => {
    const res = await fetch(`${BASE_URL}/detyrimet-projektit/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error("Dështoi fshirja e detyrës");
    return res;
  },

  getPhotos: async () => {
    const res = await fetch(`${BASE_URL}/fotografite`, { headers: getHeaders() });
    if (!res.ok) throw new Error("Dështoi ngarkimi i fotografive");
    return res.json();
  },
  createPhoto: async (data) => {
    const res = await fetch(`${BASE_URL}/fotografite`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Dështoi shtimi i fotografisë");
    return res.json();
  },
  updatePhoto: async (id, data) => {
    const res = await fetch(`${BASE_URL}/fotografite/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Dështoi përditësimi i fotografisë");
    return res.json();
  },
  deletePhoto: async (id) => {
    const res = await fetch(`${BASE_URL}/fotografite/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error("Dështoi fshirja e fotografisë");
    return res;
  },
};
