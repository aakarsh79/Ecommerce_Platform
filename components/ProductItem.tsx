// *********************
// Role of the component: Product item component 
// Name of the component: ProductItem.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <ProductItem product={product} color={color} />
// Input parameters: { product: Product; color: string; }
// Output: Product item component that contains product image, title, link to the single product page, price, button...
// *********************

import Image from "next/image";
import React from "react";
import { formatINR } from "@/lib/currency";
import Link from "next/link";

import { sanitize } from "@/lib/sanitize";

const ProductItem = ({
  product,
  color,
}: {
  product: Product;
  color: string;
}) => {
  return (
    <div className="flex flex-col items-center gap-y-2 w-full">
      <Link href={`/product/${product.slug}`} className="w-full flex justify-center">
        <div className="w-full h-[200px] sm:h-[220px] md:h-[240px] lg:h-[260px] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
          <Image
            src={
              product.mainImage
                ? `/${product.mainImage}`
                : "/product_placeholder.jpg"
            }
            width={260}
            height={260}
            sizes="(max-width: 640px) 200px, (max-width: 768px) 220px, (max-width: 1024px) 240px, 260px"
            className="w-full h-full object-contain p-3 sm:p-4"
            alt={sanitize(product?.title) || "Product image"}
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//9k="
          />
        </div>
      </Link>
      <Link
        href={`/product/${product.slug}`}
        className={
          color === "black"
            ? `text-sm sm:text-base md:text-lg text-black font-normal mt-2 uppercase text-center line-clamp-2 hover:text-orange-600 transition-colors`
            : `text-sm sm:text-base md:text-lg text-white font-normal mt-2 uppercase text-center line-clamp-2 hover:text-orange-400 transition-colors`
        }
      >
        {sanitize(product.title)}
      </Link>
      <p
        className={
          color === "black"
            ? "text-base sm:text-lg text-black font-semibold"
            : "text-base sm:text-lg text-white font-semibold"
        }
      >
        {formatINR(product?.price || 0)}
      </p>
      <Link
        href={`/product/${product?.slug}`}
        className="block flex justify-center items-center w-full uppercase bg-orange-500 px-2 py-2 text-xs sm:text-sm border border-orange-600 font-semibold text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 transition-colors rounded"
      >
        <p>View product</p>
      </Link>
    </div>
  );
};

export default ProductItem;
