export default function Error({ resource, error }) {
  return (
    <div className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-3 flex justify-center">
      <div className="text-red-400 text-sm font-medium flex items-center gap-2">
        <span>
          Failed to load {resource}: {error}
        </span>
      </div>
    </div>
  );
}
