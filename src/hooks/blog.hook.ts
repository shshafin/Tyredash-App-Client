import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createBlog,
  deleteBlog,
  getBlogs,
  getSingleBlog,
  updateBlog,
} from "../services/Blog";

export const useCreateBlog = ({ onSuccess }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["CREATE_BLOG"],
    mutationFn: async (blogData) => await createBlog(blogData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useUpdateBlog = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["UPDATE_BLOG"],
    mutationFn: async (blogData) => await updateBlog(id, blogData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};
export const useGetSingleBlog = (id: string) => {
  return useQuery({
    queryKey: ["GET_SINGLE_BLOG", id],
    queryFn: async () => await getSingleBlog(id),
    enabled: !!id, // Only run query when id exists
  });
};

export const useDeleteBlog = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["DELETE_BLOG"],
    mutationFn: async () => await deleteBlog(id),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useGetBlogs = (params: any) => {
  return useQuery({
    queryKey: ["GET_BLOGS"],
    queryFn: async () => await getBlogs(params),
  });
};
