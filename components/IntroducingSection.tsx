// *********************
// Role of the component: IntroducingSection with the text "Introducing ElectroMart"
// Name of the component: IntroducingSection.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <IntroducingSection />
// Input parameters: no input parameters
// Output: Section with the text "Introducing ElectroMart" and button
// *********************

import Link from "next/link";
import React from "react";

const IntroducingSection = () => {
  return (
    <div className="py-16 pt-20 bg-gradient-to-b from-gray-100 to-white border-t-4 border-orange-500 shadow-lg">
      <div className="text-center flex flex-col gap-y-5 items-center max-w-screen-2xl mx-auto px-6">
        <h2 className="text-gray-800 text-6xl font-bold text-center mb-4 max-md:text-4xl max-[480px]:text-3xl">
          Welcome to <span className="text-orange-600">ElectroMart</span>
        </h2>
        <div>
          <p className="text-gray-700 text-center text-xl font-medium max-md:text-lg max-[480px]:text-base mb-2">
            Your one-stop shop for the latest electronics
          </p>
          <p className="text-gray-600 text-center text-lg font-normal max-md:text-base max-[480px]:text-sm mb-6">
            Best deals on smartphones, laptops, and more
          </p>
          <Link href="/shop" className="inline-block bg-orange-500 text-white font-semibold px-12 py-3 text-lg hover:bg-orange-600 transition-colors max-md:text-base max-md:px-10 max-[480px]:px-8 rounded shadow-md">
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IntroducingSection;
