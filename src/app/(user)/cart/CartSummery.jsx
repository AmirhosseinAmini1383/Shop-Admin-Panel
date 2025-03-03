import Button from "@/common/Button";
import SpinnerMini from "@/common/SpinnerMini";
import { createPaymentApi } from "@/services/paymentService";
import { toPersianNumbersWithComma } from "@/utils/numberFormatter";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function CartSummery({ payDetail }) {
  const { totalOffAmount, totalPrice, totalGrossPrice } = payDetail;
  const { isPending, mutateAsync: createPayment } = useMutation({
    mutationFn: createPaymentApi,
  });
  const queryClient = useQueryClient();

  const createPaymentHandler = async () => {
    try {
      const { message } = await createPayment();
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["get-user-data"] });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="border p-4 rounded-xl">
      <p className="mb-4 font-bold">اطلاعات پرداخت</p>
      <div className="mb-4 flex items-center justify-between">
        <span>جمع کل</span>
        <span>{toPersianNumbersWithComma(totalGrossPrice)}</span>
      </div>
      <div className="mb-4 flex items-center justify-between">
        <span>تخفیف</span>
        <span>{toPersianNumbersWithComma(totalOffAmount)} - </span>
      </div>
      <div className="mb-6 flex items-center justify-between font-bold">
        <span>مبلغ قابل پرداخت</span>
        <span>{toPersianNumbersWithComma(totalPrice)}</span>
      </div>
      {isPending ? (
        <Button className="w-full">
          <SpinnerMini className="mx-auto" />
        </Button>
      ) : (
        <Button className="w-full" onClick={createPaymentHandler}>
          ثبت سفارش
        </Button>
      )}
    </div>
  );
}

export default CartSummery;
