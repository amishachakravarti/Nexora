export function Card({ className = "", children, ...props }) {
  return (
    <div
      className={`rounded-lg border text-white bg-black shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
