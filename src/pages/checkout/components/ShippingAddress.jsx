import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../authentication/context/AuthContext";

const ShippingAddress = () => {
  const { user, updateAddress } = useContext(AuthContext);
  const [showForm, setShowForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  if (!user) {
    return (
      <div className="bg-white shadow rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-3">Shipping Address</h2>
        <p className="text-sm text-gray-500">
          Please log in to set your address.
        </p>
      </div>
    );
  }
  const handleSaveAddress = () => {
    if (!newAddress.address || !newAddress.city || !newAddress.country) {
      toast.error("Please fill in all required fields");
      return;
    }

    updateAddress(newAddress);
    toast.success("Address saved!");
    setShowForm(false);
  };

  const hasAddress = user.address && Object.keys(user.address).length > 0;

  return (
    <div className="bg-white shadow rounded-2xl p-6">
      <h2 className="text-lg font-semibold mb-3">Shipping Address</h2>

      <p className="text-sm text-gray-500">Delivering to</p>
      <div className="flex items-center gap-2 font-medium text-gray-700">
        <span>{user.name}</span>
        {user.phone && (
          <span className="text-sm text-gray-600">📞 {user.phone}</span>
        )}
      </div>
      {hasAddress ? (
        <div className="mt-3 space-y-2">
          <p className="text-sm">
            {user.address.address}, {user.address.city}{" "}
            {user.address.postalCode && `, ${user.address.postalCode}`},{" "}
            {user.address.country}
          </p>
          <button
            onClick={() => {
              setShowForm(true);
              setNewAddress(user.address);
            }}
            className="mt-2 text-sm text-hover hover:text-yellow-700 font-semibold"
          >
            Change Address
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="mt-2 text-sm text-yellow-600 hover:text-yellow-700 font-semibold"
        >
          Add Shipping Address
        </button>
      )}

      {showForm && (
        <div className="mt-4 space-y-3 bg-gray-50 p-4 rounded-xl border">
          <input
            type="text"
            placeholder="Address"
            value={newAddress.address}
            onChange={(e) =>
              setNewAddress({ ...newAddress, address: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="text"
            placeholder="City"
            value={newAddress.city}
            onChange={(e) =>
              setNewAddress({ ...newAddress, city: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="text"
            placeholder="Postal Code"
            value={newAddress.postalCode}
            onChange={(e) =>
              setNewAddress({ ...newAddress, postalCode: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="text"
            placeholder="Country"
            value={newAddress.country}
            onChange={(e) =>
              setNewAddress({ ...newAddress, country: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-yellow-500"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShowForm(false)}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveAddress}
              className="px-3 py-1 bg-yellow-500 text-white rounded-lg text-sm hover:bg-yellow-400"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShippingAddress;
