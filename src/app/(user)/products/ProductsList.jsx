import { toPersianNumbersWithComma } from "@/utils/numberFormatter";

async function ProductsList({ promise }) {
  const { products } = await promise;
  return (
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
  );
}

export default ProductsList;
