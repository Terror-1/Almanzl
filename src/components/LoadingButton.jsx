// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";
import { ImSpinner8 } from "react-icons/im";

export default function LoadingButton({
  title = "Submit",
  onClick,
  color = "#1E2939",
  textColor = "#fff",
  borderColor,
  borderRadius = 0,
  width = "100%",
  height = 56,
  fontSize = 16,
  fontWeight = 500,
  loaderSize = 22,
  loaderColor = "#fff",
  duration = 0.4,
  style = {},
  disabled = false,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [showText, setShowText] = useState(true);

  const handleClick = async (e) => {
    if (disabled || isLoading) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    setIsLoading(true);
    setShowText(false);

    try {
      await onClick?.();
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        setTimeout(() => setShowText(true), duration * 1000);
      }, 250);
    }
  };

  return (
    <motion.button
      disabled={disabled}
      onClick={handleClick}
      animate={{
        width: isLoading ? height : width,
        borderRadius: isLoading ? height / 2 : borderRadius,
      }}
      transition={{ duration, ease: "easeInOut" }}
      style={{
        backgroundColor: color,
        color: textColor,
        opacity: disabled ? 0.6 : 1,
        border: `1px solid ${borderColor || color}`,
        height,
        fontSize,
        fontWeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        cursor: disabled || isLoading ? "not-allowed" : "pointer",
        ...style,
      }}
    >
      {isLoading ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <ImSpinner8 size={loaderSize} color={loaderColor} />
        </motion.div>
      ) : (
        showText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
          >
            {title}
          </motion.span>
        )
      )}
    </motion.button>
  );
}
