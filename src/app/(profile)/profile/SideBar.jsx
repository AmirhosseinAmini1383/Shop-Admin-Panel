"use client";
import { logoutApi } from "@/services/authService";
import Link from "next/link";

function SideBar() {
  const logoutHandler = async () => {
    await logoutApi();
    // localStorage.removeItem("userInfo");
    // localStorage.removeItem("cartItems");
    // localStorage.removeItem("token");
    document.location.href = "/";
  };

  return (
    <div>
      <ul className="flex flex-col space-y-8">
        <li>
          <Link
            className="block transition-all duration-200 hover:text-primary-900"
            href="/"
          >
            صفحه اصلی
          </Link>
        </li>
        <li>
          <Link
            className="block transition-all duration-200 hover:text-primary-900"
            href="/profile"
          >
            داشبورد
          </Link>
        </li>
        <li>
          <Link
            className="block transition-all duration-200 hover:text-primary-900"
            href="/profile/me"
          >
            صفحه کاربری
          </Link>
        </li>
        <li>
          <button
            className="w-full text-right transition-all duration-200 hover:text-error"
            onClick={logoutHandler}
          >
            خروج از حساب کاربری
          </button>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
