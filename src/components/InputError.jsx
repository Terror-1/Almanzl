function InputError({ message, className = "" }) {
  return <p className={`text-red-500 text-sm mt ${className}`}>{message}</p>;
}

export default InputError;
