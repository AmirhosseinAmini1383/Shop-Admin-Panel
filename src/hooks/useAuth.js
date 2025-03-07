import { getAllUsersApi, getUserProfileApi } from "@/services/authService";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["get-user-data"],
    queryFn: getUserProfileApi,
    retry: false,
    refetchOnWindowFocus: true,
  });
  const { user, cart, payments } = data || {};
  return { user, cart, payments, error, isLoading };
};

export const useGetAllUsers = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["get-users"],
    queryFn: getAllUsersApi,
    retry: false,
    refetchOnWindowFocus: true,
  });
  const { users } = data || {};
  return { users, isLoading };
};
