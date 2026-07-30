import axios from "axios";

const API = axios.create({
    // Vite forwards /api requests to FastAPI during local development.
    // Set VITE_API_URL to the deployed backend URL in production.
    baseURL: import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "/api" : "http://127.0.0.1:8000"),
});

// Send the saved JWT on every request to protected FastAPI routes.
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default API;
