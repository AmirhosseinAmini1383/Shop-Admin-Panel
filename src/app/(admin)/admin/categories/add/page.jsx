"use client";
import Button from "@/common/Button";
import SpinnerMini from "@/common/SpinnerMini";
import TextField from "@/common/TextField";
import { useAddCategory } from "@/hooks/useCategories";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Select from "react-select";

const categoryTypes = [
  {
    id: 1,
    label: "محصول",
    value: "product",
  },
  {
    id: 2,
    label: "پست",
    value: "post",
  },
  {
    id: 3,
    label: "تیکت",
    value: "ticket",
  },
  {
    id: 4,
    label: "نظرات",
    value: "comment",
  },
];

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
      <div className="max-w-sm mb-10">
        <form className="space-y-8" onSubmit={handleSubmit}>
          <TextField
            name="title"
            label="عنوان"
            value={category.title}
            onChange={handleChange}
          />
          <TextField
            name="englishTitle"
            label="عنوان انگلیسی"
            value={category.englishTitle}
            onChange={handleChange}
          />
          <TextField
            name="description"
            label="توضیحات"
            value={category.description}
            onChange={handleChange}
          />
          <div>
            <label htmlFor="category" className="block mb-2">
              دسته بندی
            </label>
            <Select
              instanceId="category"
              options={categoryTypes}
              onChange={setSelectedType}
              defaultValue={selectedType}
            />
          </div>
          <div>
            {isPending ? (
              <Button className="w-full" type="submit">
                <SpinnerMini className="mx-auto" />
              </Button>
            ) : (
              <Button className="w-full" type="submit">
                تایید
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default page;
