"use client";

import ConfirmDelete from "@/common/ConfirmDelete";
import Modal from "@/common/Modal";
import { productsListTHeads } from "@/constants/tableHeads";
import { useDeleteProduct } from "@/hooks/useProducts";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/numberFormatter";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineEye, HiOutlineTrash } from "react-icons/hi";
import { RiEdit2Line } from "react-icons/ri";

function ProductsListTable({ products }) {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const queryClient = useQueryClient();
  const { isPending, mutateAsync: deleteProduct } = useDeleteProduct();

  const removeProductHandler = async (id) => {
    try {
      const { message } = await deleteProduct(id);
      queryClient.invalidateQueries({ queryKey: ["get-products"] });
      toast.success(message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  return (
    <>
      {products.length > 0 ? (
        <div className="shadow-sm overflow-auto my-8">
          <table className="border-collapse table-auto w-full min-w[800px] text-sm">
            <thead>
              <tr>
                {productsListTHeads.map((item) => {
                  return (
                    <th className="whitespace-nowrap table__th" key={item.id}>
                      {item.label}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => {
                return (
                  <tr key={product._id}>
                    <td className="table__td">{toPersianNumbers(index + 1)}</td>
                    <td className="table__td whitespace-nowrap font-medium">
                      {product.title}
                    </td>
                    <td className="table__td">{product.category.title}</td>
                    <td className="table__td">
                      {toPersianNumbersWithComma(product.price)}
                    </td>
                    <td className="table__td">
                      % {toPersianNumbers(product.discount)}
                    </td>
                    <td className="table__td">
                      {toPersianNumbersWithComma(product.offPrice)}
                    </td>
                    <td className="table__td">
                      {toPersianNumbers(product.countInStock)}
                    </td>
                    <td className="table__td">
                      <div className="flex items-center gap-x-3">
                        <Link href={`/admin/products/${product._id}`}>
                          <HiOutlineEye className="w-5 h-5 text-primary-900" />
                        </Link>
                        <button onClick={() => handleDeleteClick(product)}>
                          <HiOutlineTrash className="w-5 h-5 text-error" />
                        </button>
                        <Modal
                          title="حذف محصول"
                          open={open}
                          onClose={() => setOpen(false)}
                        >
                          {selectedProduct && (
                            <ConfirmDelete
                              resourceName={selectedProduct.title}
                              onConfirm={() => {
                                removeProductHandler(selectedProduct._id);
                                setOpen(false);
                                setSelectedProduct(null);
                              }}
                              onClose={() => {
                                setOpen(false);
                                setSelectedProduct(null);
                              }}
                              disabled={isPending}
                            />
                          )}
                        </Modal>
                        <Link href={`/admin/products/edit/${product._id}`}>
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
        <p className="mt-8 text-secondary-500">محصولی وجود ندارد !</p>
      )}
    </>
  );
}

export default ProductsListTable;
