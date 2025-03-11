import { getAllPaymentsApi } from "@/services/paymentService";
import { useQuery } from "@tanstack/react-query";

export const useGetPayments = () =>
  useQuery({
    queryKey: ["payments"],
    queryFn: getAllPaymentsApi,
    retry: false,
  });
