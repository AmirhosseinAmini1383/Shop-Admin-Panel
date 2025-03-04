"use client";
import { useGetUser } from "@/hooks/useAuth";
import toLocalDateShort from "@/utils/toLocalDateShort";
import PaymentTable from "./payments/PaymentTable";
import Link from "next/link";
import Loading from "@/common/Loading";

function Profile() {
  const { user, payments, isLoading } = useGetUser();
  if (isLoading) return <Loading />;
  return (
    <div>
      <h1 className="mb-2">
        سلام!{" "}
        {<span className="font-semibold text-secondary-800">{user.name}</span>}{" "}
        خوش اومدی!
      </h1>
      <p>
        <span>تاریخ پیوستن:</span>
        <span>{toLocalDateShort(user.createdAt)}</span>
      </p>
      <div className="border rounded-xl p-4 mt-8">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">آخرین سفارشات کاربر</h2>
          <Link href="/profile/payments" className="text-primary-900">
            مشاهده همه سفارشات
          </Link>
        </div>
        <PaymentTable
          payments={payments
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 3)}
        />
      </div>
    </div>
  );
}

export default Profile;
