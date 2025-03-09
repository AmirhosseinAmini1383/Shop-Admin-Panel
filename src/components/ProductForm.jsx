import Button from "@/common/Button";
import SpinnerMini from "@/common/SpinnerMini";
import TextField from "@/common/TextField";
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

function ProductForm({
  onSubmit,
  tags,
  setTags,
  productData,
  productDataOnChange,
  categories,
  selectedCategory = "",
  setSelectedCategory,
  isLoading,
}) {
  return (
    <div className="max-w-sm">
      <form className="space-y-8" onSubmit={onSubmit}>
        {productsFormData.map((item) => {
          return (
            <TextField
              key={item.id}
              label={item.label}
              name={item.name}
              value={productData[item.name] ?? ""}
              onChange={productDataOnChange}
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
            defaultValue={selectedCategory}
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

export default ProductForm;
