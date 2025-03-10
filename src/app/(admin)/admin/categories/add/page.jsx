"use client";
import CategoryForm from "@/components/CategoryForm";
import { useAddCategory } from "@/hooks/useCategories";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

function page() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isPending, mutateAsync: AddNewCategory } = useAddCategory();

  const [category, setCategory] = useState({
    title: "",
    description: "",
    englishTitle: "",
  });
  const [selectedType, setSelectedType] = useState("");

  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { message } = await AddNewCategory({
        ...category,
        type: selectedType.value,
      });
      queryClient.invalidateQueries({ queryKey: ["get-categories"] });
      router.push("/admin/categories");
      toast.success(message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div>
      <h1 className="mt-5 mb-10 font-bold text-xl">افزودن دسته بندی جدید</h1>
      <CategoryForm
        isLoading={isPending}
        category={category}
        categoryOnChange={handleChange}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default page;
