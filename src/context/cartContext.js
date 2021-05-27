import { createContext, useContext, useEffect, useRef, useState } from "react";
import { commerce } from "../lib/commerce";

const cartContext = createContext();

export const useCartContext = () => useContext(cartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ line_items: [] });

  useEffect(() => {
    const retrieveCart = async () => {
      try {
        const cart = await commerce.cart.retrieve();
        setCart(cart);
      } catch (error) {
        console.log("error: ", error);
      }
    };

    retrieveCart();
  }, []);

  return (
    <>
      <cartContext.Provider value={{ cart, setCart }}>
        {children}
      </cartContext.Provider>
    </>
  );
};
