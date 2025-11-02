import { useFetch } from "../../../hooks/useFetch";
import ProductDescription from "./ProductDescription";
import SimilarProductShimmer from "./SimilarProductShimmer";

function SimilarProducts() {
  const { data, loading, error } = useFetch(
    "products/690716ee329f24ecdb9fe8ab/similar"
  );

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div>
      <h2 className="mb-5 underline font-medium">Similar Products</h2>
      {loading ? (
        Array.from({ length: 3 }).map(() => <SimilarProductShimmer />)
      ) : data.data.length == 0 ? (
        <p className="text-center text-2xl my-20 font-bold">
          No similar products found.
        </p>
      ) : (
        data.data.map((prod, index) => {
          return (
            <div key={index} className="mb-8">
              <img
                src={prod.images[0]}
                alt={prod.title}
                className="w-full h-32 md:h-64 object-cover hover:scale-[1.02] transition-all duration-300 cursor-pointer"
              />
              <ProductDescription
                product={prod}
                titleSize="xl"
                descriptionSize="xs"
                descriptionStyle="line-clamp-2"
              />
            </div>
          );
        })
      )}
    </div>
  );
}

export default SimilarProducts;
