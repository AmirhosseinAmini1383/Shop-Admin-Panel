"use client";
import SvgLoaderComponent from "@/common/SvgLoaderComponent";
import { useGetUser } from "@/hooks/useAuth";
import toLocalDateShort from "@/utils/toLocalDateShort";

function Profile() {
  const { user, isLoading } = useGetUser();
  if (isLoading) return <SvgLoaderComponent />;
  return (
    <div>
      <h1>سلام! {user.name} خوش اومدی!</h1>
      <p>
        <span>تاریخ پیوستن:</span>
        <span>{toLocalDateShort(user.createdAt)}</span>
      </p>
    </div>
  );
}

export default Profile;
