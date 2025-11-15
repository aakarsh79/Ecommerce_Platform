// *********************
// Role of the component: products section intended to be on the home page
// Name of the component: ProductsSection.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <ProductsSection slug={slug} />
// Input parameters: no input parameters
// Output: products grid
// *********************

import React from "react";
import ProductItem from "./ProductItem";
import Heading from "./Heading";
import apiClient from "@/lib/api";

const ProductsSection = async ({ 
  limit = 12, 
  category,
  title 
}: { 
  limit?: number; 
  category?: string;
  title?: string;
}) => {
  let products = [];
  
  // Determine section title
  const sectionTitle = title || (category 
    ? `${category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')} Products`
    : "Featured Products"
  );
  
  try {
    // API now returns up to 50 products per page, so we may only need 1 page
    // But fetch 2 pages to be safe if limit is high
    const productsPerPage = 50;
    const pagesToFetch = limit > productsPerPage ? Math.ceil(limit / productsPerPage) : 1;
    const allProducts: any[] = [];
    
    // Fetch products in parallel for better performance
    const fetchPromises = [];
    for (let page = 1; page <= pagesToFetch && allProducts.length < limit; page++) {
      const url = category 
        ? `/api/products?filters[category][$equals]=${category}&page=${page}`
        : `/api/products?page=${page}`;
      fetchPromises.push(apiClient.get(url));
    }
    
    const responses = await Promise.all(fetchPromises);
    
    for (const response of responses) {
      if (response.ok && allProducts.length < limit) {
        const result = await response.json();
        if (Array.isArray(result) && result.length > 0) {
          allProducts.push(...result);
          if (allProducts.length >= limit) break;
        } else {
          break; // No more products available
        }
      }
    }
    
    products = allProducts.slice(0, limit);
    
    // If we got fewer products than expected and have a category filter,
    // try fetching all products and filtering client-side as fallback
    if (products.length < 5 && category) {
      try {
        const fallbackData = await apiClient.get(`/api/products?page=1`);
        if (fallbackData.ok) {
          const fallbackResult = await fallbackData.json();
          if (Array.isArray(fallbackResult)) {
            // Filter by category name (case-insensitive, handle hyphens)
            const categoryLower = category.toLowerCase().replace(/-/g, ' ');
            const filtered = fallbackResult.filter((p: any) => {
              const productCategory = p.category?.name?.toLowerCase().replace(/-/g, ' ') || '';
              return productCategory.includes(categoryLower) || categoryLower.includes(productCategory);
            });
            if (filtered.length > products.length) {
              products = filtered.slice(0, limit);
            }
          }
        }
      } catch (fallbackError) {
        // Ignore fallback errors
      }
    }
  } catch (error) {
    console.error('[ProductsSection] Error fetching products:', error);
    products = [];
  }

  // Show section even with fewer products, but hide if completely empty
  if (products.length === 0) {
    return null;
  }

  return (
    <div className="border-t border-gray-200">
      <div className="max-w-screen-2xl mx-auto pt-12 pb-8">
        <Heading title={sectionTitle} />
        <div className="overflow-x-auto pb-4 -mx-4 sm:-mx-6 px-4 sm:px-6 scrollbar-hide">
          <div className="flex gap-3 sm:gap-4 min-w-max">
            {products.map((product: any) => (
              <div key={product.id} className="flex-shrink-0 w-[180px] sm:w-[200px] md:w-[220px] lg:w-[240px] xl:w-[260px]">
                <ProductItem product={product} color="black" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsSection;
