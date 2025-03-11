"use client";
import Link from "next/link";
import { HiPlusCircle } from "react-icons/hi";
import CouponListTable from "./CouponListTable";
import Loading from "@/common/Loading";
import { useGetCoupons } from "@/hooks/useCoupons";

function page() {
  const { data, isLoading } = useGetCoupons();
  const { coupons } = data || {};
  if (isLoading) return <Loading />;
  return (
    <div>
      <div className="flex items-center justify-between mt-5 mb-10">
        <h1 className="font-bold text-xl">کد های تخفیف</h1>
        <Link
          href="/admin/coupons/add"
          className="bg-primary-900 text-center text-white px-6 py-3 rounded-xl flex items-center justify-between gap-x-2 font-bold"
        >
          <HiPlusCircle className="w-5 h-5 text-white" />
          <span>اضافه کردن کد تخفیف</span>
        </Link>
      </div>
      <CouponListTable coupons={coupons} />
    </div>
  );
}

export default page;
