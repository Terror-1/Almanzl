import { Link, useParams } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch";
import ProductDescription from "./ProductDescription";
import SimilarProductShimmer from "./SimilarProductShimmer";

function SimilarProducts() {
  const { id } = useParams();
  const { data, loading, error } = useFetch(`/products/${id}/similar`);

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div>
      <h2 className="mb-5 underline font-medium">Similar Products</h2>
      {loading ? (
        Array.from({ length: 3 }).map((_, index) => (
          <SimilarProductShimmer key={index} />
        ))
      ) : data.length == 0 ? (
        <p className="text-center text-2xl my-20 font-bold">
          No similar products found.
        </p>
      ) : (
        data.map((prod, index) => {
          return (
            <Link to={`/products/${prod._id}`} key={index}>
              <img
                src={prod.images[0].url}
                alt={prod.title}
                className="w-full h-32 md:h-64 object-contain hover:scale-[1.02] transition-all duration-300 cursor-pointer"
              />
              <ProductDescription
                product={prod}
                titleSize="xl"
                descriptionSize="xs"
                descriptionStyle="line-clamp-2"
              />
            </Link>
          );
        })
      )}
    </div>
  );
}

export default SimilarProducts;
