"use client";
import { useCart } from "@/hooks/Cart";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import Heading from "../components/products/Heading";
import Button from "@/app/components/Button";
import ItemContent from "./ItemContent";
import { formatPrice } from "@/utils/formatPrice";
import { SafeUser } from "@/types";
import { useRouter } from "next/navigation";

interface CartClientProps {
  currentUser: SafeUser | null;
}

const CartClient: React.FC<CartClientProps> = ({ currentUser }) => {
  const { cartProducts, handleClearCart, cartTotalAmt } = useCart();

  const router = useRouter();

  if (!cartProducts || cartProducts.length === 0)
    return (
      <div className="flex flex-col items-center">
        <div className="text-2xl">Your cart is Empty</div>
        <div>
          <Link
            href={"/"}
            className="
          text-sltate-500 flex items-center gap-1 mt-2
          "
          >
            <MdArrowBack />
            <span>Start Shopping</span>
          </Link>
        </div>
      </div>
    );

  return (
    <div>
      <Heading title="Cart" center />
      <div className="grid lg:grid-cols-4 justify-items-stretch">
        <div></div>
        <div className="col-span-2">
          <div className="grid grid-cols-4 text-s gap-4 pb-2 px-10 items-center mt-8">
            <div className="justify-self-start">Product</div>
            <div className="justify-self-center">Price</div>
            <div className="justify-self-center">Quanitity</div>
            <div className="justify-self-end">Total</div>
          </div>
          <div>
            {cartProducts &&
              cartProducts.map((item) => {
                return <ItemContent key={item.id} item={item} />;
              })}
          </div>
          <div className="border-t-[1.5px] border-slate-200 py-4 px-10 flex justify-between gap-4">
            <div>
              <div className="w-[90px]">
                <Button
                  label="Clear Cart"
                  onClick={() => {
                    handleClearCart();
                  }}
                  small
                  outline
                />
              </div>
            </div>
            <div className="text-sm flex flex-col gap-1 items-start">
              <div className="flex justify-between w-full text-base font-semibold">
                <span>Subtotal</span>
                <span>{formatPrice(cartTotalAmt)}</span>
              </div>
              <p className="text-slate-500">
                Taxes and Shipping calculated at checkout
              </p>
              <Button
                label={currentUser ? "Checkout" : "Login To Checkout"}
                outline={currentUser ? false : true}
                onClick={() => {
                  currentUser
                    ? router.push("/checkout")
                    : router.push("/login");
                }}
              />
              <Link
                href={"/"}
                className="
          text-sltate-500 flex items-center gap-1 mt-2
          "
              >
                <MdArrowBack />
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default CartClient;
