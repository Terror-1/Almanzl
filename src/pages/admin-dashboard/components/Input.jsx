export const Input = ({ label, className = "", ...props }) => {
  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <input
        className={`w-full border border-gray-300 rounded-lg px-3 py-2 text-sm
          placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500
          focus:border-transparent ${className}`}
        {...props}
      />
    </div>
  );
};
