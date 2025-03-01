import { getCategoriesApi } from "@/services/categoryService";
import { getProductsApi } from "@/services/productService";
import CategorySidebar from "./CategorySidebar";
import queryString from "query-string";
import { Suspense } from "react";
import SpinnerMini from "@/common/SpinnerMini";
import ProductsList from "./ProductsList";

// * eq to {cache : "no-store"} or SSR in pages Dir :)
export const dynamic = "force-dynamic";

async function Products({ searchParams }) {
  const query = queryString.stringify(await searchParams);
  // const { products } = await getProductsApi(query);
  // const { categories } = await getCategoriesApi();

  const categoryPromise = getCategoriesApi();
  const productsPromise = getProductsApi(query);

  const [{ products }, { categories }] = await Promise.all([
    productsPromise,
    categoryPromise,
  ]);

  // const { categories } = await categoryPromise;
  return (
    <div>
      <h1 className="mt-5 mb-10 font-bold text-xl">صفحه محصولات</h1>
      <div className="grid grid-cols-4">
        <CategorySidebar categories={categories} />
        <ProductsList products={products} />

        {/* <Suspense fallback={<SpinnerMini className="mx-auto" />}>
          <ProductsList promise={productsPromise} />
        </Suspense> */}
      </div>
    </div>
  );
}

export default Products;
