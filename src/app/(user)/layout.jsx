import vazirFont from "@/constants/localFonts";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import Header from "@/components/Header";

export const metadata = {
  title: "صفحه اصلی",
  description: "صفحه اصلی پروژه پنل ادمین و پروفایل",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazirFont.variable} font-sans`}>
        <ReactQueryProvider>
          <Toaster />
          <Header />
          <div className="container xl:max-w-screen-xl">{children}</div>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
