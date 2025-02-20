import { getUserProfileApi } from "@/services/authService";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["get-user-data"],
    queryFn: getUserProfileApi,
    retry: false,
    refetchOnWindowFocus: true,
  });
  const { user, cart } = data || {};
  return { user, cart, error, isLoading };
};
