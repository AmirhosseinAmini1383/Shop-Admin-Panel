import { toPersianNumbersWithComma } from "@/utils/numberFormatter";
import toLocalDateShort from "@/utils/toLocalDateShort";
import Link from "next/link";
import AddToCart from "./[productSlug]/AddToCart";
import LikeProduct from "./LikeProduct";

async function ProductsList({ products }) {
  //   const { products } = await promise;

  return (
    <div className="col-span-3">
      <div className="grid grid-cols-3 gap-y-4 gap-x-6">
        {products.map((product) => {
          return (
            <div
              className="col-span-1 border rounded-xl shadow-md p-4"
              key={product._id}
            >
              <p className="font-bold text-xl mb-4">{product.title}</p>
              <div className="mb-4">
                <span>تاریخ : </span>
                <span className="font-medium">
                  {toLocalDateShort(product.createdAt)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p>
                  <span>{toPersianNumbersWithComma(product.offPrice)}</span>
                  <span> تومان</span>
                </p>
                <p>
                  <span>{product.category.title}</span>
                </p>
              </div>
              <div className="flex flex-col gap-y-6 mt-6">
                <div className="flex items-center justify-between">
                  <Link
                    className="text-primary-900 font-bold"
                    href={`products/${product.slug}`}
                  >
                    مشاهده محصول
                  </Link>
                  <LikeProduct product={product} />
                </div>
                <AddToCart product={product} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductsList;
