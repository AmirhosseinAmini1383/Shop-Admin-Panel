"use client";

import Loading from "@/common/Loading";
import { useGetProducts } from "@/hooks/useProducts";
import ProductsListTable from "./ProductsListTable";
import Link from "next/link";

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
          className="bg-primary-900 text-center text-white px-10 py-3 rounded-xl"
        >
          افزودن محصول
        </Link>
      </div>
      <ProductsListTable products={products} />
    </div>
  );
}

export default page;
