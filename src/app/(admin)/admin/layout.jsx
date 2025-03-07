import vazirFont from "@/constants/localFonts";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import AdminSideBar from "./AdminSideBar";

export const metadata = {
  title: "پروفایل ادمین",
  description: "صفحه پروفایل ادمین",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazirFont.variable} font-sans`}>
        <ReactQueryProvider>
          <Toaster />
          <div className="grid grid-cols-4 bg-white h-screen">
            <div className="col-span-1 bg-gray-100 overflow-y-auto p-4">
              <AdminSideBar />
            </div>
            <div className="col-span-3 overflow-y-auto p-4">{children}</div>
          </div>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
