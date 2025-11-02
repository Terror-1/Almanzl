import VerticalDivider from "../../../components/VerticalDivider";
import HeartIcon from "../../../assets/heart.png";
import MessageIcon from "../../../assets/message.png";
import StartIcon from "../../../assets/star.png";
import Icon from "../../../components/Icon";

function ProductInfo({ product }) {
  const { createdAt, category, price } = product;

  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="flex  items-start md:items-stretch flex-wrap mt-4 text-gray-500">
      <span className="underline">{formattedDate}</span>
      <VerticalDivider />
      <span>{category.name}</span>
      {/* <VerticalDivider />
      <span>By {category.name}</span> */}
      <VerticalDivider />
      <Icon icon={HeartIcon} title={"5"} />
      <VerticalDivider />
      <Icon icon={MessageIcon} title={"4"} />
      <VerticalDivider />
      <Icon icon={StartIcon} title="4.5" />
      <VerticalDivider />
      <span>{price}$</span>
    </div>
  );
}

export default ProductInfo;
