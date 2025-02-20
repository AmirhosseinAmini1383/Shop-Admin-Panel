"use client";
import { useGetUser } from "@/hooks/useAuth";
import { toPersianDigits } from "@/utils/numberFormatter";
import Link from "next/link";

function Header() {
  const { user, cart, isLoading } = useGetUser();

  return (
    <header
      className={`shadow-md mb-10 px-4 sticky top-0 transition-all duration-200 ${
        isLoading ? "blur-sm opacity-70" : "opacity-100 blur-0"
      }`}
    >
      <nav>
        <ul className="flex items-center justify-between py-2 container xl:max-w-screen-xl">
          <li>
            <Link className="block py-2" href="/">
              خانه
            </Link>
          </li>
          <li>
            <Link className="block py-2" href="/products">
              محصولات
            </Link>
          </li>
          <li>
            <Link className="block py-2" href="/cart">
              سبد خرید (
              {cart ? toPersianDigits(cart.payDetail.orderItems.length) : 0})
            </Link>
          </li>
          {user ? (
            <span>{user?.name}</span>
          ) : (
            <li>
              <Link className="block py-2" href="/auth">
                ورود
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
export default Header;
