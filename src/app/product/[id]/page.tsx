"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, ShoppingBag, Heart, Star, ShieldCheck, RotateCcw } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import { useCart } from "@/context/CartContext";
import data from "@/assets/data.json";
import AnnouncementBar from "@/components/AnnouncementBar";
import { Product } from "@/types";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart: ctxAddToCart, openCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const found = data.products.find(p => p.id === id);
    if (found) setProduct(found);
  }, [id]);

  const addToCart = () => {
    if (!product) return;
    for (let i = 0; i < qty; i++) {
      ctxAddToCart(product.id, product.name, product.price, product.image);
    }
  };

  const buyNow = () => {
    if (!product) return;
    addToCart();
    router.push('/checkout');
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center font-sans">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#fdb61b] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading exquisite details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans flex flex-col relative overflow-hidden">
      <AnnouncementBar />
      {/* Absolute Header Overlay */}
      <Header
        isMobileNavOpen={isMobileNavOpen}
        setIsMobileNavOpen={setIsMobileNavOpen}
      />


      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 lg:px-6 py-8 md:py-16">

        {/* Breadcrumb */}
        <div className="mb-8 mt-20">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#fdb61b] transition-colors group">
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="uppercase tracking-widest font-semibold">Back to Collections</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 relative">

          {/* Image Gallery Column */}
          <div className="relative group">
            <div className="aspect-[4/5] bg-gray-50 rounded-2xl md:rounded-[40px] border border-gray-100 relative overflow-hidden flex items-center justify-center p-8">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-8 hover:scale-105 transition-transform duration-700"
              />
              {product.badge && (
                <div className="absolute top-6 left-6 bg-[#fdb61b] text-black text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full shrink-0 shadow-sm">
                  {product.badge}
                </div>
              )}
            </div>
          </div>

          {/* Details Column */}
          <div className="flex flex-col justify-center">

            <div className="mb-6">
              <span className="text-[#fdb61b] text-xs font-bold tracking-[0.2em] uppercase mb-3 block">Aura Sentiments Exclusive</span>
              <h1 className="font-sans text-4xl md:text-5xl text-gray-900 font-extrabold mb-4 leading-tight">{product.name}</h1>
              <div className="flex items-center gap-3 text-sm">
                <div className="flex text-[#fdb61b]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} fill={i < product.rating ? "currentColor" : "none"} />
                  ))}
                </div>
                <span className="text-gray-500">({product.reviews} reviews)</span>
              </div>
            </div>

            <div className="flex items-end gap-4 mb-8">
              <span className="text-3xl md:text-4xl font-sans font-bold text-gray-900">PKR {product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through mb-1">PKR {product.originalPrice.toLocaleString()}</span>
              )}
            </div>

            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8">
              A masterfully crafted attar, featuring {product.notes.toLowerCase()}. Long-lasting and alcohol-free, designed for those who command the room.
            </p>

            <div className="border border-gray-100 rounded-xl p-4 md:p-6 mb-8 bg-gray-50">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-[#fdb61b]" size={24} />
                  <div>
                    <span className="block text-gray-900 text-xs font-bold uppercase tracking-wider">Premium Quality</span>
                    <span className="block text-gray-500 text-[10px] uppercase">100% Non-Alcoholic</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw className="text-[#fdb61b]" size={24} />
                  <div>
                    <span className="block text-gray-900 text-xs font-bold uppercase tracking-wider">Easy Returns</span>
                    <span className="block text-gray-500 text-[10px] uppercase">7 Day Policy</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <div className="flex items-center border border-gray-200 rounded-lg bg-white h-14 shrink-0 sm:w-32 overflow-hidden">
                <button
                  className="px-4 text-gray-400 hover:text-black hover:bg-gray-100 transition-colors h-full flex items-center"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                >−</button>
                <div className="flex-1 text-center font-bold text-gray-900">{qty}</div>
                <button
                  className="px-4 text-gray-400 hover:text-black hover:bg-gray-100 transition-colors h-full flex items-center"
                  onClick={() => setQty(qty + 1)}
                >+</button>
              </div>

              <div className="flex flex-col sm:flex-row flex-1 gap-4">
                <button
                  onClick={addToCart}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#c9a84c] to-[#fdb61b] text-[#111111] font-bold uppercase tracking-widest text-sm h-14 rounded-lg hover:brightness-110 transition-all shadow-[0_4px_20px_rgba(201,168,76,0.35)] p-4"
                >
                  <ShoppingBag size={18} />
                  Add to Cart
                </button>

                <button
                  onClick={buyNow}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#fdb61b] text-black font-bold uppercase tracking-widest text-sm h-14 rounded-lg transition-all hover:bg-[#e8c97a] hover:-translate-y-0.5 shadow-sm p-4"
                >
                  Buy It Now
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>

      <CartSidebar />
      <Footer />
    </div>
  );
}
