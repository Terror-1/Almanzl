import ProductDescription from "./ProductDescription";

function SimilarProducts({ similarProducts }) {
  return (
    <div className="cursor-pointer">
      <h2 className="mb-5 underline font-medium">Similar Products</h2>
      {similarProducts.map((prod, index) => {
        return (
          <div key={index} className="mb-8">
            <img
              src={prod.images[0]}
              alt={prod.title}
              className="w-full h-32 md:h-64 object-cover hover:scale-[1.02] transition-all duration-300"
            />
            <ProductDescription
              product={prod}
              titleSize="xl"
              descriptionSize="xs"
              descriptionStyle="line-clamp-2"
            />
          </div>
        );
      })}
    </div>
  );
}

export default SimilarProducts;
