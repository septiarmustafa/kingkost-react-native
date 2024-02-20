// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { BASE_HOST } from "./BaseUrl";

// export const SetupInterceptors = (http) => {
//   http.interceptors.request.use(
//     async (config) => {
//       const token = await AsyncStorage.getItem("token");
//       console.log("token ", token);
//       if (token) {
//         config.headers["token"] = token;
//       }
//       config.headers["content-type"] = "application/json";
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );

//   http.interceptors.response.use(
//     function (response) {
//       return response;
//     },
//     async function (error) {
//       const status = error?.response?.status || 0;
//       const resBaseURL = error?.response?.config?.BASE_HOST;
//       if (resBaseURL === BASE_HOST && status === 401) {
//         const token = await AsyncStorage.getItem("token");
//         if (token) {
//           await AsyncStorage.clear();
//           window.location.assign("/");
//           return Promise.reject(error);
//         } else {
//           return Promise.reject(error);
//         }
//       }
//       return Promise.reject(error);
//     }
//   );
// };

// export default SetupInterceptors;
