"use client";
import CheckBox from "@/common/CheckBox";
import useCreateQueryStringToUrl from "@/hooks/useCreateQueryStringToUrl";
import { useState } from "react";

function ProductsFilter({ categories }) {
  const { pathname, router, searchParams, createQueryString } =
    useCreateQueryStringToUrl();
  const [selectedCategories, setSelectedCategories] = useState(
    searchParams.get("category")?.split(",") || []
  );

  const categoryHandler = (e) => {
    const value = e.target.value;
    let categories = [];
    if (selectedCategories.includes(value)) {
      categories = selectedCategories.filter((c) => c !== value);
    } else {
      categories = [...selectedCategories, value];
    }
    setSelectedCategories(categories);
    router.push(`${pathname}?${createQueryString("category", categories)}`);
  };

  return (
    <div>
      <p className="font-bold mb-4">دسته بندی</p>
      <ul className="space-y-2">
        {categories.map((category) => {
          return (
            <CheckBox
              key={category._id}
              id={category._id}
              value={category.englishTitle}
              name={`product-category-${category._id}`}
              label={category.title}
              onChange={categoryHandler}
              checked={selectedCategories.includes(category.englishTitle)}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ProductsFilter;
