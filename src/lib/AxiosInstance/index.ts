"use server";

import { envConfig } from "@/src/config/envConfig";
import axios from "axios";
import { cookies } from "next/headers";

export const axiosInstance = axios.create({
  baseURL: envConfig.base_Api,
});

// Add a request interceptor to attach token
axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = (await cookies()).get("access_token")?.value;
    if (accessToken) {
      config.headers["Authorization"] = accessToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
