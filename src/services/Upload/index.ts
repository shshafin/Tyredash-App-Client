"use server";

import { axiosInstance } from "@/src/lib/AxiosInstance";

export const uploadImages = async (imageData: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/upload/images", imageData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to upload images");
  }
};
