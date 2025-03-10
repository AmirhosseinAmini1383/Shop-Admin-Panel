"use client";
import Loading from "@/common/Loading";
import { useGetCategories } from "@/hooks/useCategories";
import Link from "next/link";
import { HiPlusCircle } from "react-icons/hi";
import CategoryListTable from "./CategoryListTable";

function page() {
  const { data, isLoading } = useGetCategories();
  const { categories } = data || {};

  if (isLoading) return <Loading />;
  return (
    <div>
      <div className="flex items-center justify-between mt-5 mb-10">
        <h1 className="font-bold text-xl">دسته بندی</h1>
        <Link
          href="/admin/categories/add"
          className="bg-primary-900 text-center text-white px-6 py-3 rounded-xl flex items-center justify-between gap-x-2 font-bold"
        >
          <HiPlusCircle className="w-5 h-5 text-white" />
          <span>افزودن دسته بندی</span>
        </Link>
      </div>
      <CategoryListTable categories={categories} />
    </div>
  );
}

export default page;
