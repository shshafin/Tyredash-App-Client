import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { assignFleetRef, getAllSupportRequests } from "../services/fleet-support";

export const useAssignFleetRef = ({ onSuccess, id }: any) => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["ASSIGN_FLEET_REF"],
    mutationFn: async (formData) => await assignFleetRef(formData, id),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess,
  });
};

export const useGetAllSupportRequests = () => {
  return useQuery({
    queryKey: ["GET_ALL_SUPPORT_REQUESTS"],
    queryFn: async () => await getAllSupportRequests(),
  });
};
