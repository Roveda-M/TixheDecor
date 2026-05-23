import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
});

const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) return null;

    const res = await axios.post(
        "http://localhost:8080/api/auth/refresh",
        { refreshToken }
    );

    const newAccessToken = res.data.accessToken;
    const newRefreshToken = res.data.refreshToken;

    sessionStorage.setItem("accessToken", newAccessToken);

    if (newRefreshToken) {
        localStorage.setItem("refreshToken", newRefreshToken);
    }

    if (res.data.role) {
        sessionStorage.setItem("role", res.data.role);
    }

    return newAccessToken;
};

axiosInstance.interceptors.request.use(
    async (config) => {

        let token = sessionStorage.getItem("accessToken");

        if (!token) {
            token = await refreshAccessToken();
        }

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,

    async (error) => {

        const originalRequest = error.config;
        const status = error.response?.status;

        const needsAuth = status === 401 || status === 403;

        if (needsAuth && originalRequest && !originalRequest._retry) {

            originalRequest._retry = true;

            try {

                const newAccessToken = await refreshAccessToken();

                if (!newAccessToken) {

                    localStorage.removeItem("refreshToken");
                    sessionStorage.removeItem("accessToken");
                    sessionStorage.removeItem("role");

                    window.location.href = "/login";

                    return Promise.reject(error);
                }

                originalRequest.headers.Authorization =
                    `Bearer ${newAccessToken}`;

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