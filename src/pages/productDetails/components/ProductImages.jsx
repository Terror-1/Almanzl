import { useEffect, useState } from "react";

export default function ImageCarousel({ product }) {
  const images = product.images.map((image) => image.url);

  const [index, setIndex] = useState(0);

  const moveSlide = (dir) => {
    const newIndex = (index + dir + images.length) % images.length;
    setIndex(newIndex);
  };

  useEffect(() => {
    const timer = setInterval(() => moveSlide(1), 4000);
    return () => clearInterval(timer);
  });

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden  shadow-xl">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((url, i) => (
          <div key={i} className="min-w-full">
            <img
              src={url}
              alt={`Slide ${i + 1}`}
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>
        ))}
      </div>

      <button
        onClick={() => moveSlide(-1)}
        className="cursor-pointer absolute top-1/2 left-4 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition"
      >
        &#10094;
      </button>

      <button
        onClick={() => moveSlide(1)}
        className="cursor-pointer absolute top-1/2 right-4 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition"
      >
        &#10095;
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 bg-black/40 px-3 py-2 rounded-full">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === index ? "bg-gray-800 scale-110" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
