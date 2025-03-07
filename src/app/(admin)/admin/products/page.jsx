"use client";

import Loading from "@/common/Loading";
import { useGetProducts } from "@/hooks/useProducts";
import ProductsListTable from "./ProductsListTable";

function page() {
  const { data, isLoading } = useGetProducts();
  const { products } = data || {};

  if (isLoading) return <Loading />;

  return (
    <div>
      <h1 className="mt-5 mb-10 font-bold text-xl">محصولات</h1>
      <ProductsListTable products={products} />
    </div>
  );
}

export default page;
