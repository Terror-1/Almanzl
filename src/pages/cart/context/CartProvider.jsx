import { useState, useEffect, useContext, useCallback } from "react";
import axios from "@/lib/axios";
import { CartContext } from "./CartContext";
import { AuthContext } from "../../authentication/context/AuthContext";
import { toast } from "react-toastify";

export function CartProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        try {
          const localCart = JSON.parse(localStorage.getItem("cart")) || [];
          const { data } = await axios.get("/cart");
          const backendCart = data.cart || [];
          const mergedCart = mergeCarts(backendCart, localCart);
          await axios.post("/cart", { cart: mergedCart });
          localStorage.removeItem("cart");

          setCart(mergedCart);
        } catch (err) {
          console.error("Failed to fetch or sync cart:", err);
        }
      } else {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) setCart(JSON.parse(storedCart));
        else setCart([]);
      }
    };

    fetchCart();
  }, [user]);

  useEffect(() => {
    if (user) {
      const syncCart = async () => {
        try {
          await axios.post("/cart", { cart });
        } catch (err) {
          console.error("Failed to sync cart:", err);
        }
      };
      if (cart.length > 0) syncCart();
    } else {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, user]);

  const addToCart = useCallback((item) => {
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.productId === item.productId);
      if (existing) {
        return prevCart.map((i) =>
          i.productId === item.productId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
    toast.success("Product added to cart successfully");
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    setCart((prev) =>
      prev.map((i) => (i.productId === productId ? { ...i, quantity } : i))
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    if (!user) localStorage.removeItem("cart");
  }, [user]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

function mergeCarts(backendCart, localCart) {
  const merged = [...backendCart];
  for (const item of localCart) {
    const existing = merged.find((i) => i.productId === item.productId);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      merged.push(item);
    }
  }
  return merged;
}
