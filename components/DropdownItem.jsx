import Link from "next/link";

export default function DropdownItem({ href, icon: Icon, label }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
    >
      {Icon && <Icon className="h-4 w-4" />}
      {label}
    </Link>
  );
}
