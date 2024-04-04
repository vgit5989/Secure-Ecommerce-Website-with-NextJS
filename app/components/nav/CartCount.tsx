"use client";
import { useCart } from "@/hooks/Cart";
import { useRouter } from "next/navigation";
import { CiShoppingCart } from "react-icons/ci";

const CartCount = () => {
  const router = useRouter();
  const { cartTotalQty } = useCart();
  return (
    <div
      className="relative cursor-pointer"
      onClick={() => router.push("/cart")}
    >
      <div className="text-3xl">
        <CiShoppingCart size={24} />
      </div>
      <span
        className="
      absolute
      bottom-[35px]
      left-[10px]
      bg-slate-700
      text-white
      h-6
      w-6
      rounded-full
      flex
      flex-col
      items-center
      justify-center
      text-sm"
      >
        {cartTotalQty}
      </span>
      Cart
    </div>
  );
};

export default CartCount;
