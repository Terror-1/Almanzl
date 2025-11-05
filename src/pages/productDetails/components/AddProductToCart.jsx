import { useContext } from "react";
import LoadingButton from "../../../components/LoadingButton";
import useProductQuantity from "../context/productQuantity/useProductQuantity";
import ProductQuantity from "./ProductQuantity";
import useProduct from "../context/product/useProduct";
import { CartContext } from "../../cart/context/CartContext";
import { AuthContext } from "../../authentication/context/AuthContext";

export default function AddProductToCart({ product }) {
  const { addToCart } = useContext(CartContext);
  const [quantity] = useProductQuantity();
  const { setProduct } = useProduct();
  const { user } = useContext(AuthContext);

  if (!user || product.stock === 0) {
    return;
  }

  const handleSubmit = async () => {
    {
      setProduct((prev) => {
        return { ...prev, rating: 3 };
      });
      const productToAdd = {
        productId: product._id,
        quantity,
        name: product.name,
        image: product.images?.length > 0 ? product.images[0].url : null,
        price: product.price,
      };

      addToCart(productToAdd);
      return new Promise((resolve) => setTimeout(resolve, 1000));
    }
  };

  return (
    <div className="flex justify-center items-center gap-5">
      <ProductQuantity product={product} />
      <LoadingButton
        title="Add to Cart"
        onClick={handleSubmit}
        width="50%"
        style={{
          margin: "2rem auto",
        }}
      />
    </div>
  );
}
