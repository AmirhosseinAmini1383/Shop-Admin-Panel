import { getCategoriesApi } from "@/services/categoryService";
import { getProductsApi } from "@/services/productService";
import Link from "next/link";

async function Products() {
  const { products } = await getProductsApi();
  const { categories } = await getCategoriesApi();
  console.log({ products });
  console.log({ categories });

  return (
    <div>
      <h1 className="mt-5 mb-10 font-bold text-xl">صفحه محصولات</h1>
      <div className="grid grid-cols-4">
        {categories.map((category) => {
          return (
            <div key={category._id}>
              <Link href={``}>{category.title}</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Products;
