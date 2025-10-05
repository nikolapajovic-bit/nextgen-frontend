import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080"
});

instance.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    if(token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

instance.interceptors.response.use(response => {
    const newToken = response.headers['authorization'] || response.headers['Authorization'];
    if(newToken && newToken.startsWith("Bearer ")) {
        const token = newToken.substring(7);
        localStorage.setItem("token", token);
    }
    return response;
}, error => {
        return Promise.reject(error);
    }
)

export default instance;
