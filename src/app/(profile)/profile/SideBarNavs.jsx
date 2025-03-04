import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiOutlineHome } from "react-icons/hi";
import { MdOutlineSpaceDashboard, MdPayment } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

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
    href: "/profile",
  },
  {
    id: 3,
    title: "اطلاعات کاربری",
    icon: <CgProfile className="w-5 h-5" />,
    href: "/profile/me",
  },
  {
    id: 4,
    title: "سفارشات",
    icon: <MdPayment className="w-5 h-5" />,
    href: "/profile/payments",
  },
];
function SideBarNavs() {
  const router = useRouter();
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
                  "!bg-primary-100/40 !font-bold !text-primary-900":
                    router.pathname === nav.href,
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
