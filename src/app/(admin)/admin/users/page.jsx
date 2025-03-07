"use client";
import Loading from "@/common/Loading";
import { useGetAllUsers } from "@/hooks/useAuth";
import UsersTable from "./UsersTable";

function UsersPage() {
  const { users, isLoading } = useGetAllUsers();
  if (isLoading) return <Loading />;

  return (
    <div>
      <h1 className="mt-5 mb-10 font-bold text-xl">اطلاعات کاربران</h1>
      <UsersTable users={users} />
    </div>
  );
}

export default UsersPage;
