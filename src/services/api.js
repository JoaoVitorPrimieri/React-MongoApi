import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "Content-type": "application/json",
        "x-auth-token": sessionStorage.getItem('token')
    },
});

export default api;