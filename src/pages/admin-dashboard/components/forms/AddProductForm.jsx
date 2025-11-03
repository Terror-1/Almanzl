import { useState } from "react";
import { Plus, X, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import { useCreateProductMutation } from "../../../../slices/productsSlice";

export default function AddProductForm({ category, onBack }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  const [createProduct, { isLoading }] = useCreateProductMutation();

  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages((prev) => [...prev, ...files]);
    setPreviewUrls((prev) => [
      ...prev,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    setPreviewUrls(previewUrls.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price) {
      toast.error("Please fill all required fields");
      return;
    }

    const productData = {
      name,
      price,
      description,
      category: category._id,
      images,
    };

    try {
      await createProduct(productData).unwrap();
      toast.success("Product added successfully!");

      // reset form
      setName("");
      setPrice("");
      setDescription("");
      setImages([]);
      setPreviewUrls([]);
    } catch (error) {
      toast.error(
        error?.data?.message || error.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-sm text-gray-600 mb-4 hover:text-indigo-600 transition"
      >
        <ArrowLeft size={16} /> Back to Categories
      </button>

      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Add Product to <span className="text-indigo-600">{category.name}</span>
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter product name"
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price (EGP)
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter product price"
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the product..."
            rows="3"
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        </div>

        {/* Images */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Images
          </label>

          <div className="flex flex-wrap gap-3">
            {previewUrls.map((url, index) => (
              <div key={index} className="relative">
                <img
                  src={url}
                  alt="preview"
                  className="w-24 h-24 object-cover rounded-xl border"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                >
                  <X size={14} />
                </button>
              </div>
            ))}

            <label
              htmlFor="image-upload"
              className="cursor-pointer flex items-center justify-center w-24 h-24 border-2 border-dashed border-gray-300 rounded-xl hover:border-indigo-400 hover:bg-indigo-50 transition"
            >
              <Plus size={20} className="text-gray-500" />
              <input
                id="image-upload"
                type="file"
                multiple
                accept="image/*"
                onChange={handleFilesChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
