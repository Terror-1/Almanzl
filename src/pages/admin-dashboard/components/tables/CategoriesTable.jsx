import { useState } from "react";

const CategoriesTable = ({
  categories,
  currentPage,
  totalPages,
  onPageChange,
  onDelete,
  onUpdate,
}) => {
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});

  const handleEditClick = (category) => {
    setEditingId(category._id);
    setFormData({
      name: category.name,
      description: category.description || "",
    });
  };

  const handleSaveClick = (id) => {
    onUpdate(id, formData);
    setEditingId(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">All Categories</h3>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                #
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                Name
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                Description
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
            {categories.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-4 text-gray-500 italic"
                >
                  No categories found
                </td>
              </tr>
            ) : (
              categories.map((c, index) => (
                <tr
                  key={c._id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4 text-sm text-gray-700">
                    {index + 1 + (currentPage - 1) * 5}
                  </td>

                  <td className="py-3 px-4">
                    {editingId === c._id ? (
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-2 py-1 border rounded"
                      />
                    ) : (
                      <span className="font-medium text-gray-900">
                        {c.name}
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-4">
                    {editingId === c._id ? (
                      <input
                        type="text"
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                        className="w-full px-2 py-1 border rounded"
                      />
                    ) : (
                      <span className="text-sm text-gray-600">
                        {c.description || "—"}
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-4 text-sm text-gray-500">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </td>

                  <td className="py-3 px-4 flex gap-2">
                    {editingId === c._id ? (
                      <button
                        onClick={() => handleSaveClick(c._id)}
                        className="px-2 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEditClick(c)}
                        className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => onDelete(c._id)}
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
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 py-1 border rounded-md disabled:opacity-50 text-sm hover:bg-gray-100"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CategoriesTable;
