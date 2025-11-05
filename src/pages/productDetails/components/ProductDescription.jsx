function ProductDescription({
  product,
  titleSize = "2xl",
  descriptionSize = "md",
  descriptionStyle = "",
  className = "",
}) {
  const { name, description } = product;
  return (
    <div className={`gap-2 mb-5 flex flex-col ${className}`}>
      <h1 className={`text-${titleSize} text-start`}>{name}</h1>
      <p
        className={`text-${descriptionSize} text-gray-500 ${descriptionStyle}`}
      >
        {description}
      </p>
    </div>
  );
}

export default ProductDescription;
