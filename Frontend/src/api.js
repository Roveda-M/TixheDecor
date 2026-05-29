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

  register: async (email, password, fullname, username) => {
    const res = await axiosInstance.post("/auth/register", {
      email, password, fullname, username
    });
    return res.data;
  },
  forgotPassword: async (email) => {
    const res = await axiosInstance.post("/auth/forgot-password", { email });
    return res.data;
  },

  resetPassword: async (token, password) => {
    const res = await axiosInstance.post("/auth/reset-password", { token, password });
    return res.data;
  },
  // PROFILE
  getProfile: async () => {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  },

  updateProfile: async (data) => {
    const res = await axiosInstance.put("/auth/me", data);
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

  createFeedback: async (data) => {
    const res = await axiosInstance.post("/vleresimet/feedback", data);
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

  getMyTasks: async () => {
    const res = await axiosInstance.get("/detyrimet-projektit/my");
    return res.data;
  },

  updateMyTaskStatus: async (id, statusi) => {
    const res = await axiosInstance.patch(`/detyrimet-projektit/${id}/status`, { statusi });
    return res.data;
  },

  deleteTask: async (id) => {
    await axiosInstance.delete(`/detyrimet-projektit/${id}`);
  },

  // INVENTARI
  getMaterials: async () => {
    const res = await axiosInstance.get("/materialet");
    return res.data;
  },

  createMaterial: async (data) => {
    const res = await axiosInstance.post("/materialet", data);
    return res.data;
  },

  updateMaterial: async (id, data) => {
    const res = await axiosInstance.put(`/materialet/${id}`, data);
    return res.data;
  },

  deleteMaterial: async (id) => {
    await axiosInstance.delete(`/materialet/${id}`);
  },

  // FURNITORET
  getSuppliers: async () => {
    const res = await axiosInstance.get("/furnitoret");
    return res.data;
  },

  createSupplier: async (data) => {
    const res = await axiosInstance.post("/furnitoret", data);
    return res.data;
  },

  updateSupplier: async (id, data) => {
    const res = await axiosInstance.put(`/furnitoret/${id}`, data);
    return res.data;
  },

  deleteSupplier: async (id) => {
    await axiosInstance.delete(`/furnitoret/${id}`);
  },

  createMaterialUsage: async (data) => {
    const res = await axiosInstance.post("/materialet-projektit", data);
    return res.data;
  },

  updateMaterialUsage: async (id, data) => {
    const res = await axiosInstance.put(`/materialet-projektit/${id}`, data);
    return res.data;
  },

  deleteMaterialUsage: async (id) => {
    await axiosInstance.delete(`/materialet-projektit/${id}`);
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
