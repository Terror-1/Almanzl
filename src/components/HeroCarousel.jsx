// components/HeroCarousel.jsx
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CarousalImage1 from "../assets/CarousalImage1.jpg";
import CarousalImage2 from "../assets/CarousalImage2.jpg";
import CarousalImage3 from "../assets/CarousalImage3.jpg";
import { Link } from "react-router-dom";

const images = [
  {
    src: CarousalImage1,
    title: "ALL FOR YOUR HOME",
    subtitle:
      "Discover our stylish furniture and contemporary home accessories",
  },
  {
    src: CarousalImage2,
    title: "STYLISH AND MODERN",
    subtitle: "Upgrade your living space with our modern designs",
  },
  {
    src: CarousalImage3,
    title: "COMFORT MEETS STYLE",
    subtitle: "Furniture and accessories crafted for comfort and elegance",
  },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Slides */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={img.src}
            alt={img.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{img.title}</h1>
            <p className="text-lg md:text-2xl mb-6">{img.subtitle}</p>
            <Link
              to="shop"
              className="hover:text-yellow-400 bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-transform transform hover:scale-105"
            >
              Shop Now
            </Link>
          </div>
        </div>
      ))}

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition z-20"
      >
        <ChevronLeft size={28} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition z-20"
      >
        <ChevronRight size={28} />
      </button>

      {/* Carousel Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              idx === current ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
