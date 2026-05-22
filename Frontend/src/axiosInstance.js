import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// Request Interceptor — shto token çdo kërkesë
axiosInstance.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor — refresh token kur skadon
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        const status = error.response?.status;
        const needsAuth = status === 401 || status === 403;

        if (needsAuth && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem("refreshToken");
                if (!refreshToken) {
                    sessionStorage.removeItem("accessToken");
                    sessionStorage.removeItem("role");
                    window.location.href = "/login";
                    return Promise.reject(error);
                }

                const res = await axios.post(
                    "/api/auth/refresh",
                    { refreshToken }
                );

                const newAccessToken = res.data.accessToken;
                sessionStorage.setItem("accessToken", newAccessToken);
                if (res.data.role) {
                    sessionStorage.setItem("role", res.data.role);
                }
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                return axiosInstance(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem("refreshToken");
                sessionStorage.removeItem("accessToken");
                sessionStorage.removeItem("role");
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;