export const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 
        bg-green-600 hover:bg-green-700 text-white disabled:opacity-50 
        disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
