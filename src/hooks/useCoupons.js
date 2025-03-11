import { getAllCouponsApi } from "@/services/couponService";
import { useQuery } from "@tanstack/react-query";

export const useGetCoupons = () =>
    useQuery({
      queryKey: ["get-coupons"],
      queryFn: getAllCouponsApi,
      retry: false,
      refetchOnWindowFocus: true,
    });
  