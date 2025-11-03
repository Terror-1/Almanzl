import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Soroush Norozy",
    title: "Designer",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus vitae congue id ipsum sed neque et dui accumsan. Nibh semper magna facilisi ridiculus luctus amet. Aliquam.",
  },
  {
    id: 2,
    name: "Emma Thompson",
    title: "Interior Stylist",
    text: "Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.",
  },
  {
    id: 3,
    name: "Michael Chen",
    title: "Furniture Craftsman",
    text: "Aenean lacinia bibendum nulla sed consectetur. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec ullamcorper nulla non metus auctor fringilla.",
  },
];

export default function ReviewsSlider() {
  const [current, setCurrent] = useState(0);

  const nextReview = () => setCurrent((prev) => (prev + 1) % reviews.length);
  const prevReview = () =>
    setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);

  useEffect(() => {
    const interval = setInterval(nextReview, 6000);
    return () => clearInterval(interval);
  }, []);

  const { name, title, text } = reviews[current];

  return (
    <section className=" py-16 relative mb-15">
      <div className=" mx-auto px-6 text-center relative">
        {/* Quote Icon */}
        <Quote className=" max-w-3xl w-10 h-10 text-gray-400 mx-auto mb-6" />

        {/* Review Text */}
        <p className="max-w-3xl mx-auto text-gray-700 text-lg leading-relaxed mb-6">
          {text}
        </p>

        {/* Author */}
        <h3 className="font-semibold text-gray-900">{name}</h3>
        <p className="text-gray-500 text-sm">{title}</p>

        {/* Navigation Arrows */}
        <button
          onClick={prevReview}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-transparent hover:bg-gray-200 p-2 rounded-full transition"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>

        <button
          onClick={nextReview}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-transparent hover:bg-gray-200 p-2 rounded-full transition"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>
      </div>
    </section>
  );
}
