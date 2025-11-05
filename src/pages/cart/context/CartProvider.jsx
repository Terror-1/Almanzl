import { useState, useEffect, useContext, useCallback } from "react";
import axios from "@/lib/axios";
import { CartContext } from "./CartContext";
import { AuthContext } from "../../authentication/context/AuthContext";
import { toast } from "react-toastify";

export function CartProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const syncCartOnAuthChange = async () => {
      if (user) {
        try {
          const localCart = JSON.parse(localStorage.getItem("cart")) || [];
          const { data } = await axios.get("/cart");
          const backendCart = data.cart || [];

          const mergedCart = mergeCarts(backendCart, localCart);

          await axios.post("/cart", { cart: mergedCart });
          setCart(mergedCart);
          localStorage.setItem("cart", JSON.stringify(mergedCart));
        } catch (err) {
          console.error("Error syncing cart on login:", err);
        }
      } else {
        try {
          if (cart.length > 0) {
            await axios.post("/cart", { cart });
          }
        } catch (err) {
          console.error("Error saving cart on logout:", err);
        } finally {
          localStorage.removeItem("cart");
          setCart([]);
        }
      }
    };

    syncCartOnAuthChange();
  }, [user]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const syncBackendCart = useCallback(
    async (updatedCart) => {
      if (!user) return;
      try {
        await axios.post("/cart", { cart: updatedCart });
      } catch (err) {
        console.error("Error syncing cart with backend:", err);
      }
    },
    [user]
  );

  const addToCart = useCallback(
    (item) => {
      setCart((prevCart) => {
        const existing = prevCart.find((i) => i.productId === item.productId);
        let updatedCart;
        if (existing) {
          updatedCart = prevCart.map((i) =>
            i.productId === item.productId
              ? { ...i, quantity: i.quantity + 1 }
              : i
          );
        } else {
          updatedCart = [...prevCart, { ...item, quantity: 1 }];
        }

        syncBackendCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        toast.success("Product added to cart successfully");
        return updatedCart;
      });
    },
    [syncBackendCart]
  );

  const removeFromCart = useCallback(
    (productId) => {
      setCart((prevCart) => {
        const updatedCart = prevCart.filter((i) => i.productId !== productId);
        syncBackendCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      });
    },
    [syncBackendCart]
  );

  const updateQuantity = useCallback(
    (productId, quantity) => {
      setCart((prevCart) => {
        const updatedCart = prevCart.map((i) =>
          i.productId === productId ? { ...i, quantity } : i
        );
        syncBackendCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      });
    },
    [syncBackendCart]
  );

  const clearCart = useCallback(() => {
    setCart([]);
    localStorage.removeItem("cart");
    if (user) axios.post("/cart", { cart: [] });
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
    if (existing) existing.quantity += item.quantity;
    else merged.push(item);
  }
  return merged;
}
