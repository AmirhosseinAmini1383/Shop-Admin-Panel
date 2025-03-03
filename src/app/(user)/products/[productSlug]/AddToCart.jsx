"use client";

import Button from "@/common/Button";
import SpinnerMini from "@/common/SpinnerMini";
import { useGetUser } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAddToCart } from "@/hooks/useCart";
import Link from "next/link";

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

  const isInCart = (user, product) => {
    if (!user) return false;
    return user.cart?.products.some((p) => p.productId === product._id);
  };

  return (
    <div>
      {isInCart(user, product) ? (
        <Link href="/cart">
          <button className="text-center text-primary-900 font-bold border border-primary-900 px-4 py-3 rounded-2xl w-full">
            ادامه فرایند خرید
          </button>
        </Link>
      ) : isPending ? (
        <Button className="btn btn--primary w-full">
          <SpinnerMini className="mx-auto" />
        </Button>
      ) : (
        <Button onClick={addToCartProductHandler} className="w-full">
          اضافه کردن به سبد خرید
        </Button>
      )}
    </div>
  );
}

export default AddToCart;
