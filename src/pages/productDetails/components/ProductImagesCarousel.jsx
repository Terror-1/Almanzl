import { useEffect, useState, useRef, useCallback } from "react";

export default function ProductImagesCarousel({ product }) {
  const images = product?.images?.map((image) => image.url) || [];
  const [index, setIndex] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const startX = useRef(0);

  const moveSlide = useCallback(
    (dir) => {
      if (!images.length) return;
      const newIndex = (index + dir + images.length) % images.length;
      setIndex(newIndex);
    },
    [index, images.length]
  );

  useEffect(() => {
    if (isPreviewOpen || images.length <= 1) return;
    const timer = setInterval(() => moveSlide(1), 4000);
    return () => clearInterval(timer);
  }, [index, isPreviewOpen, images.length, moveSlide]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") moveSlide(-1);
      if (e.key === "ArrowRight") moveSlide(1);
      if (e.key === "Escape") setIsPreviewOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [index, moveSlide]);

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX.current - endX;
    if (diff > 50) moveSlide(1);
    if (diff < -50) moveSlide(-1);
  };

  return (
    <>
      <div className="relative w-full max-w-4xl overflow-hidden shadow-xl bg-gray-800">
        {images.length > 0 ? (
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {images.map((url, i) => (
              <div key={i} className="min-w-full">
                <img
                  src={url}
                  alt={`Slide ${i + 1}`}
                  loading="lazy"
                  className="w-full h-64 md:h-96 object-contain cursor-pointer"
                  onClick={() => setIsPreviewOpen(true)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full h-64 md:h-96 flex items-center justify-center bg-gray-100 text-gray-500">
            No images available
          </div>
        )}

        {images.length > 1 && (
          <>
            <button
              onClick={() => moveSlide(-1)}
              className="cursor-pointer absolute top-1/2 left-4 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition"
              aria-label="Previous image"
            >
              &#10094;
            </button>

            <button
              onClick={() => moveSlide(1)}
              className="cursor-pointer absolute top-1/2 right-4 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition"
              aria-label="Next image"
            >
              &#10095;
            </button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 bg-black/40 px-3 py-2 rounded-full">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to image ${i + 1}`}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i === index ? "bg-gray-800 scale-110" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {isPreviewOpen && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 cursor-pointer animate-fadeIn"
          onClick={() => setIsPreviewOpen(false)}
        >
          <img
            src={images[index]}
            alt="Preview"
            className="max-w-[90%] max-h-[90%] object-contain shadow-lg transform transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
    </>
  );
}
