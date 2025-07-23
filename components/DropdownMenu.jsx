"use client";
import { useState, useRef, useEffect } from "react";

export default function DropdownMenu({ button, children, align = "right" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button onClick={() => setOpen((prev) => !prev)}>{button}</button>

      {open && (
        <div
          className={`absolute z-50 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg focus:outline-none transition-opacity duration-150 ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {children}
        </div>
      )}
    </div>
  );
}
