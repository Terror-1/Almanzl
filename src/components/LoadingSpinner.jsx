export default function LoadingSpinner({ resource }) {
  return (
    <div className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-3 flex justify-center">
      <div className="flex items-center gap-2 text-gray-300 text-sm">
        <span className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></span>
        <span>Loading {resource}...</span>
      </div>
    </div>
  );
}
