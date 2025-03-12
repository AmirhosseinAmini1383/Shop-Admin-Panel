import { addNewCouponApi, getAllCouponsApi } from "@/services/couponService";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetCoupons = () =>
  useQuery({
    queryKey: ["get-coupons"],
    queryFn: getAllCouponsApi,
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useAddNewCoupon = () =>
  useMutation({ mutationFn: addNewCouponApi });
