function ProductDescription({
  product,
  titleSize = "2xl",
  descriptionSize = "md",
  descriptionStyle = "",
}) {
  const { title, description } = product;
  return (
    <div className="gap-2 mb-5 flex flex-col">
      <h1 className={`text-${titleSize} font-semibold`}>{title}</h1>
      <p
        className={`text-${descriptionSize} text-gray-500  ${descriptionStyle}`}
      >
        {description}
      </p>
    </div>
  );
}

export default ProductDescription;
