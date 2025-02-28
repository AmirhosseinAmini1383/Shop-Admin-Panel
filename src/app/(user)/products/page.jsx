import { getCategoriesApi } from "@/services/categoryService";
import { getProductsApi } from "@/services/productService";
import { toPersianNumbersWithComma } from "@/utils/numberFormatter";
import CategorySidebar from "./CategorySidebar";
import queryString from "query-string";

async function Products({ searchParams }) {
  const query = queryString.stringify(await searchParams);
  const { products } = await getProductsApi(query);
  const { categories } = await getCategoriesApi();

  return (
    <div>
      <h1 className="mt-5 mb-10 font-bold text-xl">صفحه محصولات</h1>
      <div className="grid grid-cols-4">
        <CategorySidebar categories={categories} />
        <div className="col-span-3 grid grid-cols-3 gap-y-4 gap-x-6">
          {products.map((product) => {
            return (
              <div
                className="col-span-1 border rounded-xl shadow-md p-4 space-y-2"
                key={product._id}
              >
                <p className="font-bold">{product.title}</p>
                <p>
                  <span>قیمت:</span>
                  <span>{toPersianNumbersWithComma(product.offPrice)}</span>
                </p>
                <p>
                  <span>دسته بندی:</span>
                  <span>{product.category.title}</span>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Products;
