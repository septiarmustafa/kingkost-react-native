import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_HOST } from "./BaseUrl";

export const SetupInterceptors = (http) => {
  http.interceptors.request.use(
    (config) => {
      config.headers["token"] = `${AsyncStorage.getItem("token")}`;
      config.headers["content-type"] = "application/json";
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  http.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      const status = error?.response?.status || 0;
      const resBaseURL = error?.response?.config?.BASE_HOST;
      if (resBaseURL === BASE_HOST && status === 401) {
        if (AsyncStorage.getItem("token")) {
          AsyncStorage.clear();
          window.location.assign("/");
          return Promise.reject(error);
        } else {
          return Promise.reject(error);
        }
      }
      return Promise.reject(error);
    }
  );
};

export default SetupInterceptors;
