"use client";

import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ProductCardProps } from "@/types";

export default function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  notes,
  rating,
  reviews,
  badge,
  badgeType,
}: ProductCardProps) {
  const { addToCart } = useCart();

  const renderStars = () => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span key={i}>{i < rating ? "★" : "☆"}</span>
    ));
  };

  return (
    <div className="bg-white border border-[#f0f0f0] rounded-[4px] transition-all duration-300 relative group flex flex-col">
      <Link href={`/product/${id}`} className="block">
        <div className="aspect-square bg-[#fdfdfd] overflow-hidden relative">
          <Image src={image} alt={name} width={400} height={400} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          {badge && (
            <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-[4px] text-[0.72rem] font-semibold tracking-[0.06em] z-10 ${badgeType === "sale" ? "bg-[#e74c3c] text-white" :
              badgeType === "new" ? "bg-[#121212] text-[#c9a84c] border border-[#c9a84c]" :
                "bg-[#c9a84c] text-[#121212]"
              }`}>
              {badge}
            </div>
          )}
        </div>
      </Link>

      <div className="px-2 pt-3 pb-2 flex flex-col flex-1">
        <p className="text-[0.7rem] uppercase tracking-[0.15em] text-[#7a7a7a] mb-1">Aura Sentiments</p>
        <Link href={`/product/${id}`}>
          <h3 className="text-[1rem] font-semibold text-[#111111] mb-1 leading-[1.4] hover:text-[#fdb61b] transition-colors">{name}</h3>
        </Link>
        <p className="text-[0.8rem] text-[#4d4d4d] mb-2 line-clamp-1">{notes}</p>
        <div className="flex items-center gap-3 mb-1.5">
          <span className="font-bold text-[#111111] text-[1rem]">PKR {price.toLocaleString()}</span>
          {originalPrice && <span className="line-through text-[#7a7a7a] text-[0.85rem]">PKR {originalPrice.toLocaleString()}</span>}
        </div>
        <div className="flex items-center gap-1.5 mb-3">
          <span className="text-[#c9a84c] text-[0.82rem] tracking-[1px]">{renderStars()}</span>
          <span className="text-[0.72rem] text-[#7a7a7a]">({reviews})</span>
        </div>

        {/* Add to Cart — always visible, gold border style */}
        <button
          className="mt-auto w-full flex items-center justify-center gap-2 bg-[#fdb61b] text-[#111111] h-[40px] rounded-[4px] text-sm font-bold tracking-wide hover:bg-[#c9a84c] hover:text-[#111111] transition-all duration-300"
          onClick={(e) => { e.preventDefault(); addToCart(id, name, price, image); }}
        >
          <Plus size={15} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
