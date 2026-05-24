import axios from "axios";

const api = axios.create({
  baseURL: "https://hospital-backend-to52.onrender.com",
});

export default api;