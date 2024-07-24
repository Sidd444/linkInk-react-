import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000",
});

instance.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error.response?.data?.message || error.message);
  }
);

export default instance;
