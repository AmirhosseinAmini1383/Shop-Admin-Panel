"use client";
import RadioInput from "@/common/RadioInput";
import useCreateQueryStringToUrl from "@/hooks/useCreateQueryStringToUrl";
import { useState } from "react";

const sortOptions = [
  {
    id: 1,
    value: "latest",
    label: "جدید ترین",
  },
  {
    id: 2,
    value: "earliest",
    label: "قدیمی ترین",
  },
  {
    id: 3,
    value: "popular",
    label: "محبوب ترین",
  },
];

function ProductsSort() {
  const { pathname, router, searchParams, createQueryString } =
    useCreateQueryStringToUrl();
  const [sort, setSort] = useState(searchParams.get("sort") || "");

  const sortHandler = (e) => {
    const value = e.target.value;
    setSort(value);
    router.push(pathname + "?" + createQueryString("sort", value));
  };

  return (
    <div>
      <p className="font-bold mb-4">مرتب سازی</p>
      <div className="space-y-2">
        {sortOptions.map((item) => {
          return (
            <RadioInput
              key={item.id}
              id={item.id}
              label={item.label}
              name="product-sort"
              value={item.value}
              checked={sort === item.value}
              onChange={sortHandler}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ProductsSort;
