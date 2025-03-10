"use client";

import Loading from "@/common/Loading";
import { useGetProducts } from "@/hooks/useProducts";
import ProductsListTable from "./ProductsListTable";
import Link from "next/link";
import { HiPlusCircle } from "react-icons/hi";

function page() {
  const { data, isLoading } = useGetProducts();
  const { products } = data || {};

  if (isLoading) return <Loading />;

  return (
    <div>
      <div className="flex items-center justify-between mt-5 mb-10">
        <h1 className="font-bold text-xl">محصولات</h1>
        <Link
          href="/admin/products/add"
          className="bg-primary-900 text-center text-white px-6 py-3 rounded-xl flex items-center justify-between gap-x-2 font-bold"
        >
          <HiPlusCircle className="w-5 h-5 text-white" />
          <span>افزودن محصول</span>
        </Link>
      </div>
      <ProductsListTable products={products} />
    </div>
  );
}

export default page;
