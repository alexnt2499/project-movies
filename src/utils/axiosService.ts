import axios, { AxiosRequestConfig } from "axios";
import { base_url } from "./config";

// Add a request interceptor
axios.interceptors.request.use(
  function (config: AxiosRequestConfig<any>) {
    config.baseURL = base_url;

    return config;
  },
  function (error: any) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
};
