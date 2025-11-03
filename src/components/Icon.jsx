function Icon({ icon, title, size = "5" }) {
  return (
    <div className="flex justify-center items-center">
      <img src={icon} alt="message" className={`me-2 h-${size} w-${size}`} />
      <span>{title}</span>
    </div>
  );
}

export default Icon;
