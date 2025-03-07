import classNames from "classnames";
import Link from "next/link";
import { HiOutlineHome, HiOutlineUsers } from "react-icons/hi";
import {
  MdOutlineCategory,
  MdOutlineSpaceDashboard,
  MdPayment,
} from "react-icons/md";
import { CgProductHunt } from "react-icons/cg";
import { RiCoupon5Line } from "react-icons/ri";
import { usePathname } from "next/navigation";

const sidebarNavs = [
  {
    id: 1,
    title: "صفحه اصلی",
    icon: <HiOutlineHome className="w-5 h-5" />,
    href: "/",
  },
  {
    id: 2,
    title: "داشبورد",
    icon: <MdOutlineSpaceDashboard className="w-5 h-5" />,
    href: "/admin",
  },
  {
    id: 3,
    title: "کاربران",
    icon: <HiOutlineUsers className="w-5 h-5" />,
    href: "/admin/users",
  },
  {
    id: 4,
    title: "محصولات",
    icon: <CgProductHunt className="w-5 h-5" />,
    href: "/admin/products",
  },
  {
    id: 5,
    title: "دسته بندی",
    icon: <MdOutlineCategory className="w-5 h-5" />,
    href: "/admin/categories",
  },
  {
    id: 6,
    title: "سفارشات",
    icon: <MdPayment className="w-5 h-5" />,
    href: "/admin/payments",
  },
  {
    id: 7,
    title: "کد تخفیف",
    icon: <RiCoupon5Line className="w-5 h-5" />,
    href: "/admin/coupons",
  },
];

function SideBarNavs() {
  const pathname = usePathname();

  return (
    <ul className="space-y-2">
      {sidebarNavs.map((nav) => {
        return (
          <li key={nav.id}>
            <Link
              href={nav.href}
              className={classNames(
                "flex items-center gap-x-2 rounded-2xl font-medium hover:text-primary-900 transition-all duration-200 text-secondary-700 py-3 px-4",
                {
                  "!font-bold !text-primary-900": pathname === nav.href,
                }
              )}
            >
              {nav.icon}
              {nav.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default SideBarNavs;
