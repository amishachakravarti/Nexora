export default function Button({
  children,
  variant = "default",
  size = "default",
  className = "",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-md";

  const variants = {
    default: "",
    outline: "border border-gray-300",
    ghost: "bg-transparent",
  };

  const sizes = {
    default: "h-10 px-4 py-2 text-sm",
    lg: "h-11 px-6 text-base",
    sm: "h-9 px-3 text-sm",
  };

  return (
    <button
      className={`${baseStyles} ${sizes[size] || ""} ${variants[variant] || ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
