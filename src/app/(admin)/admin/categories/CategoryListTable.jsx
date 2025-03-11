import ConfirmDelete from "@/common/ConfirmDelete";
import Modal from "@/common/Modal";
import { categoryListTHeads } from "@/constants/tableHeads";
import { useRemoveCategory } from "@/hooks/useCategories";
import { toPersianNumbers } from "@/utils/numberFormatter";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineEye, HiOutlineTrash } from "react-icons/hi";
import { RiEdit2Line } from "react-icons/ri";

function CategoryListTable({ categories }) {
  const pathName = usePathname();
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutateAsync: removeCategory, isPending } = useRemoveCategory();

  const removeCategoryHandler = async (id) => {
    try {
      const { message } = await removeCategory(id);
      queryClient.invalidateQueries({ queryKey: ["get-categories"] });
      toast.success(message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <>
      {categories.length > 0 ? (
        <div className="shadow-sm overflow-auto my-8">
          <table className="border-collapse table-auto w-full min-w[800px] text-sm">
            <thead>
              <tr>
                {categoryListTHeads.map((item) => {
                  return (
                    <th className="whitespace-nowrap table__th" key={item.id}>
                      {item.label}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => {
                return (
                  <tr key={category._id}>
                    <td className="table__td">{toPersianNumbers(index + 1)}</td>
                    <td className="table__td whitespace-nowrap font-medium">
                      {category.title}
                    </td>
                    <td className="table__td max-w-[500px] whitespace-normal">
                      {category.description}
                    </td>
                    <td className="table__td">{category.englishTitle}</td>
                    <td className="table__td">
                      <span className="badge badge--secondary">
                        {category.type}
                      </span>
                    </td>
                    <td className="table__td">
                      <div className="flex items-center gap-x-3">
                        <Link href={`${pathName}/${category._id}`}>
                          <HiOutlineEye className="w-5 h-5 text-primary-900" />
                        </Link>
                        <button onClick={() => setOpen(true)}>
                          <HiOutlineTrash className="w-5 h-5 text-error" />
                        </button>
                        <Modal
                          open={open}
                          onClose={() => setOpen(false)}
                          title="حذف دسته بندی"
                        >
                          <ConfirmDelete
                            onClose={() => setOpen(false)}
                            resourceName={category.title}
                            onConfirm={() =>
                              removeCategoryHandler(category._id)
                            }
                            disabled={isPending}
                          />
                        </Modal>
                        <Link href={`${pathName}/edit/${category._id}`}>
                          <RiEdit2Line className="w-5 h-5 text-secondary-700" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-8 text-secondary-500">دسته بندی وجود ندارد !</p>
      )}
    </>
  );
}

export default CategoryListTable;
