import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-hot-toast";

type CartContextType = {
  cartTotalQty: number;
  cartTotalAmt: number;
  cartProducts: CartProductType[] | null;
  handleAddProductToCart: (product: CartProductType) => void;
  handleRemoveProduct: (product: CartProductType) => void;
  handleCartQtyIncrease: (product: CartProductType) => void;
  handleCartQtyDecrease: (product: CartProductType) => void;
  handleClearCart: () => void;
  paymentIntent: string | null;
  handleSetPaymentIntent: (val: string | null) => void;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
  [propName: string]: any;
}

export const CartContextProvidor = (props: Props) => {
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cartTotalAmt, setCartTotalAmt] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(
    null
  );
  const [paymentIntent, setPaymentIntent] = useState<string | null>(null);

  useEffect(() => {
    const carItems: any = localStorage.getItem("cartItems");
    const cProducts: CartProductType[] | null = JSON.parse(carItems);
    const ePaymentIntent: any = localStorage.getItem("ePaymentIntent");
    const paymentIntent: string | null = JSON.parse(ePaymentIntent);

    setCartProducts(cProducts);
    setPaymentIntent(paymentIntent);
  }, []);

  useEffect(() => {
    const getTotals = () => {
      if (cartProducts) {
        const { total, qty } = cartProducts?.reduce(
          (acc, item) => {
            const itemTotal = item.price * item.quantity;
            acc.total += itemTotal;
            acc.qty += item.quantity;

            return acc;
          },
          {
            total: 0,
            qty: 0,
          }
        );
        setCartTotalQty(qty);
        setCartTotalAmt(total);
      }
    };
    getTotals();
  }, [cartProducts]);

  const handleAddProductToCart = useCallback((product: CartProductType) => {
    setCartProducts((prev) => {
      let updatedCart;

      if (prev) {
        updatedCart = [...prev, product];
      } else {
        updatedCart = [product];
      }

      toast.success("Product added to cart");
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));

      return updatedCart;
    });
  }, []);

  const handleRemoveProduct = useCallback(
    (product: CartProductType) => {
      if (cartProducts) {
        const updatedCart = cartProducts.filter(
          (item) => item.id !== product.id
        );
        setCartProducts(updatedCart);
        toast.success("Product removed");
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );

  const handleCartQtyIncrease = useCallback(
    (product: CartProductType) => {
      let updatedCart;
      if (product.quantity === product.maxQuantity) {
        return toast.error("You can't add more than max stock quantity");
      }
      if (cartProducts) {
        updatedCart = [...cartProducts];
        const existingIndex = cartProducts.findIndex(
          (item) => item.id === product.id
        );
        if (existingIndex > -1) {
          updatedCart[existingIndex].quantity += 1;
        }
        setCartProducts(updatedCart);
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );

  const handleCartQtyDecrease = useCallback(
    (product: CartProductType) => {
      let updatedCart;
      if (product.quantity === 1) {
        return toast.error("You can't buy negative items");
      }
      if (cartProducts) {
        updatedCart = [...cartProducts];
        const existingIndex = cartProducts.findIndex(
          (item) => item.id === product.id
        );
        if (existingIndex > -1) {
          updatedCart[existingIndex].quantity -= 1;
        }
        setCartProducts(updatedCart);
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );

  const handleClearCart = useCallback(() => {
    setCartProducts(null);
    setCartTotalQty(0);
    localStorage.setItem("cartItems", JSON.stringify(null));
  }, []);

  const handleSetPaymentIntent = useCallback((val: string | null) => {
    setPaymentIntent(val);
    localStorage.setItem("eShopPaymentIntent", JSON.stringify(val));
  }, []);

  const value = {
    cartTotalQty,
    cartTotalAmt,
    cartProducts,
    handleAddProductToCart,
    handleRemoveProduct,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
    handleClearCart,
    paymentIntent,
    handleSetPaymentIntent,
  };

  return <CartContext.Provider value={value} {...props} />;
};
export const useCart = () => {
  const context = useContext(CartContext);

  if (context === null) {
    throw new Error("useCart must be used within a CartContextProvider");
  }

  return context;
};
