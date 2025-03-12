import {
  addNewCouponApi,
  getAllCouponsApi,
  getOneCouponByIdApi,
  updateCouponApi,
} from "@/services/couponService";
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

export const useGetOneCouponById = (id) =>
  useQuery({
    queryKey: ["get-coupon", id],
    queryFn: () => getOneCouponByIdApi(id),
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useUpdateCoupon = () =>
  useMutation({ mutationFn: updateCouponApi });
