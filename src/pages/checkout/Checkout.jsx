import { useContext, useEffect, useState } from "react";
import ShippingAddress from "./components/ShippingAddress";
import PaymentMethod from "./components/PaymentMethod";
import OrderItems from "./components/OrderItems";
import { toast } from "react-toastify";
import axios from "@/lib/axios";
import { CartContext } from "../cart/context/CartContext";
import { AuthContext } from "../authentication/context/AuthContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [loading, setLoading] = useState(false);
  const { cart } = useContext(CartContext);
  useEffect(() => {
    if (!user) {
      toast.info("Please log in to continue checkout");
      navigate("/sign");
    }
  }, [user, navigate]);
  const itemsPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const handlePayment = async () => {
    if (!user.address) {
      toast.error("please fill a shipping address");
      return;
    }
    const payload = {
      orderItems: cart,
      shippingAddress: user.address,
      itemsPrice,
      shippingPrice: 50,
      discountAmount: 0,
    };
    if (paymentMethod === "stripe") {
      try {
        setLoading(true);
        toast.loading("Redirecting to Stripe...");

        const res = await axios.post(
          "/orders/create-checkout-session",
          JSON.stringify(payload)
        );
        const data = res.data;
        toast.dismiss();

        window.location.href = data.url;
      } catch (error) {
        toast.dismiss();
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        setLoading(true);
        await axios.post("/orders/create-order-cash", JSON.stringify(payload));
        navigate("/payment-success-cash");
      } catch (error) {
        toast.dismiss();
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <ShippingAddress />
          <PaymentMethod
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
          <OrderItems />
        </div>

        <div className="bg-white shadow rounded-2xl p-6 h-fit">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2 text-gray-700 mb-4">
            <div className="flex justify-between">
              <span>Items:</span>
              <span>${itemsPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping & Handling:</span>
              <span>$50</span>
            </div>
            <div className="flex justify-between">
              <span>discount:</span>
              <span>$0</span>
            </div>
            <div className="flex justify-between font-semibold border-t pt-2">
              <span>Order Total</span>
              <span>${itemsPrice + 50}</span>
            </div>
          </div>

          <button
            onClick={handlePayment}
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-secondary hover:bg-hover text-white"
            }`}
          >
            {loading
              ? "Processing..."
              : paymentMethod === "stripe"
              ? "Proceed to Stripe Payment"
              : "Place Order (Cash)"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
