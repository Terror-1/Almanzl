import { useContext } from "react";
import { CartContext } from "../../cart/context/CartContext";

const OrderItems = () => {
  const { cart } = useContext(CartContext);

  return (
    <div className="bg-white shadow rounded-2xl p-6">
      <h2 className="text-lg font-semibold mb-3 border-b pb-2">Order Items</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-sm mt-2">No items in your order.</p>
      ) : (
        <div className="divide-y">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center py-3 text-sm"
            >
              <div>
                <p className="font-medium text-gray-800">
                  {item.name}{" "}
                  <span className="text-gray-600">({item.quantity}x)</span>
                </p>
              </div>
              <span className="font-semibold text-gray-800">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderItems;
