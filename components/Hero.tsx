// *********************
// Role of the component: Classical hero component on home page
// Name of the component: Hero.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <Hero />
// Input parameters: no input parameters
// Output: Classical hero component with two columns on desktop and one column on smaller devices
// *********************

"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const watchTransform = `translateY(${scrollY * 0.8}px) rotate(${scrollY * 0.15}deg) scale(${1 + scrollY * 0.0005})`;

  return (
    <div className="h-[500px] sm:h-[600px] md:h-[650px] w-full bg-gradient-to-r from-orange-500 to-orange-600 relative overflow-hidden">
      <div className="grid grid-cols-2 items-center justify-items-center px-4 sm:px-6 md:px-8 lg:px-10 gap-x-6 md:gap-x-10 max-w-screen-2xl mx-auto h-full max-lg:grid-cols-1 max-lg:py-6 sm:max-lg:py-8 max-lg:gap-y-6">
        <div className="flex flex-col gap-y-3 sm:gap-y-4 max-lg:order-last z-10 text-center max-lg:text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl text-white font-bold mb-2">
            Latest Electronics at Best Prices
          </h1>
          <p className="text-white text-sm sm:text-base md:text-lg px-2">
            Discover the latest smartphones, laptops, and electronics with exclusive deals and fast delivery.
          </p>
          <div className="flex gap-x-2 sm:gap-x-3 max-lg:flex-col max-lg:gap-y-2 mt-4 justify-center">
            <Link href="/shop" className="bg-white text-orange-600 font-semibold px-4 sm:px-6 md:px-8 py-2 sm:py-3 text-sm sm:text-base md:text-lg hover:bg-gray-100 transition-colors rounded text-center">
              Shop Now
            </Link>
            <Link href="/shop" className="bg-transparent border-2 border-white text-white font-semibold px-4 sm:px-6 md:px-8 py-2 sm:py-3 text-sm sm:text-base md:text-lg hover:bg-white hover:text-orange-600 transition-colors rounded text-center">
              Explore Deals
            </Link>
          </div>
        </div>
        <div 
          className="relative z-10 transition-transform duration-100 ease-in-out"
          style={{ transform: watchTransform }}
        >
          <Image
            src="/watch for banner.png"
            width={600}
            height={600}
            alt="smart watch"
            className="w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px] xl:w-[600px] xl:h-[600px] drop-shadow-2xl"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
