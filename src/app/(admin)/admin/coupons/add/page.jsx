"use client";
import Loading from "@/common/Loading";
import { useGetProducts } from "@/hooks/useProducts";
import { useState } from "react";
import { useAddNewCoupon } from "@/hooks/useCoupons";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import CouponForm from "@/components/CouponForm";

function page() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data, isLoading } = useGetProducts();
  const { products } = data || {};
  const { mutateAsync: addNewCoupon, isPending } = useAddNewCoupon();

  const [formData, setFormData] = useState({
    code: "",
    amount: "",
    usageLimit: "",
  });
  const [type, setType] = useState("percent");
  const [productIds, setProductIds] = useState([]);
  const [expireDate, setExpireDate] = useState(new Date());

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { message } = await addNewCoupon({
        ...formData,
        type,
        expireDate: new Date(expireDate).toISOString(),
        productIds: productIds.map((p) => p._id),
      });
      queryClient.invalidateQueries({ queryKey: ["get-coupons"] });
      toast.success(message);
      router.push("/admin/coupons");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div>
      <h1 className="mt-5 mb-10 font-bold text-xl">اضافه کردن کد تخفیف</h1>
      <CouponForm
        formData={formData}
        onChangeFormData={handleFormChange}
        onSubmit={handleSubmit}
        options={products}
        onChangeSelect={setProductIds}
        isLoading={isPending}
        expireDate={expireDate}
        setExpireDate={setExpireDate}
        type={type}
        setType={setType}
      />
    </div>
  );
}

export default page;
