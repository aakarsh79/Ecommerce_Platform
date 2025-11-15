"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaTrash } from "react-icons/fa6";
import { formatINR } from "@/lib/currency";
import { sanitize } from "@/lib/sanitize";
import { deleteWishItem } from "@/app/actions";
import { useWishlistStore } from "@/app/_zustand/wishlistStore";
import toast from "react-hot-toast";

interface WishItemProps {
  id: string;
  title: string;
  price: number;
  image: string;
  slug: string;
  stockAvailabillity: number;
}

const WishItem = ({ id, title, price, image, slug, stockAvailabillity }: WishItemProps) => {
  const { removeFromWishlist } = useWishlistStore();

  const handleDelete = async () => {
    try {
      await deleteWishItem(id);
      removeFromWishlist(id);
      toast.success("Item removed from wishlist");
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  return (
    <tr>
      <th>
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
      </th>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <Image
                width={48}
                height={48}
                src={image ? `/${image}` : "/product_placeholder.jpg"}
                alt={sanitize(title) || "Product image"}
                className="w-auto h-auto"
              />
            </div>
          </div>
        </div>
      </td>
      <td>
        <Link href={`/product/${slug}`} className="font-bold hover:text-orange-600">
          {sanitize(title)}
        </Link>
        <div className="text-sm opacity-50">{formatINR(price)}</div>
      </td>
      <td>
        {stockAvailabillity > 0 ? (
          <span className="badge badge-success text-white badge-sm">In stock</span>
        ) : (
          <span className="badge badge-error text-white badge-sm">Out of stock</span>
        )}
      </td>
      <th>
        <button
          onClick={handleDelete}
          className="btn btn-ghost btn-xs text-red-600 hover:text-red-700"
        >
          <FaTrash />
        </button>
      </th>
    </tr>
  );
};

export default WishItem;



