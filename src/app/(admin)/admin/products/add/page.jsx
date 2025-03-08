"use client";
import Button from "@/common/Button";
import SpinnerMini from "@/common/SpinnerMini";
import TextField from "@/common/TextField";
import { useGetCategories } from "@/hooks/useCategories";
import { useAddProduct } from "@/hooks/useProducts";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Select from "react-select";
import { TagsInput } from "react-tag-input-component";

const productsFormData = [
  {
    id: 1,
    label: "عنوان",
    name: "title",
  },
  {
    id: 2,
    label: "توضیحات",
    name: "description",
  },
  {
    id: 3,
    label: "اسلاگ",
    name: "slug",
  },
  {
    id: 4,
    label: "برند",
    name: "brand",
  },
  {
    id: 5,
    label: "قیمت",
    name: "price",
  },
  {
    id: 6,
    label: "تخفیف",
    name: "discount",
  },
  {
    id: 7,
    label: "قیمت روی تخفیف",
    name: "offPrice",
  },
  {
    id: 8,
    label: "موجودی",
    name: "countInStock",
  },
  {
    id: 9,
    label: "لینک عکس محصول",
    name: "imageLink",
  },
];

function addProductPage() {
  const router = useRouter();
  
  const { data } = useGetCategories();
  const { categories } = data || {};
  const { isPending, mutateAsync: addProduct } = useAddProduct();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    slug: "",
    brand: "",
    price: "",
    discount: "",
    offPrice: "",
    countInStock: "",
    imageLink: "",
  });
  const [tags, setTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { message } = await addProduct({
        ...formData,
        tags,
        category: selectedCategory._id,
      });
      toast.success(message);
      router.push("/admin/products");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="w-full max-w-sm mb-10">
      <h1 className="mt-5 mb-10 font-bold text-xl">اضافه کردن محصول</h1>
      <form className="space-y-8" onSubmit={handleSubmit}>
        {productsFormData.map((item) => {
          return (
            <TextField
              key={item.id}
              label={item.label}
              name={item.name}
              value={formData[item.name]}
              onChange={handleChange}
            />
          );
        })}
        <div>
          <label htmlFor="tags" className="block mb-2">
            تگ محصولات
          </label>
          <TagsInput
            id="tags"
            value={tags}
            onChange={setTags}
            name="tags"
            placeHolder="تگ"
          />
        </div>
        <div>
          <label htmlFor="category" className="block mb-2">
            دسته بندی
          </label>
          <Select
            instanceId="category"
            onChange={setSelectedCategory}
            options={categories}
            getOptionLabel={(option) => option.title}
            getOptionValue={(option) => option._id}
          />
        </div>
        <div>
          {isPending ? (
            <Button className="w-full" type="submit">
              <SpinnerMini className="mx-auto" />
            </Button>
          ) : (
            <Button className="w-full" type="submit">
              اضافه کردن محصول
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

export default addProductPage;
