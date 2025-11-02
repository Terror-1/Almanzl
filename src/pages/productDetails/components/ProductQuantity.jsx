import useProductQuantity from "../context/productQuantity/useProductQuantity";

function ProductQuantity() {
  const [quantity, setQuantity] = useProductQuantity();
  return (
    <div className="border h-14 md:w-1/4 w-50 flex justify-between items-center p-4">
      <button
        onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
        className="cursor-pointer hover:bg-[#1E2939] hover:text-white p-2 rounded-xs hover:shadow-md transition"
      >
        &#10094;
      </button>
      <span>{quantity}</span>
      <button
        onClick={() => setQuantity((prev) => prev + 1)}
        className="cursor-pointer hover:bg-[#1E2939] hover:text-white p-2 rounded-xs hover:shadow-md transition"
      >
        &#10095;
      </button>
    </div>
  );
}

export default ProductQuantity;
