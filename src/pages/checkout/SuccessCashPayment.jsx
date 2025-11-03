import { CheckCircle } from "lucide-react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../cart/context/CartContext";

const SucessCashPayment = () => {
  const { clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    clearCart();
  }, [clearCart]);
  return (
    <div className="flex flex-col items-center justify-center text-center p-6">
      <CheckCircle className="text-green-500 w-16 h-16 mb-4" />
      <h1 className="text-2xl font-semibold mb-2">
        Order Placed Successfully 🎉
      </h1>
      <p className="text-gray-600 mb-6">
        Thank you for your purchase! Your order has been confirmed.
      </p>

      <button
        onClick={() => navigate("/")}
        className="bg-secondary hover:bg-hover text-white px-5 py-2 rounded-lg"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default SucessCashPayment;
