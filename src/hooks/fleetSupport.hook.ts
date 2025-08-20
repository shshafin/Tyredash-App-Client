import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { assignFleetRef, getAllSupportRequests } from "../services/fleet-support";

export const useAssignFleetRef = ({ onSuccess }: any = {}) => {
  return useMutation<any, Error, { id: string; payload: any }>({
    mutationKey: ["ASSIGN_FLEET_REF"],
    // accept { id, payload } at mutate-time to avoid recreating the hook
    mutationFn: async ({ id, payload }) => await assignFleetRef(payload, id),
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
