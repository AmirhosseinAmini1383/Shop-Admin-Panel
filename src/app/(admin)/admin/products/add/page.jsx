"use client";
import ProductForm from "@/components/ProductForm";
import { useGetCategories } from "@/hooks/useCategories";
import { useAddProduct } from "@/hooks/useProducts";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

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
    <div className="mb-10">
      <h1 className="mt-5 mb-10 font-bold text-xl">اضافه کردن محصول</h1>
      <ProductForm
        onSubmit={handleSubmit}
        categories={categories}
        setSelectedCategory={setSelectedCategory}
        tags={tags}
        setTags={setTags}
        productData={formData}
        productDataOnChange={handleChange}
        isLoading={isPending}
      />
    </div>
  );
}

export default addProductPage;
