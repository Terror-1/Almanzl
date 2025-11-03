import { useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function Rating({
  value,
  onChange,
  max = 5,
  size = 28,
  color = "#facc15",
  emptyColor = "#1E2939",
  readonly = false,
}) {
  const [internalValue, setInternalValue] = useState(value ?? 0);
  const [hoverValue, setHoverValue] = useState(undefined);

  const currentValue = value ?? internalValue;

  const handleClick = (index, isHalf) => {
    if (readonly) return;

    const newValue = isHalf ? index + 0.5 : index + 1;
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  const handleMouseMove = (e, index) => {
    if (readonly) return;
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const isHalf = x < width / 2;
    setHoverValue(isHalf ? index + 0.5 : index + 1);
  };

  const displayValue = hoverValue ?? currentValue;

  return (
    <div className="flex items-center space-x-1 select-none">
      {Array.from({ length: max }, (_, i) => {
        const full = displayValue >= i + 1;
        const half = !full && displayValue >= i + 0.5;

        return (
          <motion.div
            key={i}
            onMouseMove={(e) => handleMouseMove(e, i)}
            onMouseLeave={() => setHoverValue(undefined)}
            onClick={(e) => {
              const { left, width } = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - left;
              const isHalf = x < width / 2;
              handleClick(i, isHalf);
            }}
            whileHover={{ scale: readonly ? 1 : 1.2 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
            style={{ cursor: readonly ? "default" : "pointer" }}
          >
            {full ? (
              <FaStar size={size} color={color} />
            ) : half ? (
              <FaStarHalfAlt size={size} color={color} />
            ) : (
              <FaRegStar size={size} color={emptyColor} />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
