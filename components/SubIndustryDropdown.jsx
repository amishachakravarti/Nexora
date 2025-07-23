"use client";
import { useState } from "react";

export default function SubIndustryDropdown({ options, selected, onSelect }) {
  const [open, setOpen] = useState(false);
  const selectedName = selected || "Select your specialization";

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full bg-transparent text-left border border-gray-600 text-white rounded-md p-2 flex justify-between items-center"
      >
        <span>{selectedName}</span>
        <svg className="w-4 h-4 text-white ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <ul className="absolute z-10 mt-1 w-full bg-black border border-gray-600 rounded-md max-h-60 overflow-y-auto shadow-md">
          {options.map((sub) => (
            <li
              key={sub}
              className="px-4 py-2 text-sm text-white hover:bg-gray-700 cursor-pointer"
              onClick={() => {
                onSelect(sub);
                setOpen(false);
              }}
            >
              {sub}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
