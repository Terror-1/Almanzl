import { useState } from "react";

const ProductsTable = ({
  products,
  currentPage,
  onPageChange,
  onDelete,
  onUpdate,
}) => {
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});

  const handleEditClick = (product) => {
    setEditingId(product._id);
    setFormData({
      name: product.name,
      price: product.price,
      stock: product.stock,
    });
  };

  const handleSaveClick = async (id) => {
    await onUpdate(id, formData);
    setEditingId(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">All Products</h3>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                #
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                Product
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                Category
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                Price
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                Stock
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                Created
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {products.data.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-4 text-gray-500 italic"
                >
                  No products found
                </td>
              </tr>
            ) : (
              products.data.map((p, index) => (
                <tr
                  key={p._id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4 text-sm text-gray-700">
                    {index + 1 + (currentPage - 1) * 5}
                  </td>

                  <td className="py-3 px-4">
                    {editingId === p._id ? (
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-2 py-1 border rounded"
                      />
                    ) : (
                      <div>
                        <p className="font-medium text-gray-900">{p.name}</p>
                      </div>
                    )}
                  </td>

                  <td className="py-3 px-4 text-gray-600">
                    {p.category?.name || "—"}
                  </td>

                  <td className="py-3 px-4 font-semibold text-gray-900">
                    {editingId === p._id ? (
                      <input
                        type="number"
                        value={formData.price}
                        onChange={(e) =>
                          setFormData({ ...formData, price: e.target.value })
                        }
                        className="w-full px-2 py-1 border rounded"
                      />
                    ) : (
                      `$${p.price?.toFixed(2)}`
                    )}
                  </td>

                  <td className="py-3 px-4">
                    {editingId === p._id ? (
                      <input
                        type="number"
                        value={formData.stock}
                        onChange={(e) =>
                          setFormData({ ...formData, stock: e.target.value })
                        }
                        className="w-full px-2 py-1 border rounded"
                      />
                    ) : (
                      <span
                        className={`text-sm font-medium ${
                          p.stock > 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {p.stock > 0 ? "In Stock" : "Out of Stock"}
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-4 text-sm text-gray-500">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </td>

                  <td className="py-3 px-4 flex gap-2">
                    {editingId === p._id ? (
                      <button
                        onClick={() => handleSaveClick(p._id)}
                        className="px-2 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEditClick(p)}
                        className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => onDelete(p._id)}
                      className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end items-center gap-2 mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="px-3 py-1 border rounded-md disabled:opacity-50 text-sm hover:bg-gray-100"
        >
          Prev
        </button>
        <span className="text-sm text-gray-700">
          Page {currentPage} of {products.pagination?.totalPages || 1}
        </span>
        <button
          disabled={currentPage === products.pagination?.totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 py-1 border rounded-md disabled:opacity-50 text-sm hover:bg-gray-100"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductsTable;
