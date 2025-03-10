"use client";

import Loading from "@/common/Loading";
import CategoryForm, { categoryTypes } from "@/components/CategoryForm";
import { useGetCategoryById, useUpdateCategory } from "@/hooks/useCategories";
import { includeObject } from "@/utils/objectUtils";
import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const includesCategoryKey = ["title", "description", "englishTitle"];

function page() {
  const router = useRouter();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data, isLoading } = useGetCategoryById(id);
  const { category } = data || {};
  const { isPending, mutateAsync: updateCategory } = useUpdateCategory();

  const [formData, setFormData] = useState({});
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    if (category) {
      setFormData(includeObject(category, includesCategoryKey));
      setSelectedType(categoryTypes.find((c) => c.value === category.type));
    }
  }, [data]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { message } = await updateCategory({
        id: category._id,
        data: { ...formData, type: selectedType.value },
      });
      queryClient.invalidateQueries({ queryKey: ["get-categories"] });
      router.push("/admin/categories");
      toast.success(message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div>
      <h1 className="mt-5 mb-10 font-bold text-xl">ویرایش دسته بندی</h1>
      <CategoryForm
        isLoading={isPending}
        category={formData}
        categoryOnChange={handleChange}
        selectedType={categoryTypes.find((c) => c.value === category.type)}
        setSelectedType={setSelectedType}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default page;
