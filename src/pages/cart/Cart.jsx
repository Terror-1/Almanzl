import { useContext } from "react";
import { CartContext } from "./context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, clearCart } =
    useContext(CartContext);

  const itemsPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-50 min-h-screen">
      <div className="flex-1 bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
        <h2 className="text-3xl font-bold mb-5 border-b-2 border-secondary pb-3 text-gray-800">
          Shopping Cart
        </h2>

        {cart.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Your cart is empty</p>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={item.productId}
                className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-gray-200 py-5 hover:bg-gray-50 transition-all rounded-lg"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-contain border rounded-xl bg-white"
                    loading="lazy"
                  />
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">
                      {item.name}
                    </h3>
                    {item.size && (
                      <p className="text-sm text-gray-600">
                        Size:{" "}
                        <span className="font-medium text-gray-800">
                          {item.size}
                        </span>
                      </p>
                    )}
                    {item.color && (
                      <p className="text-sm text-gray-600">
                        Color:{" "}
                        <span className="font-medium text-gray-800">
                          {item.color}
                        </span>
                      </p>
                    )}
                    <p className="text-green-600 text-sm font-medium mt-1">
                      In Stock
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center sm:items-end gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity - 1)
                      }
                      className="border px-3 rounded-md hover:bg-gray-100 font-bold text-gray-700"
                    >
                      −
                    </button>
                    <span className="px-2 font-medium text-gray-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity + 1)
                      }
                      className="border px-3 rounded-md hover:bg-gray-100 font-bold text-gray-700"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-lg font-semibold text-gray-800">
                    ${" "}
                    <span className="text-secondary">
                      {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </p>
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="text-sm text-red-500 hover:text-red-600 hover:underline transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="text-right mt-6">
              <p className="text-lg font-semibold text-gray-800">
                Subtotal ({cart.length} item{cart.length > 1 && "s"}):{" "}
                <span className="text-secondary font-bold">
                  ${itemsPrice.toFixed(2)}
                </span>
              </p>
              <button
                onClick={clearCart}
                className="mt-4 bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>

      {cart.length > 0 && (
        <div className="w-full md:w-1/3 bg-white shadow-lg rounded-2xl p-6 h-fit border border-gray-100">
          <p className="text-xl font-semibold mb-4 text-gray-800">
            Order Summary
          </p>
          <p className="text-lg font-medium mb-3">
            Subtotal ({cart.length} item{cart.length > 1 && "s"}):{" "}
            <span className="font-bold text-secondary">
              ${itemsPrice.toFixed(2)}
            </span>
          </p>

          <button
            onClick={() => navigate("/checkout")}
            className="w-full bg-secondary hover:bg-hover text-white font-semibold py-3 rounded-lg mt-4 transition-all shadow-sm"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
