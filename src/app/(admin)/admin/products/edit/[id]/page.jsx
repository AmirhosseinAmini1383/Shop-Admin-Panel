"use client";
import Loading from "@/common/Loading";
import ProductForm from "@/components/ProductForm";
import { useGetCategories } from "@/hooks/useCategories";
import { useGetProductById, useUpdateProduct } from "@/hooks/useProducts";
import { includeObject } from "@/utils/objectUtils";
import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const includesProductKey = [
  "title",
  "description",
  "slug",
  "brand",
  "price",
  "discount",
  "offPrice",
  "countInStock",
  "imageLink",
];

function page() {
  const { id } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: productData, isLoading } = useGetProductById(id);
  const { product } = productData || {};
  const { data: categoryData } = useGetCategories();
  const { categories } = categoryData || {};
  const { isPending, mutateAsync: updateProduct } = useUpdateProduct();
  const [formData, setFormData] = useState({});
  const [tags, setTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { message } = await updateProduct({
        productId: product._id,
        data: {
          ...formData,
          tags,
          category: selectedCategory._id,
        },
      });
      queryClient.invalidateQueries({ queryKey: ["get-product", product._id] });
      toast.success(message);
      router.push("/admin/products");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (product) {
      setFormData(includeObject(product, includesProductKey));
      setSelectedCategory(product.category);
      setTags(product.tags);
    }
  }, [productData]);

  if (isLoading) return <Loading />;
  return (
    <div className="mb-10">
      <h1 className="mt-5 mb-10 font-bold text-xl">ویرایش کردن محصول</h1>
      <ProductForm
        onSubmit={handleSubmit}
        categories={categories}
        setSelectedCategory={setSelectedCategory}
        selectedCategory={product.category}
        tags={tags}
        setTags={setTags}
        productData={formData}
        productDataOnChange={handleChange}
        isLoading={isPending}
      />
    </div>
  );
}

export default page;
