"use client";

import Button from "@/app/components/Button";
import ProductImage from "@/app/components/products/ProductImage";
import SetQuantity from "@/app/components/products/SetQuantity";
import SetColor from "@/app/components/products/setColor";
import { useCart } from "@/hooks/Cart";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { MdCheckCircle } from "react-icons/md";

interface ProductDetailsProps {
  product: any;
}
export type SelectedImgType = {
  color: string;
  colorCode: string;
  image: string;
};

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImg: SelectedImgType;
  quantity: number;
  maxQuantity: number;
  price: number;
};

const Horizontal = () => {
  return <hr className="w-[30% my-2]" />;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { handleAddProductToCart, cartProducts } = useCart();
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: { ...product.images[0] },
    quantity: 1,
    maxQuantity: product.maxQuantity,
    price: product.price,
  });

  const router = useRouter();

  useEffect(() => {
    setIsProductInCart(false);
    if (cartProducts) {
      const existingIndex = cartProducts.findIndex(
        (item) => item.id === product.id
      );
      if (existingIndex > -1) {
        setIsProductInCart(true);
      }
    }
  }, [cartProducts, product.id]);

  const handleColorSelect = useCallback((value: SelectedImgType) => {
    setCartProduct((prev) => {
      return { ...prev, selectedImg: value };
    });
  }, []);

  const handleQtyIncrease = useCallback(() => {
    if (cartProduct.quantity === cartProduct.maxQuantity) {
      return;
    }
    setCartProduct((prev) => {
      return { ...prev, quantity: ++prev.quantity };
    });
  }, [cartProduct.quantity, cartProduct.maxQuantity]);
  const handleQtyDecrease = useCallback(() => {
    if (cartProduct.quantity <= 1) {
      return;
    }

    setCartProduct((prev) => {
      return { ...prev, quantity: --prev.quantity };
    });
  }, [cartProduct.quantity]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <ProductImage
        cartProduct={cartProduct}
        product={product}
        handleColorSelect={handleColorSelect}
      />
      <div className="flex flex-col gap-1 text-slate-500 text-sm">
        <h2 className="text-3xl text-medium text-slate-700">{product.name}</h2>

        <Horizontal />
        <div className="text-justify">{product.description}</div>
        <Horizontal />
        <div>
          <span className="font-semibold">CATEGORY:</span> {product.category}
        </div>
        <div>
          <span className="font-semibold">BRAND:</span> {product.brand}
        </div>
        <div className={product.inStock ? "text-teal-400" : "text-rose-400"}>
          {product.inStock ? "In Stock" : "Out of Stock"}
        </div>

        <Horizontal />
        {!product.inStock ? <></> : <></>}
        {product.inStock &&
          (isProductInCart ? (
            <>
              <p className="mb-2 text-slate-500 flex items-center gap-1">
                <MdCheckCircle size={20} className="text-teal-400" />
                <span>Product added to Cart</span>
              </p>
              <div className="max-w-[300px]">
                <Button
                  label="View Cart"
                  outline
                  onClick={() => {
                    router.push("/cart");
                  }}
                />
              </div>
            </>
          ) : (
            <>
              <SetColor
                cartProduct={cartProduct}
                images={product.images}
                handleColorSelect={handleColorSelect}
              />
              <Horizontal />
              <SetQuantity
                cartProduct={cartProduct}
                handleQtyIncrease={handleQtyIncrease}
                handleQtyDecrease={handleQtyDecrease}
              />
              <Horizontal />
              <div className="max-w-[300px]">
                <Button
                  label="Add to Cart"
                  onClick={() => handleAddProductToCart(cartProduct)}
                />
              </div>
            </>
          ))}
      </div>
    </div>
  );
};

export default ProductDetails;
