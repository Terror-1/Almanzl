import { Star, StarHalf } from "lucide-react";
import Rating from "./Rating";

const Product = ({ product }) => {
  const rating = product.ratingsAverage || 0;

  return (
    <div
      className="
        bg-white rounded-2xl overflow-hidden 
        shadow-md hover:shadow-lg 
        transition-all duration-300 
        flex flex-col
        w-full
        h-[420px]
      "
    >
      <div className="h-2/4 w-full relative">
        <img
          src={product.images[0]?.url}
          alt={product.name}
          className="h-full w-full object-cover"
        />
        <span className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded-full">
          {product.category?.name}
        </span>
      </div>

      <div className="flex flex-col justify-between flex-grow p-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 capitalize truncate">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center mt-2 space-x-1">
            <Rating size={20} readonly value={rating} />
            <span className="text-sm text-gray-500 ml-1">
              ({product.ratingsQuantity})
            </span>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mt-4">
            <span className="text-xl font-bold text-gray-900">
              ${product.price}
            </span>
            {product.stock > 0 ? (
              <span className="text-sm text-green-600 font-medium">
                In stock
              </span>
            ) : (
              <span className="text-sm text-red-600 font-medium">
                Out of stock
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
