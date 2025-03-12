"use client";
import Button from "@/common/Button";
import Loading from "@/common/Loading";
import RadioInput from "@/common/RadioInput";
import SpinnerMini from "@/common/SpinnerMini";
import TextField from "@/common/TextField";
import { useGetProducts } from "@/hooks/useProducts";
import { useState } from "react";
import DatePicker from "react-multi-date-picker";
import Select from "react-select";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useAddNewCoupon } from "@/hooks/useCoupons";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

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

  const handleChange = (e) => {
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
      <div className="max-w-sm">
        <form className="space-y-8" onSubmit={handleSubmit}>
          <TextField
            label="کد"
            name="code"
            value={formData.code}
            onChange={handleChange}
          />
          <TextField
            label="مقدار"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
          />
          <TextField
            label="ظرفیت"
            name="usageLimit"
            value={formData.usageLimit}
            onChange={handleChange}
          />
          <div>
            <span className="block mb-2">نوع کد تخفیف</span>
            <div className="flex items-center justify-between">
              <RadioInput
                checked={type === "percent"}
                id="percent-type"
                name="type"
                label="درصد"
                value="percent"
                onChange={(e) => setType(e.target.value)}
              />
              <RadioInput
                checked={type === "fixedProduct"}
                id="fixedProduct-type"
                name="type"
                label="قیمت ثابت"
                value="fixedProduct"
                onChange={(e) => setType(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="products" className="block mb-2">
              شامل محصولات
            </label>
            <Select
              isMulti
              instanceId="products"
              options={products}
              onChange={setProductIds}
              getOptionLabel={(option) => option.title}
              getOptionValue={(option) => option._id}
            />
          </div>
          <div>
            <span className="block mb-2">تاریخ انقضا</span>
            <DatePicker
              value={expireDate}
              onChange={(date) => setExpireDate(date)}
              format="YYYY/MM/DD"
              calendar={persian}
              locale={persian_fa}
              calendarPosition="left-left"
              inputClass="textField textField__valid"
              containerStyle={{
                width: "100%",
              }}
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
