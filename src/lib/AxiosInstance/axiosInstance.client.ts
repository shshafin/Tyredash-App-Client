// axiosInstance.client.ts
import axios from "axios";
import { envConfig } from "@/src/config/envConfig";

export const axiosInstanceClient = axios.create({
  baseURL: envConfig.base_Api,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
