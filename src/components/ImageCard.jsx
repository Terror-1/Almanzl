import { Link } from "react-router-dom";

const ImageCard = ({ name, image, link = "#" }) => {
  return (
    <div className="flex flex-col items-center my-5">
      <Link
        to={link}
        className="block border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
      >
        <div
          className="bg-gray-200 flex items-center justify-center"
          style={{ width: "405px", height: "474px" }}
        >
          {image ? (
            <img
              src={image}
              alt={name}
              style={{ width: "250px", height: "300px", objectFit: "cover" }}
            />
          ) : (
            <span className="text-gray-500">Image</span>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ImageCard;
