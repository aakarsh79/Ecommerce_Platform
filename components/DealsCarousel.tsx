"use client";
import React from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type Deal = {
  id: string;
  title: string;
  image: string;
  price: number;
  mrp?: number;
};

const sampleDeals: Deal[] = [
  { id: "1", title: "Wireless Earbuds", image: "/earbuds 1.png", price: 1299, mrp: 1999 },
  { id: "2", title: "Smart Phone", image: "/smart phone 1.png", price: 899, mrp: 1299 },
  { id: "3", title: "Laptop", image: "/laptop 1.webp", price: 1499, mrp: 2199 },
  { id: "4", title: "Party Speaker", image: "/sony speaker image.png", price: 16990, mrp: 24990 },
  { id: "5", title: "Headphones", image: "/headphones 1.png", price: 268, mrp: 1200 },
];

function DealsCarousel() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  } as const;

  return (
    <section className="bg-white">
      <div className="max-w-screen-2xl mx-auto px-6 py-10">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Deals you might like</h3>
        <Slider {...settings}>
          {sampleDeals.map((deal) => (
            <div key={deal.id} className="px-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden h-full">
                <div className="relative w-full h-56">
                  <Image 
                    src={deal.image} 
                    alt={deal.title} 
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-800 line-clamp-2 h-10">{deal.title}</p>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-orange-600 font-semibold">₹{deal.price.toLocaleString('en-IN')}</span>
                    {deal.mrp && (
                      <span className="text-gray-400 line-through text-sm">₹{deal.mrp.toLocaleString('en-IN')}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default DealsCarousel;


