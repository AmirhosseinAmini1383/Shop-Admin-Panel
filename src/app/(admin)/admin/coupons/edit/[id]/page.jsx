"use client";

import Loading from "@/common/Loading";
import { useGetOneCouponById } from "@/hooks/useCoupons";
import { useParams } from "next/navigation";

function page() {
  const { id } = useParams();
  const { data, isLoading } = useGetOneCouponById(id);
  const { coupon } = data || {};

  if (isLoading) return <Loading />;

  return <div>page</div>;
}

export default page;
