import { Link } from "react-router-dom";
import ChairImage from "../assets/chair.jpg";
import TableImage from "../assets/tables.jpg";
import LampImage from "../assets/lamps.jpg";

const features = [
  {
    id: 1,
    title: "STYLISH CHAIRS",
    text: "Discover our collection of beautifully crafted chairs that combine comfort and design. Each piece is made with premium materials, offering the perfect balance of elegance and durability for any modern home or workspace.",
    image: ChairImage,
    reverse: false,
  },
  {
    id: 2,
    title: "TABLE",
    text: "From dining to working, our tables are designed to bring people together. Made with solid craftsmanship and timeless style, each table serves as a centerpiece that enhances your space while providing strength and functionality.",
    image: TableImage,
    reverse: true,
  },
  {
    id: 3,
    title: "CONTEMPORARY LAMPS",
    text: "Light up your interiors with our contemporary lamps, blending artful design with soft, ambient illumination. Whether for reading or relaxation, they add warmth, character, and sophistication to any corner of your home.",
    image: LampImage,
    reverse: false,
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 space-y-24">
        {features.map((feature) => (
          <div
            key={feature.id}
            className={`flex flex-col md:flex-row items-center gap-50 ${
              feature.reverse ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Image */}
            <div className="flex-1">
              <img
                src={feature.image}
                alt={feature.title}
                className="rounded-lg shadow-md hover:shadow-xl transition duration-500 object-cover w-full h-[400px]"
              />
            </div>

            {/* Text */}
            <div className="flex-1 text-center md:text-left space-y-5">
              <h2 className="text-2xl font-bold text-gray-900">
                {feature.title}
              </h2>
              <p className="text-gray-600 leading-relaxed">{feature.text}</p>
              <Link
                to="/shop"
                className="hover:text-yellow-400 inline-block border border-gray-700 text-gray-900 px-6 py-2 rounded-sm hover:bg-gray-900 hover:text-white transition duration-300"
              >
                View more →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
