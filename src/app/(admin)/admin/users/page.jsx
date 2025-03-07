"use client";
import Loading from "@/common/Loading";
import { useGetAllUsers } from "@/hooks/useAuth";

function UsersPage() {
  const { users, isLoading } = useGetAllUsers();
  if (isLoading) return <Loading />;  

  return (
    <div>
      <h1 className="mt-5 mb-10 font-bold text-xl">اطلاعات کاربران</h1>
    </div>
  );
}

export default UsersPage;
