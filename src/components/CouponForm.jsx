import Button from "@/common/Button";
import RadioInput from "@/common/RadioInput";
import TextField from "@/common/TextField";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import Select from "react-select";
import SpinnerMini from "@/common/SpinnerMini";

function CouponForm({
  formData,
  onChangeFormData,
  onSubmit,
  type,
  setType,
  options,
  onChangeSelect,
  expireDate,
  setExpireDate,
  isLoading,
  defaultValue = "",
}) {
  return (
    <div className="max-w-sm">
      <form className="space-y-8" onSubmit={onSubmit}>
        <TextField
          label="کد"
          name="code"
          value={formData.code || ""}
          onChange={onChangeFormData}
        />
        <TextField
          label="مقدار"
          name="amount"
          value={formData.amount || ""}
          onChange={onChangeFormData}
        />
        <TextField
          label="ظرفیت"
          name="usageLimit"
          value={formData.usageLimit || ""}
          onChange={onChangeFormData}
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
            options={options}
            onChange={onChangeSelect}
            getOptionLabel={(option) => option.title}
            getOptionValue={(option) => option._id}
            defaultValue={defaultValue}
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
  );
}

export default CouponForm;
