import VerticalDivider from "../../../components/VerticalDivider";
import HeartIcon from "../../../assets/heart.png";
import FilledHeartIcon from "../../../assets/filledHeartIcon.png";
import MessageIcon from "../../../assets/message.png";
import StartIcon from "../../../assets/star.png";
import Icon from "../../../components/Icon";
import useProductReviews from "../context/productReviews/useProductReviews";
import { useContext, useState } from "react";
import { AuthContext } from "../../authentication/context/AuthContext";
import api from "../../../lib/axios";
import { toast } from "react-toastify";

function ProductInfo({ product }) {
  const { createdAt, category, price, name } = product;
  const { user, updateFavorites } = useContext(AuthContext);

  const { productReviews } = useProductReviews();
  const [isProcessing, setIsProcessing] = useState(false);

  const [favoritesNumber, setFavoritesNumber] = useState(
    product.favoritesCount || 0
  );

  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  function isFavorite() {
    if (!user || !user.favorites) return false;
    return user.favorites.some((id) => id === product._id);
  }

  const favorite = isFavorite();

  async function addProductToFavorite() {
    if (!user) {
      return toast.error("You need to be logged in to add to favorites.");
    }

    if (isProcessing) return;
    setIsProcessing(true);

    try {
      const data = await api.post(`/user/favorites/${product._id}`);
      setFavoritesNumber((prev) => prev + 1);
      updateFavorites(data.data.data);
    } catch {
      toast.error(
        "There is something wrong while adding to favorites, try again later."
      );
    } finally {
      setIsProcessing(false);
    }
  }

  async function removeProductFromFavorite() {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      const data = await api.delete(`/user/favorites/${product._id}`);
      setFavoritesNumber((prev) => prev - 1);
      updateFavorites(data.data.data);
    } catch {
      toast.error(
        "There is something wrong while removing from favorites, try again later."
      );
    } finally {
      setIsProcessing(false);
    }
  }

  function calculateProductReview() {
    if (productReviews.length === 0) return product.ratingsAverage;
    const totalRating = productReviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    return +(totalRating / productReviews.length).toFixed(1);
  }

  return (
    <div className="flex  items-start md:items-stretch flex-wrap mt-4 text-gray-500">
      <span className="font-bold">{name}</span>
      <VerticalDivider />
      <span className="underline">{formattedDate}</span>
      <VerticalDivider />
      <span>{category.name}</span>
      <VerticalDivider />
      <button
        disabled={isProcessing}
        onClick={favorite ? removeProductFromFavorite : addProductToFavorite}
        className={`cursor-pointer transition-all duration-200 ${
          isProcessing ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <Icon
          icon={favorite ? FilledHeartIcon : HeartIcon}
          title={favoritesNumber ?? 0}
        />
      </button>
      <VerticalDivider />
      <Icon
        icon={MessageIcon}
        title={productReviews.length === 0 ? "-" : productReviews.length}
      />
      <VerticalDivider />
      <Icon icon={StartIcon} title={calculateProductReview()} />
      <VerticalDivider />
      <span className="font-bold">{price}$</span>
      <VerticalDivider />
      <span
        className={`font-bold ${product.stock === 0 ? "text-red-500" : ""}`}
      >
        {product.stock > 10
          ? `${product.stock} items available`
          : product.stock > 0
          ? `Only ${product.stock} left in stock, order now`
          : "Out of stock"}
      </span>
    </div>
  );
}

export default ProductInfo;
