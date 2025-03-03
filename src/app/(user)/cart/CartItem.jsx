"use client ";
import { useAddToCart, useDecrementFromCart } from "@/hooks/useCart";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/numberFormatter";
import toast from "react-hot-toast";
import { HiMinus, HiOutlineTrash, HiPlus } from "react-icons/hi";

function CartItem({ cartItem }) {
  const { decrementFromCart } = useDecrementFromCart();
  const { addToCart } = useAddToCart();

  const removeFromCartHandler = async () => {
    try {
      const { message } = await decrementFromCart(cartItem._id);
      toast.success(message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const addToCartHandler = async () => {
    try {
      const { message } = await addToCart(cartItem._id);
      toast.success(message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="border rounded-xl p-4 flex justify-between">
      <span className="flex-1 font-bold">{cartItem.title}</span>
      <div className="flex items-center justify-between gap-x-8 flex-1">
        <div>
          <div>
            قیمت :{" "}
            <span
              className={`${
                cartItem.discount ? "line-through text-gray-500" : "font-bold"
              }`}
            >
              {toPersianNumbersWithComma(cartItem.price)}
            </span>
          </div>
          {!!cartItem.discount && (
            <div className="flex items-center gap-x-2 mt-2">
              <p className="font-bold">
                {toPersianNumbersWithComma(cartItem.offPrice)}
              </p>
              <div className="bg-rose-500 px-2 py-0.5 rounded-xl text-white text-sm">
                {toPersianNumbers(cartItem.discount)} %
              </div>
            </div>
          )}
        </div>

        <div className="border-l-2">&nbsp;</div>
        <span>تعداد : {toPersianNumbers(cartItem.quantity)}</span>
        <div className="flex gap-x-3">
          <button
            onClick={addToCartHandler}
            className="bg-primary-900 text-white rounded p-1"
          >
            <HiPlus className="w-4 h-4" />
          </button>
          {/* <button>
            <HiOutlineTrash className="text-rose-500 w-6 h-6" />
          </button> */}
          <button
            onClick={removeFromCartHandler}
            className="border rounded p-1"
          >
            {cartItem.quantity > 1 ? (
              <HiMinus className="w-4 h-4" />
            ) : (
              <HiOutlineTrash className="text-rose-500 w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
