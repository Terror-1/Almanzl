function Icon({ icon, title, size = "5", className = "" }) {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <img src={icon} alt="message" className={`me-2 h-${size} w-${size}`} />
      <span>{title}</span>
    </div>
  );
}

export default Icon;
