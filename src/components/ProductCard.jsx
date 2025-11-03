import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ProductCard = ({ name, price, image, link = "#" }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center my-5 cursor-pointer"
    >
      <Link
        to={link}
        className="w-[405px] h-[474px] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
      >
        <div className="relative w-full h-full">
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-lg">
              Image
            </div>
          )}
        </div>
      </Link>

      <div className="mt-5 text-center transition-colors duration-300 hover:text-yellow-500">
        <Link to={link}>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-gray-700">{price}</p>
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCard;
