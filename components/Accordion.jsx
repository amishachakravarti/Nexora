// components/Accordion.jsx
"use client";
import { useState } from "react";

export default function Accordion({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-2">
      {faqs.map((faq, index) => (
        <div key={index} className="border rounded-md">
          <button
            onClick={() => toggle(index)}
            className="w-full text-left px-4 py-3 bg-transparent hover:underline font-medium flex justify-between items-center"
          >
            {faq.question}
            <span>{openIndex === index ? "−" : "+"}</span>
          </button>

          {openIndex === index && (
            <div className="px-4 py-3 bg-transparent text-white border-t">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
