import ConfirmDelete from "@/common/ConfirmDelete";
import Modal from "@/common/Modal";
import { couponListTableTHeads } from "@/constants/tableHeads";
import { useRemoveCoupon } from "@/hooks/useCoupons";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/numberFormatter";
import toLocalDateShort from "@/utils/toLocalDateShort";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineEye, HiOutlineTrash } from "react-icons/hi";
import { RiEdit2Line } from "react-icons/ri";

function CouponListTable({ coupons }) {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const queryClient = useQueryClient();
  const { mutateAsync: removeCoupon, isPending } = useRemoveCoupon();

  const removeCouponHandler = async (id) => {
    try {
      const { message } = await removeCoupon(id);
      queryClient.invalidateQueries({ queryKey: ["get-coupons"] });
      toast.success(message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleDeleteClick = (coupon) => {
    setSelectedProduct(coupon);
    setOpen(true);
  };

  return (
    <>
      {coupons.length > 0 ? (
        <div className="shadow-sm overflow-auto my-8">
          <table className="border-collapse table-auto w-full min-w-[800px] text-sm">
            <thead>
              <tr>
                {couponListTableTHeads.map((item) => {
                  return (
                    <th className="whitespace-nowrap table__th" key={item.id}>
                      {item.label}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon, index) => {
                return (
                  <tr key={coupon._id}>
                    <td className="table__td">{index + 1}</td>
                    <td className="table__td  whitespace-nowrap font-bold">
                      {coupon.code}
                    </td>
                    <td className="table__td">
                      <span className="badge badge--primary">
                        {coupon.type}
                      </span>
                    </td>
                    <td className="table__td">
                      {toPersianNumbersWithComma(coupon.amount)}
                    </td>
                    <td className="table__td">
                      <div className="space-y-2 flex flex-col items-start">
                        {coupon.productIds.map((p) => {
                          return (
                            <span
                              key={p._id}
                              className="badge badge--secondary"
                            >
                              {p.title}
                            </span>
                          );
                        })}
                      </div>
                    </td>
                    <td className="table__td">
                      {toPersianNumbers(coupon.usageCount)}
                    </td>
                    <td className="table__td">
                      {toPersianNumbers(coupon.usageLimit)}
                    </td>
                    <td className="table__td">
                      {toLocalDateShort(coupon.expireDate)}
                    </td>
                    <td className="table__td">
                      <div className="flex items-center gap-x-4">
                        <Link href={`/admin/coupons/${coupon._id}`}>
                          <HiOutlineEye className="text-primary-900 w-5 h-5" />
                        </Link>
                        <button onClick={() => handleDeleteClick(coupon)}>
                          <HiOutlineTrash className="text-error w-5 h-5" />
                        </button>
                        <Modal
                          title="حذف کد تخفیف"
                          open={open}
                          onClose={() => setOpen(false)}
                        >
                          {selectedProduct && (
                            <ConfirmDelete
                              resourceName={selectedProduct.code}
                              onConfirm={() => {
                                removeCouponHandler(selectedProduct._id);
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
                        <Link href={`/admin/coupons/edit/${coupon._id}`}>
                          <RiEdit2Line className="w-5 h-5  text-secondary-700" />
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
        <p className="mt-8 text-secondary-500">کد تخفیفی وجود ندارد !</p>
      )}
    </>
  );
}
export default CouponListTable;
