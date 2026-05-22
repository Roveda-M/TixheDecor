import axiosInstance from "./axiosInstance";

export const api = {
  // AUTH
  login: async (email, password) => {
    const res = await axiosInstance.post("/auth/login", { email, password });
    return res.data;
  },

  register: async (email, password) => {
    const res = await axiosInstance.post("/auth/register", { email, password });
    return res.data;
  },

  // KLIENTI
  getKlientet: async () => {
    const res = await axiosInstance.get("/klienti");
    return res.data;
  },
  createKlient: async (data) => {
    const res = await axiosInstance.post("/klienti", data);
    return res.data;
  },
  updateKlient: async (id, data) => {
    const res = await axiosInstance.put(`/klienti/${id}`, data);
    return res.data;
  },
  deleteKlient: async (id) => {
    await axiosInstance.delete(`/klienti/${id}`);
  },

  // PROJEKTI
  getProjektet: async () => {
    const res = await axiosInstance.get("/projekti");
    return res.data;
  },
  createProjekt: async (data) => {
    const res = await axiosInstance.post("/projekti", data);
    return res.data;
  },
  updateProjekt: async (id, data) => {
    const res = await axiosInstance.put(`/projekti/${id}`, data);
    return res.data;
  },
  deleteProjekt: async (id) => {
    await axiosInstance.delete(`/projekti/${id}`);
  },

  // FATURA
  getFaturat: async () => {
    const res = await axiosInstance.get("/fatura");
    return res.data;
  },
  createFatura: async (data) => {
    const res = await axiosInstance.post("/fatura", data);
    return res.data;
  },
  updateFatura: async (id, data) => {
    const res = await axiosInstance.put(`/fatura/${id}`, data);
    return res.data;
  },
  deleteFatura: async (id) => {
    await axiosInstance.delete(`/fatura/${id}`);
  },

  // VLERESIMI
  getVleresimet: async () => {
    const res = await axiosInstance.get("/vleresimi");
    return res.data;
  },
  createVleresim: async (data) => {
    const res = await axiosInstance.post("/vleresimi", data);
    return res.data;
  },
  updateVleresim: async (id, data) => {
    const res = await axiosInstance.put(`/vleresimi/${id}`, data);
    return res.data;
  },
  deleteVleresim: async (id) => {
    await axiosInstance.delete(`/vleresimi/${id}`);
  },

  // PUNETORI
  getWorkers: async () => {
    const res = await axiosInstance.get("/punetoret");
    return res.data;
  },
  createWorker: async (data) => {
    const res = await axiosInstance.post("/punetoret", data);
    return res.data;
  },
  updateWorker: async (id, data) => {
    const res = await axiosInstance.put(`/punetoret/${id}`, data);
    return res.data;
  },
  deleteWorker: async (id) => {
    await axiosInstance.delete(`/punetoret/${id}`);
  },
  forgotPassword: async (email) => {
    const res = await axiosInstance.post("/auth/forgot-password", {
      email,
    });
    return res.data;
  },
  resetPassword: async (token, password) => {
    const res = await axiosInstance.post("/auth/reset-password", {
      token,
      password,
    });
    return res.data;
  },
};