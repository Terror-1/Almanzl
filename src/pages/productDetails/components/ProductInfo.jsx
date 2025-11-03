import VerticalDivider from "../../../components/VerticalDivider";
import HeartIcon from "../../../assets/heart.png";
import MessageIcon from "../../../assets/message.png";
import StartIcon from "../../../assets/star.png";
import Icon from "../../../components/Icon";
import useProductReviews from "../context/productReviews/useProductReviews";

function ProductInfo({ product }) {
  const { createdAt, category, price } = product;
  const { productReviews } = useProductReviews();

  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

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
      <span className="underline">{formattedDate}</span>
      <VerticalDivider />
      <span>{category.name}</span>
      <VerticalDivider />
      <span>
        {product.stock > 10
          ? `${product.stock} items available`
          : product.stock > 0
          ? `Only ${product.stock} left in stock, order now`
          : "Out of stock"}
      </span>
      <VerticalDivider />
      <Icon icon={HeartIcon} title={"5"} />
      <VerticalDivider />
      <Icon
        icon={MessageIcon}
        title={productReviews.length === 0 ? "-" : productReviews.length}
      />
      <VerticalDivider />
      <Icon icon={StartIcon} title={calculateProductReview()} />
      <VerticalDivider />
      <span>{price}$</span>
    </div>
  );
}

export default ProductInfo;
