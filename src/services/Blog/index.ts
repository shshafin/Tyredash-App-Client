"use server";

import { axiosInstance } from "@/src/lib/AxiosInstance";

export const createBlog = async (BlogData: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/blogs/create", BlogData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create Blog");
  }
};

export const updateBlog = async (id: string, BlogData: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(`/blogs/${id}`, BlogData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update Blog");
  }
};

export const deleteBlog = async (id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/blogs/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete Blog");
  }
};

export const getBlogs = async (params: any) => {
  try {
    const { data } = await axiosInstance.get("/blogs", {
      params,
    });

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getSingleBlog = async (blogId: any) => {
  try {
    const { data } = await axiosInstance.get(`/blogs/${blogId}`);

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
