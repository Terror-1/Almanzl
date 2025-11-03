import { useState } from "react";
import { Plus, X } from "lucide-react";

const CategoryForm = ({ onSubmit, isLoading }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIcon(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setIcon(null);
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (icon) formData.append("icon", icon);

    try {
      await onSubmit(formData);
      setName("");
      setDescription("");
      setIcon(null);
      setPreview(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200"
    >
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Ceramics, Vases..."
          className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe this category..."
          rows="3"
          className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category Icon
        </label>

        {preview ? (
          <div className="relative inline-block">
            <img
              src={preview}
              alt="Category Icon Preview"
              className="w-24 h-24 object-cover rounded-xl border border-gray-200"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <label
              htmlFor="icon-upload"
              className="cursor-pointer flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition"
            >
              <Plus size={16} />
              Choose File
            </label>
            <input
              id="icon-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
      >
        {isLoading ? "Adding..." : "Add Category"}
      </button>
    </form>
  );
};

export default CategoryForm;
