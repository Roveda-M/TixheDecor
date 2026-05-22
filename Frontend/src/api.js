const BASE_URL = "http://localhost:8080/api";

const getHeaders = () => {
  const token = sessionStorage.getItem("accessToken");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// Refresh token automatikisht
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
    window.location.href = "/login";
    throw new Error("Sesioni skadoi");
  }

  const data = await res.json();
  sessionStorage.setItem("accessToken", data.accessToken);
  return data.accessToken;
};

// Request me refresh automatik
const fetchWithAuth = async (url, options = {}) => {
  let res = await fetch(url, { ...options, headers: getHeaders() });

  if (res.status === 401) {
    await refreshAccessToken();
    res = await fetch(url, { ...options, headers: getHeaders() });
  }

  return res;
};

export const api = {
  // AUTH
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

  // KLIENTI
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
    const res = await fetchWithAuth(`${BASE_URL}/klienti/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Dështoi fshirja e klientit");
    return res;
  },

  // PROJEKTI
  getProjektet: async () => {
    const res = await fetchWithAuth(`${BASE_URL}/projekti`);
    if (!res.ok) throw new Error("Dështoi ngarkimi i projekteve");
    return res.json();
  },
  createProjekt: async (data) => {
    const res = await fetchWithAuth(`${BASE_URL}/projekti`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Dështoi shtimi i projektit");
    return res.json();
  },
  updateProjekt: async (id, data) => {
    const res = await fetchWithAuth(`${BASE_URL}/projekti/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Dështoi përditësimi i projektit");
    return res.json();
  },
  deleteProjekt: async (id) => {
    const res = await fetchWithAuth(`${BASE_URL}/projekti/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Dështoi fshirja e projektit");
    return res;
  },

  // FATURA
  getFaturat: async () => {
    const res = await fetchWithAuth(`${BASE_URL}/fatura`);
    if (!res.ok) throw new Error("Dështoi ngarkimi i faturave");
    return res.json();
  },
  createFatura: async (data) => {
    const res = await fetchWithAuth(`${BASE_URL}/fatura`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Dështoi shtimi i faturës");
    return res.json();
  },
  updateFatura: async (id, data) => {
    const res = await fetchWithAuth(`${BASE_URL}/fatura/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Dështoi përditësimi i faturës");
    return res.json();
  },
  deleteFatura: async (id) => {
    const res = await fetchWithAuth(`${BASE_URL}/fatura/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Dështoi fshirja e faturës");
    return res;
  },

  // VLERESIMI
  getVleresimet: async () => {
    const res = await fetchWithAuth(`${BASE_URL}/vleresimi`);
    if (!res.ok) throw new Error("Dështoi ngarkimi i vlerësimeve");
    return res.json();
  },
  createVleresim: async (data) => {
    const res = await fetchWithAuth(`${BASE_URL}/vleresimi`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Dështoi shtimi i vlerësimit");
    return res.json();
  },
  updateVleresim: async (id, data) => {
    const res = await fetchWithAuth(`${BASE_URL}/vleresimi/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Dështoi përditësimi i vlerësimit");
    return res.json();
  },
  deleteVleresim: async (id) => {
    const res = await fetchWithAuth(`${BASE_URL}/vleresimi/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Dështoi fshirja e vlerësimit");
    return res;
  },

  // Punetori, Tasks, Photos nga kolegu
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
    const res = await fetchWithAuth(`${BASE_URL}/punetoret/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Dështoi fshirja e punëtorit");
    return res;
  },
};
