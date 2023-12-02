import axios from "axios";

const instance = axios.create({
  baseURL: "https://margin-29eb504b546e.herokuapp.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    console.log("axios request : ", config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (res) => {
    console.log("axios response : ", res);
    return res;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default instance;
