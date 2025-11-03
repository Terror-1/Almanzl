import { useState, useRef, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

function ExpandableText({
  children,
  maxLines = 4,
  readMoreText = "Read more",
  readLessText = "Read less",
  className = "",
}) {
  const [expanded, setExpanded] = useState(false);
  const [needsTruncation, setNeedsTruncation] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      const el = textRef.current;
      setNeedsTruncation(el.scrollHeight > el.clientHeight + 5);
    }
  }, [children, maxLines]);

  return (
    <div className={`relative w-full flex flex-col items-start ${className}`}>
      <motion.div
        key={expanded ? "expanded" : "collapsed"}
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <p
          ref={textRef}
          className={`text-gray-800 leading-relaxed transition-all duration-300 ${
            expanded ? "" : `line-clamp-${maxLines}`
          }`}
        >
          {children}
        </p>
      </motion.div>

      {needsTruncation && (
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="cursor-pointer mt-2 hover:text-[#72479C] text-[#1E2939] font-semibold hover:underline focus:outline-none"
        >
          {expanded ? readLessText : readMoreText}
        </button>
      )}
    </div>
  );
}

export default ExpandableText;
