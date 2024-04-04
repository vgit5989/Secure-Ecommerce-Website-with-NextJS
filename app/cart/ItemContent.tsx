"use client";
import { CartProductType } from "../product/[productId]/ProductDetails";
import { formatPrice } from "../../utils/formatPrice";
import Link from "next/link";
import { truncateText } from "@/utils/truncateText";
import Image from "next/image";
import SetQuantity from "../components/products/SetQuantity";
import { useCart } from "@/hooks/Cart";

interface ItemContentProps {
  item: CartProductType;
}

const ItemContent: React.FC<ItemContentProps> = ({ item }) => {
  const { handleRemoveProduct, handleCartQtyIncrease, handleCartQtyDecrease } =
    useCart();
  return (
    <div className="grid grid-cols-4 text-xs md:text-sm gap-4 border-[1.5px] border-slate-200 py-2  px-8 items-center">
      <div className=" justify-self-start flex gap-2 md:gap-4">
        <Link href={`/product/${item.id}`}>
          <div className="relative w-[70px] aspect-square">
            <Image
              src={item.selectedImg.image}
              alt={item.name}
              fill
              className="object-contain"
            />
          </div>
        </Link>
        <div className="flex flex-col justify-between ">
          <Link href={`/product/${item.id}`}>
            {truncateText(item.name)}
            <div>{item.selectedImg.color}</div>
            <div className="e-[70px]">
              <button
                className="text-slate-500 underline"
                onClick={() => handleRemoveProduct(item)}
              >
                Remove
              </button>
            </div>
          </Link>
        </div>
      </div>
      <div className="justify-self-center">{formatPrice(item.price)}</div>
      <div className="justify-self-center">
        <SetQuantity
          cartCounter={true}
          cartProduct={item}
          handleQtyIncrease={() => {
            handleCartQtyIncrease(item);
          }}
          handleQtyDecrease={() => {
            handleCartQtyDecrease(item);
          }}
        />
      </div>
      <div className="justify-self-end font-semibold">
        {formatPrice(item.price * item.quantity)}
      </div>
    </div>
  );
};

export default ItemContent;
