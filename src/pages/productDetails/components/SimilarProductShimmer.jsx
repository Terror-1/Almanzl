function SimilarProductShimmer() {
  return (
    <div className="animate-pulse cursor-pointer">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="mb-8 max-auto">
          <div className="w-full h-32 md:h-64 bg-gray-300 rounded-lg mb-3"></div>

          <div className="h-4 w-2/3 bg-gray-300 rounded mb-2 mx-auto"></div>

          <div className="space-y-2">
            <div className="h-3 w-full bg-gray-300 rounded mx-auto"></div>
            <div className="h-3 w-5/6 bg-gray-300 rounded mx-auto"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SimilarProductShimmer;
