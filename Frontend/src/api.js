import axios from "axios";
import axiosInstance from "./axiosInstance";

export const formatApiError = (error) => {
  const data = error.response?.data;
  if (typeof data === "string") return data;
  if (data?.error) return data.error;
  if (data?.message) return data.message;
  return error.message || "Gabim i panjohur";
};

export const hasRole = (roles, roleName) => {
  if (!roles) return false;
  return roles.split(",").some((r) => r.trim() === roleName);
};

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

  forgotPassword: async (email) => {
    const res = await axios.post("http://localhost:8080/api/auth/forgot-password", { email });
    return res.data;
  },

  resetPassword: async (token, password) => {
    const res = await axios.post("http://localhost:8080/api/auth/reset-password", { token, password });
    return res.data;
  },

  // KLIENTI — backend: /api/klienti
  getKlientet: async () => {
    const res = await axiosInstance.get("/klienti");
    return res.data;
  },

  getKlientetByStatusi: async (statusi) => {
    const res = await axiosInstance.get(
      `/klienti/statusi/${encodeURIComponent(statusi)}`
    );
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

  // PROJEKTI — backend: /api/projektet (jo /projekti)
  getProjektet: async () => {
    const res = await axiosInstance.get("/projektet");
    return res.data;
  },

  createProjekt: async (data) => {
    const res = await axiosInstance.post("/projektet", data);
    return res.data;
  },

  updateProjekt: async (id, data) => {
    const res = await axiosInstance.put(`/projektet/${id}`, data);
    return res.data;
  },

  deleteProjekt: async (id) => {
    await axiosInstance.delete(`/projektet/${id}`);
  },

  // FATURA — backend: /api/faturat (jo /fatura)
  getFaturat: async () => {
    const res = await axiosInstance.get("/faturat");
    return res.data;
  },

  createFatura: async (data) => {
    const res = await axiosInstance.post("/faturat", data);
    return res.data;
  },

  updateFatura: async (id, data) => {
    const res = await axiosInstance.put(`/faturat/${id}`, data);
    return res.data;
  },

  deleteFatura: async (id) => {
    await axiosInstance.delete(`/faturat/${id}`);
  },

  // VLERESIMI — backend: /api/vleresimet (jo /vleresimi)
  getVleresimet: async () => {
    const res = await axiosInstance.get("/vleresimet");
    return res.data;
  },

  createVleresim: async (data) => {
    const res = await axiosInstance.post("/vleresimet", data);
    return res.data;
  },

  updateVleresim: async (id, data) => {
    const res = await axiosInstance.put(`/vleresimet/${id}`, data);
    return res.data;
  },

  deleteVleresim: async (id) => {
    await axiosInstance.delete(`/vleresimet/${id}`);
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

  // DETYRAT (kolegët — nëse përdoren në dashboard)
  getTasks: async () => {
    const res = await axiosInstance.get("/detyrimet-projektit");
    return res.data;
  },

  createTask: async (data) => {
    const res = await axiosInstance.post("/detyrimet-projektit", data);
    return res.data;
  },

  updateTask: async (id, data) => {
    const res = await axiosInstance.put(`/detyrimet-projektit/${id}`, data);
    return res.data;
  },

  deleteTask: async (id) => {
    await axiosInstance.delete(`/detyrimet-projektit/${id}`);
  },

  // BRIDE TO BE REQUESTS
  getBrideToBeRequests: async () => {
    const res = await axiosInstance.get("/bride-to-be-requests");
    return res.data;
  },

  createBrideToBeRequest: async (data) => {
    const res = await axiosInstance.post("/bride-to-be-requests", data);
    return res.data;
  },

  updateBrideToBeRequest: async (id, data) => {
    const res = await axiosInstance.put(`/bride-to-be-requests/${id}`, data);
    return res.data;
  },

  deleteBrideToBeRequest: async (id) => {
    await axiosInstance.delete(`/bride-to-be-requests/${id}`);
  },

  // FOTOGRAFITE
  getPhotos: async () => {
    const res = await axiosInstance.get("/fotografite");
    return res.data;
  },

  createPhoto: async (data) => {
    const res = await axiosInstance.post("/fotografite", data);
    return res.data;
  },

  uploadPhoto: async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await axiosInstance.post("/fotografite/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  updatePhoto: async (id, data) => {
    const res = await axiosInstance.put(`/fotografite/${id}`, data);
    return res.data;
  },

  deletePhoto: async (id) => {
    await axiosInstance.delete(`/fotografite/${id}`);
  },

  // USERS / ROLES
  getUsers: async () => {
    const res = await axiosInstance.get("/users");
    return res.data;
  },

  createUser: async (data) => {
    const res = await axiosInstance.post("/users", data);
    return res.data;
  },

  updateUser: async (id, data) => {
    const res = await axiosInstance.put(`/users/${id}`, data);
    return res.data;
  },

  deleteUser: async (id) => {
    await axiosInstance.delete(`/users/${id}`);
  },

  getRoles: async () => {
    const res = await axiosInstance.get("/roles");
    return res.data;
  },

  createRole: async (data) => {
    const res = await axiosInstance.post("/roles", data);
    return res.data;
  },

  updateRole: async (id, data) => {
    const res = await axiosInstance.put(`/roles/${id}`, data);
    return res.data;
  },

  deleteRole: async (id) => {
    await axiosInstance.delete(`/roles/${id}`);
  },

  getUserRoles: async () => {
    const res = await axiosInstance.get("/user-roles");
    return res.data;
  },

  createUserRole: async (data) => {
    const res = await axiosInstance.post("/user-roles", data);
    return res.data;
  },

  updateUserRole: async (id, data) => {
    const res = await axiosInstance.put(`/user-roles/${id}`, data);
    return res.data;
  },

  deleteUserRole: async (id) => {
    await axiosInstance.delete(`/user-roles/${id}`);
  },

  getMaterialUsage: async () => {
    const res = await axiosInstance.get("/materialet-projektit");
    return res.data;
  },
};
