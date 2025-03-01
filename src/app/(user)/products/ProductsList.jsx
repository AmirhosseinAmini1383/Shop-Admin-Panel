import Button from "@/common/Button";
import { toPersianNumbersWithComma } from "@/utils/numberFormatter";
import toLocalDateShort from "@/utils/toLocalDateShort";
import Link from "next/link";

async function ProductsList({ products }) {
  //   const { products } = await promise;

  return (
    <div className="col-span-3 grid grid-cols-3 gap-y-4 gap-x-6">
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
            <Button variant="primary" className="w-full mt-6">
              <Link
                className="text-secondary-100 font-bold"
                href={`products/${product.slug}`}
              >
                مشاهده محصول
              </Link>
            </Button>
          </div>
        );
      })}
    </div>
  );
}

export default ProductsList;
