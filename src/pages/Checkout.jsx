import axios from "@/lib/axios";
import toast from "react-hot-toast";

const PAYMENT_URL = "/orders/create-checkout-session";

export default function Checkout({ orderData }) {
  const handleCheckout = async () => {
    try {
      const { data } = await axios.post(PAYMENT_URL, orderData);
      window.location.href = data.url;
    } catch (error) {
      let message = "Something went wrong. Please try again.";

      if (error.response) {
        message =
          error.response.data?.message || `Error: ${error.response.statusText}`;
      } else if (error.request) {
        message = "No response from payment server.";
      } else {
        message = `Unexpected error: ${error.message}`;
      }

      toast.error(message);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 cursor-pointer"
    >
      Proceed to Payment
    </button>
  );
}
