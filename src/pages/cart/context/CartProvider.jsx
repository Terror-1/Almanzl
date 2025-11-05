import { useState, useEffect, useContext, useCallback } from "react";
import axios from "@/lib/axios";
import { CartContext } from "./CartContext";
import { AuthContext } from "../../authentication/context/AuthContext";
import { toast } from "react-toastify";

export function CartProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const handleCartOnLogin = async () => {
      if (!user) return;

      try {
        const localCart = JSON.parse(localStorage.getItem("cart")) || [];
        const { data } = await axios.get("/cart");
        const backendCart = data.cart || [];

        const mergedCart = mergeCarts(backendCart, localCart);

        await axios.post("/cart", { cart: mergedCart });

        localStorage.setItem("cart", JSON.stringify(mergedCart));
        setCart(mergedCart);
      } catch (err) {
        console.error("Error syncing cart on login:", err);
      }
    };

    handleCartOnLogin();
  }, [user]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const handleBeforeLogout = async () => {
      if (!user) return;
      try {
        await axios.post("/cart", { cart });
        setCart([]);
      } catch (err) {
        console.error("Error saving cart before logout:", err);
      }
    };

    const onBeforeLogout = () => handleBeforeLogout();

    window.addEventListener("beforeLogout", onBeforeLogout);
    return () => window.removeEventListener("beforeLogout", onBeforeLogout);
  }, [user, cart]);

  const addToCart = useCallback((item) => {
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.productId === item.productId);
      if (existing) {
        return prevCart.map((i) =>
          i.productId === item.productId
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prevCart, { ...item, quantity: item.quantity }];
    });
    toast.success("Product added to cart successfully");
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart((prev) => prev.filter((i) => i.productId !== productId));
  }, []);
  const updateQuantity = useCallback((productId, quantity) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.productId === productId) {
            if (quantity <= 0) return null;
            return { ...item, quantity };
          }
          return item;
        })
        .filter(Boolean)
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    localStorage.removeItem("cart");
  }, []);

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
