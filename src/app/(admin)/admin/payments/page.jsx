"use client";
import Loading from "@/common/Loading";
import PaymentTable from "./PaymentTable";
import { useGetPayments } from "@/hooks/usePayments";

function page() {
  const { data, isLoading } = useGetPayments();
  const { payments } = data || {};
  if (isLoading) return <Loading />;
  return (
    <div>
      <h1 className="mt-5 mb-10 font-bold text-xl">سفارشات</h1>
      <PaymentTable payments={payments} />
    </div>
  );
}

export default page;
