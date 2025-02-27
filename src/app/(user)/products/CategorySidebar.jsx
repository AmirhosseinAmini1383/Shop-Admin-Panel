"use client";
import CheckBox from "@/common/CheckBox";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

function CategorySidebar({ categories }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState(
    searchParams.get("category")?.split(",") || []
  );

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value.length > 0) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
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
    <div className="col-span-1">
      <p className="font-bold mb-4">دسته بندی</p>
      <ul className="space-y-4">
        {categories.map((category) => {
          return (
            <CheckBox
              key={category._id}
              id={category._id}
              value={category.englishTitle}
              name="product-category"
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

export default CategorySidebar;
