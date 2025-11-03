function VerticalDivider({ height = "6", className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`w-px h-${height} mx-3 bg-gray-300 ${className}`}
    />
  );
}

export default VerticalDivider;
