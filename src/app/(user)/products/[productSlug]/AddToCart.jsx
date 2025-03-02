"use client";

import Button from "@/common/Button";
import SpinnerMini from "@/common/SpinnerMini";
import { useGetUser } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAddToCart } from "./useCart";

function AddToCart({ product }) {
  const router = useRouter();
  const { user } = useGetUser();
  const { addToCart, isPending } = useAddToCart();

  const addToCartProductHandler = async () => {
    if (!user) {
      toast("لطفا ابتدا لاگین کنید.", { icon: "ℹ️" });
      router.push("/auth");
      return;
    }
    try {
      const { message } = await addToCart(product._id);
      toast.success(message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div>
      {isPending ? (
        <Button className="btn btn--primary w-64">
          <SpinnerMini className="mx-auto" />
        </Button>
      ) : (
        <Button
          onClick={addToCartProductHandler}
          className="btn btn--primary w-64"
        >
          اضافه کردن به سبد خرید
        </Button>
      )}
    </div>
  );
}

export default AddToCart;
