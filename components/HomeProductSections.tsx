// *********************
// Role: Organized product sections for homepage
// Groups all product sections in one clean component
// *********************

import React from "react";
import ProductsSection from "./ProductsSection";

// Product section configuration - all in one place
// Limit set to show only 1 row (8-12 products depending on screen size)
const PRODUCT_SECTIONS = [
  { title: "Featured Products", category: undefined, limit: 12 },
  { title: "Smart Phones", category: "smart-phones", limit: 12 },
  { title: "Laptops", category: "laptops", limit: 12 },
  { title: "Earbuds", category: "earbuds", limit: 12 },
  { title: "Headphones", category: "headphones", limit: 12 },
  { title: "Tablets", category: "tablets", limit: 12 },
  { title: "Smart Watches", category: "watches", limit: 12 },
  { title: "More Products", category: undefined, limit: 15 },
] as const;

const HomeProductSections = () => {
  return (
    <section className="product-sections">
      {PRODUCT_SECTIONS.map((section, index) => {
        const isLast = index === PRODUCT_SECTIONS.length - 1;
        // Alternate background colors for visual separation, last section gets special styling
        const bgClass = isLast 
          ? "bg-gradient-to-b from-gray-100 to-orange-50 border-t-4 border-orange-500 shadow-lg" 
          : index % 2 === 0 ? "bg-white" : "bg-gray-50";
        
        return (
          <div key={`${section.title}-${index}`} className={bgClass}>
            <ProductsSection 
              title={section.title}
              limit={section.limit} 
              category={section.category}
            />
          </div>
        );
      })}
    </section>
  );
};

export default HomeProductSections;

