import Button from "@/common/Button";
import SpinnerMini from "@/common/SpinnerMini";
import TextField from "@/common/TextField";
import Select from "react-select";

export const categoryTypes = [
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

function CategoryForm({
  isLoading,
  category,
  categoryOnChange,
  onSubmit,
  setSelectedType,
  selectedType,
}) {
  return (
    <div className="max-w-sm mb-10">
      <form className="space-y-8" onSubmit={onSubmit}>
        <TextField
          name="title"
          label="عنوان"
          value={category.title || ""}
          onChange={categoryOnChange}
        />
        <TextField
          name="englishTitle"
          label="عنوان انگلیسی"
          value={category.englishTitle || ""}
          onChange={categoryOnChange}
        />
        <TextField
          name="description"
          label="توضیحات"
          value={category.description || ""}
          onChange={categoryOnChange}
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

export default CategoryForm;
