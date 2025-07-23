"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
// import { Button } from "@/components/ui/button";
import Button from "@/components/Button";
import Link from "next/link";
import { Dancing_Script } from "next/font/google";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"], // You can adjust weights as needed
});

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="w-full pt-36 md:pt-48 pb-10">
      <div className="space-y-6 text-center">
        <div className="space-y-4 mx-auto">
          <h1 className="text-4xl  font-bold md:text-5xl lg:text-5xl xl:text-6xl  text-white">
            "Beyond Advice. Into Action."
          </h1>
          {/* gradient-title animate-gradient */}
          <p
            className={`text-xl mt-4 text-gray-300 mx-auto max-w-[600px] text-muted-foreground md:text-xl ${dancingScript.className}`}
          >
            Unlock AI-powered career tools for smarter prep, stronger resumes,
            and confident interviews.
          </p>
        </div>
        <div className="flex flex-col justify-center space-x-4 items-center">
          <Link href="/dashboard">
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 active:scale-95 active:brightness-90 text-white font-semibold text-lg py-3 px-6 rounded-xl shadow-lg transition-transform duration-200">
              Take a Tour
            </button>
          </Link>

          <p
            className={`text-2xl mt-4 text-gray-300 tracking-wide ${dancingScript.className}`}
          >
            Start small. Aim big. Land smart.
          </p>
        </div>
        <div className="hero-image-wrapper mt-5 md:mt-0">
          <div ref={imageRef} className="hero-image">
            <Image
              src="/banner.jpg"
              width={1280}
              height={720}
              alt="Dashboard Preview"
              className="rounded-lg shadow-2xl border mx-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
