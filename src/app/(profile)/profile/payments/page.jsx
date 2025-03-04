"use client";
import Loading from "@/common/Loading";
import { useGetUser } from "@/hooks/useAuth";
import PaymentTable from "./PaymentTable";

function page() {
  const { payments, isLoading } = useGetUser();
  if (isLoading) return <Loading />;

  return (
    <div>
      <h1 className="mt-5 mb-10 font-bold text-xl">سفارشات کاربر</h1>
      <PaymentTable payments={payments} />
    </div>
  );
}

export default page;
