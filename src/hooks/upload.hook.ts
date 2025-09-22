import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { uploadImages } from "../services/Upload";

export const useUploadImages = ({ onSuccess }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["UPLOAD_IMAGES"],
    mutationFn: async (imageData) => await uploadImages(imageData),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};
