"use client";
import { logoutApi } from "@/services/authService";
import SideBarNavs from "./SideBarNavs";
import { BiLogOut } from "react-icons/bi";

function AdminSideBar() {
  const logoutHandler = async () => {
    await logoutApi();
    // localStorage.removeItem("userInfo");
    // localStorage.removeItem("cartItems");
    // localStorage.removeItem("token");
    document.location.href = "/";
  };

  return (
    <div>
      <SideBarNavs />
      <div
        onClick={logoutHandler}
        className="flex items-center gap-x-2 rounded-2xl font-medium transition-all duration-200 text-secondary-700 py-3 px-4 hover:text-red-400 cursor-pointer"
      >
        <BiLogOut className="ml-4 h-5 w-5" />
        <span>خروج</span>
      </div>
    </div>
  );
}

export default AdminSideBar;
