import { CheckCircle } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useContext, useEffect } from "react";
import { CartContext } from "../cart/context/CartContext";

const SuccessPayment = () => {
  const { clearCart } = useContext(CartContext);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    clearCart();
  }, [clearCart]);
  const sessionId = searchParams.get("session_id");
  const { data, loading, error } = useFetch(`/orders/session/${sessionId}`);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Loading payment details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <p className="text-red-500 text-lg font-semibold mb-2">Payment Error</p>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={() => navigate("/")}
          className="bg-yellow-500 hover:bg-yellow-400 text-white px-4 py-2 rounded-lg"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center  bg-gray-50 text-center p-6">
      <CheckCircle className="text-green-500 w-16 h-16 mb-4" />
      <h1 className="text-2xl font-semibold mb-2">Payment Successful 🎉</h1>
      <p className="text-gray-600 mb-6">
        Thank you for your purchase! Your order has been confirmed.
      </p>

      {data && (
        <div className="bg-white shadow-md rounded-xl p-5 mb-6 w-full max-w-md text-left">
          <p className="font-medium text-gray-800 mb-1">
            <span className="text-gray-500">Order ID:</span>{" "}
            {data.metadata?.orderId}
          </p>
          <p className="font-medium text-gray-800 mb-1">
            <span className="text-gray-500">Total:</span> $
            {(data.amount_total / 100).toFixed(2)}
          </p>
          <p className="text-gray-600 text-sm mt-2">
            Payment method: {data.payment_method_types?.join(", ")}
          </p>
        </div>
      )}

      <button
        onClick={() => navigate("/")}
        className="bg-secondary hover:bg-hover text-white px-5 py-2 rounded-lg"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default SuccessPayment;
