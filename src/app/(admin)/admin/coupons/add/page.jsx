"use client";
import Button from "@/common/Button";
import Loading from "@/common/Loading";
import RadioInput from "@/common/RadioInput";
import SpinnerMini from "@/common/SpinnerMini";
import TextField from "@/common/TextField";
import { useGetProducts } from "@/hooks/useProducts";
import { useState } from "react";
import Select from "react-select";

function page() {
  const { data, isLoading } = useGetProducts();
  const { products } = data || {};

  const [formData, setFormData] = useState({
    code: "",
    amount: "",
    usageLimit: "",
  });
  const [type, setType] = useState("percent");
  const [productIds, setProductIds] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // if (isLoading) return <Loading />;

  return (
    <div>
      <h1 className="mt-5 mb-10 font-bold text-xl">اضافه کردن کد تخفیف</h1>
      <div className="max-w-sm">
        <form className="space-y-8">
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
            {isLoading ? (
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
