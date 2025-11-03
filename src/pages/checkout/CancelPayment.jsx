import { XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CancelPayment = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center text-center p-6">
      <XCircle className="text-red-500 w-16 h-16 mb-4" />
      <h1 className="text-2xl font-semibold mb-2 text-gray-800">
        Payment Cancelled
      </h1>
      <p className="text-gray-600 mb-6 max-w-md">
        Your payment was not completed. Don’t worry — you can review your cart
        and try again when ready.
      </p>

      <div className="flex gap-3">
        <button
          onClick={() => navigate("/cart")}
          className="bg-secondary hover:bg-hover text-white px-5 py-2 rounded-lg"
        >
          Return to Cart
        </button>
        <button
          onClick={() => navigate("/")}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-lg"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default CancelPayment;
