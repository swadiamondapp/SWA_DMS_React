import axios from "axios";

//const BASE_URL = "https://livedmsapi.swa.co/dms/";
const BASE_URL = "https://dmstestapi.zinfog.in/dms/";

export const apiService = axios.create({
  baseURL: BASE_URL,
});

apiService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const checkApiStatus = (response) => {
  return (
    response && response.data && response.data?.results?.status_code === 200
  );
};
