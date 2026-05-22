const BASE_URL = "http://localhost:8080/api";

export const hasRole = (roles, roleName) => {
  if (!roles) return false;
  return roles.split(",").some((r) => r.trim() === roleName);
};

const getHeaders = () => {
  const token = sessionStorage.getItem("accessToken");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) throw new Error("Nuk ka refresh token");

  const res = await fetch(`${BASE_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) {
    localStorage.removeItem("refreshToken");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("role");
    window.location.href = "/login";
    throw new Error("Sesioni skadoi");
  }

  const data = await res.json();
  sessionStorage.setItem("accessToken", data.accessToken);
  if (data.refreshToken) {
    localStorage.setItem("refreshToken", data.refreshToken);
  }
  if (data.role) {
    sessionStorage.setItem("role", data.role);
  }
  return data.accessToken;
};

const fetchWithAuth = async (url, options = {}) => {
  const headers = { ...getHeaders(), ...options.headers };
  let res = await fetch(url, { ...options, headers });

  if (res.status === 401) {
    await refreshAccessToken();
    const retryHeaders = { ...getHeaders(), ...options.headers };
    res = await fetch(url, { ...options, headers: retryHeaders });
  }

  return res;
};

export const api = {
  login: async (email, password) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("Email ose fjalëkalimi gabim");
    return res.json();
  },

  register: async (email, password) => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("Regjistrim dështoi");
    return res.json();
  },

  getKlientet: async () => {
    const res = await fetchWithAuth(`${BASE_URL}/klienti`);
    if (!res.ok) throw new Error("Dështoi ngarkimi i klientëve");
    return res.json();
  },
  createKlient: async (data) => {
    const res = await fetchWithAuth(`${BASE_URL}/klienti`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Dështoi shtimi i klientit");
    return res.json();
  },
  updateKlient: async (id, data) => {
    const res = await fetchWithAuth(`${BASE_URL}/klienti/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Dështoi përditësimi i klientit");
    return res.json();
  },
  deleteKlient: async (id) => {
    const res = await fetchWithAuth(`${BASE_URL}/klienti/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Dështoi fshirja e klientit");
    return res;
  },

  getProjektet: async () => {
    const res = await fetchWithAuth(`${BASE_URL}/projektet`);
    if (!res.ok) throw new Error("Dështoi ngarkimi i projekteve");
    return res.json();
  },
  createProjekt: async (data) => {
    const res = await fetchWithAuth(`${BASE_URL}/projektet`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Dështoi shtimi i projektit");
    return res.json();
  },
  updateProjekt: async (id, data) => {
    const res = await fetchWithAuth(`${BASE_URL}/projektet/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Dështoi përditësimi i projektit");
    return res.json();
  },
  deleteProjekt: async (id) => {
    const res = await fetchWithAuth(`${BASE_URL}/projektet/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Dështoi fshirja e projektit");
    return res;
  },

  getFaturat: async () => {
    const res = await fetchWithAuth(`${BASE_URL}/faturat`);
    if (!res.ok) throw new Error("Dështoi ngarkimi i faturave");
    return res.json();
  },
  createFatura: async (data) => {
    const res = await fetchWithAuth(`${BASE_URL}/faturat`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Dështoi shtimi i faturës");
    return res.json();
  },
  updateFatura: async (id, data) => {
    const res = await fetchWithAuth(`${BASE_URL}/faturat/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Dështoi përditësimi i faturës");
    return res.json();
  },
  deleteFatura: async (id) => {
    const res = await fetchWithAuth(`${BASE_URL}/faturat/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Dështoi fshirja e faturës");
    return res;
  },

  getVleresimet: async () => {
    const res = await fetchWithAuth(`${BASE_URL}/vleresimet`);
    if (!res.ok) throw new Error("Dështoi ngarkimi i vlerësimeve");
    return res.json();
  },
  createVleresim: async (data) => {
    const res = await fetchWithAuth(`${BASE_URL}/vleresimet`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Dështoi shtimi i vlerësimit");
    return res.json();
  },
  updateVleresim: async (id, data) => {
    const res = await fetchWithAuth(`${BASE_URL}/vleresimet/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Dështoi përditësimi i vlerësimit");
    return res.json();
  },
  deleteVleresim: async (id) => {
    const res = await fetchWithAuth(`${BASE_URL}/vleresimet/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Dështoi fshirja e vlerësimit");
    return res;
  },

  getWorkers: async () => {
    const res = await fetchWithAuth(`${BASE_URL}/punetoret`);
    if (!res.ok) throw new Error("Dështoi ngarkimi i punëtorëve");
    return res.json();
  },
  createWorker: async (data) => {
    const res = await fetchWithAuth(`${BASE_URL}/punetoret`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Dështoi shtimi i punëtorit");
    return res.json();
  },
  updateWorker: async (id, data) => {
    const res = await fetchWithAuth(`${BASE_URL}/punetoret/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Dështoi përditësimi i punëtorit");
    return res.json();
  },
  deleteWorker: async (id) => {
    const res = await fetchWithAuth(`${BASE_URL}/punetoret/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Dështoi fshirja e punëtorit");
    return res;
  },

  getTasks: async () => {
    const res = await fetchWithAuth(`${BASE_URL}/detyrimet-projektit`);
    if (!res.ok) throw new Error("Dështoi ngarkimi i detyrave");
    return res.json();
  },
  createTask: async (data) => {
    const res = await fetchWithAuth(`${BASE_URL}/detyrimet-projektit`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Dështoi shtimi i detyrës");
    return res.json();
  },
  updateTask: async (id, data) => {
    const res = await fetchWithAuth(`${BASE_URL}/detyrimet-projektit/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Dështoi përditësimi i detyrës");
    return res.json();
  },
  deleteTask: async (id) => {
    const res = await fetchWithAuth(`${BASE_URL}/detyrimet-projektit/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Dështoi fshirja e detyrës");
    return res;
  },

  getPhotos: async () => {
    const res = await fetchWithAuth(`${BASE_URL}/fotografite`);
    if (!res.ok) throw new Error("Dështoi ngarkimi i fotografive");
    return res.json();
  },
  createPhoto: async (data) => {
    const res = await fetchWithAuth(`${BASE_URL}/fotografite`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Dështoi shtimi i fotografisë");
    return res.json();
  },
  updatePhoto: async (id, data) => {
    const res = await fetchWithAuth(`${BASE_URL}/fotografite/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Dështoi përditësimi i fotografisë");
    return res.json();
  },
  deletePhoto: async (id) => {
    const res = await fetchWithAuth(`${BASE_URL}/fotografite/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Dështoi fshirja e fotografisë");
    return res;
  },
};
