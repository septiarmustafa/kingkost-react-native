import axios from "axios";
import SetupInterceptors from "./SetupInterceptor";
import { BASE_HOST } from "./BaseUrl";

const http = axios.create({
  baseURL: BASE_HOST,
});

SetupInterceptors(http);

export default http;
