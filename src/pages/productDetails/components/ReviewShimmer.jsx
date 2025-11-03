function ReviewShimmer() {
  return (
    <div className="my-5 animate-pulse">
      <div className="flex items-center me-auto">
        <div className="h-12 w-12 rounded-full bg-gray-300"></div>

        <div className="h-4 w-24 ms-2 bg-gray-300 rounded"></div>
      </div>

      <div className="mt-3 space-y-2">
        <div className="h-3 w-full bg-gray-300 rounded"></div>
        <div className="h-3 w-11/12 bg-gray-300 rounded"></div>
        <div className="h-3 w-10/12 bg-gray-300 rounded"></div>
        <div className="h-3 w-9/12 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}

export default ReviewShimmer;
