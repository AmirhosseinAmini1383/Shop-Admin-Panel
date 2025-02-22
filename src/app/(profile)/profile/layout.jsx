import vazirFont from "@/constants/localFonts";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

export const metadata = {
  title: "پروفایل کاربر",
  description: "صفحه پروفایل کاربر",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazirFont.variable} font-sans`}>
        <ReactQueryProvider>
          <Toaster />
          <div className="container xl:max-w-screen-xl">{children}</div>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
