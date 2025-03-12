"use client";

import Loading from "@/common/Loading";
import CouponForm from "@/components/CouponForm";
import { useGetOneCouponById, useUpdateCoupon } from "@/hooks/useCoupons";
import { useGetProducts } from "@/hooks/useProducts";
import { includeObject } from "@/utils/objectUtils";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const includesCouponKey = ["code", "amount", "usageLimit"];

function page() {
  const router = useRouter();
  const { id } = useParams();
  const { data: couponData, isLoading } = useGetOneCouponById(id);
  const { coupon } = couponData || {};
  const { data: productsData } = useGetProducts();
  const { products } = productsData || {};
  const { mutateAsync: updateCoupon, isPending } = useUpdateCoupon();

  const [formData, setFormData] = useState({});
  const [type, setType] = useState("");
  const [productIds, setProductIds] = useState([]);
  const [expireDate, setExpireDate] = useState(null);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { message } = await updateCoupon({
        id: coupon._id,
        data: {
          ...formData,
          type,
          expireDate: new Date(expireDate).toISOString(),
          productIds: productIds.map((p) => p._id),
        },
      });
      toast.success(message);
      router.push("/admin/coupons");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (coupon) {
      setFormData(includeObject(coupon, includesCouponKey));
      setProductIds(coupon.productIds);
      setType(coupon.type);
      setExpireDate(new Date(coupon.expireDate));
    }
  }, [coupon]);

  if (isLoading) return <Loading />;

  return (
    <div>
      <h1 className="mt-5 mb-10 font-bold text-xl">ویرایش کد تخفیف</h1>
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
        defaultValue={coupon.productIds}
      />
    </div>
  );
}

export default page;
