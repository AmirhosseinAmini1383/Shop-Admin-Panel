"use client";
import Loading from "@/common/Loading";
import { useGetProductById } from "@/hooks/useProducts";
import { toPersianNumbers } from "@/utils/numberFormatter";
import { useParams } from "next/navigation"; 

function page() {
  const { id } = useParams();
  // fetch based on Product Id to get product detail
  const { data, isLoading } = useGetProductById(id);
  const { product } = data || {};

  if (isLoading) return <Loading />;

  return (
    <div>
      <h1 className="mt-5 mb-4 font-bold text-xl">{product.title}</h1>
      <p className="mb-2">{product.description}</p>
      <p className="mb-2">
        برند :{" "}
        <span className="px-2 rounded-md badge--secondary">
          {product.brand}
        </span>
      </p>
      <p className="mb-2">دسته بندی : {product.category.title}</p>
      <p className="mb-2">
        موجودی در انبار : {toPersianNumbers(product.countInStock)}
      </p>
      <div className="flex items-center gap-x-2">
        {product.tags.map((tag) => {
          return (
            <span key={tag} className="badge badge--secondary">
              {tag}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default page;
