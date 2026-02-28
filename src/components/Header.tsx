"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, User, ShoppingBag, ChevronDown, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import data from "@/assets/data.json";
import { HeaderProps } from "@/types";

export default function Header({
  isMobileNavOpen,
  setIsMobileNavOpen,
}: HeaderProps) {
  const { cartCount, openCart } = useCart();
  return (
    <>
      <header className="absolute top-[45px] sm:top-[45px] left-0 right-0 z-[100] bg-transparent font-sans bg-black">

        {/* Row 1: Logo & Actions (Dark background) */}
        <div className="bg-black/95 backdrop-blur-md border-b border-white/10 relative z-20">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-6 py-2">
            <div className="flex items-center justify-between h-[80px]">

              {/* Left: Mobile Hamburger & Search */}
              <div className="flex items-center flex-1 h-full gap-4">
                <button className={`lg:hidden flex flex-col justify-center items-center w-8 h-8 relative z-50`} onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}>
                  <span className={`block w-6 h-0.5 bg-[#fdb61b] transition-transform duration-300 ${isMobileNavOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                  <span className={`block w-6 h-0.5 bg-[#fdb61b] mt-1 transition-opacity duration-300 ${isMobileNavOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                  <span className={`block w-6 h-0.5 bg-[#fdb61b] mt-1 transition-transform duration-300 ${isMobileNavOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                </button>

                <div className="hidden lg:flex items-center w-full max-w-[280px]">
                  <div className="relative w-full text-white">
                    <input
                      type="text"
                      placeholder="Search"
                      className="w-full bg-white/5 text-white text-sm h-[36px] pl-4 pr-10 rounded-full focus:outline-none placeholder-gray-500 border border-white/10"
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#fdb61b] transition-colors">
                      <Search size={18} strokeWidth={2} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Center: Logo */}
              <div className="flex-1 flex justify-center items-center shrink-0 pb-1">
                <Link href="/" className="flex flex-col items-center group cursor-pointer">
                  <div className="text-[#fdb61b] font-sans font-bold text-xl tracking-widest uppercase mt-2">Aura Sentiments</div>
                </Link>
              </div>

              {/* Right: Account & Cart */}
              <div className="flex items-center justify-end flex-1 h-full gap-6 text-white text-xs tracking-[0.15em] uppercase font-semibold">

                <button onClick={openCart} className="flex items-center gap-2 hover:text-[#fdb61b] transition-colors relative">
                  <div className="relative">
                    <ShoppingBag size={20} strokeWidth={1.8} />
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-[#fdb61b] text-black text-[10px] w-[16px] h-[16px] flex items-center justify-center rounded-full font-bold">
                        {cartCount}
                      </span>
                    )}
                  </div>
                  <span className="hidden lg:inline">Cart</span>
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Row 2: Navigation Bar (Dark overlaying hero) */}
        <div className="hidden lg:block bg-gradient-to-b from-black/80 via-black/40 to-transparent relative z-10 pt-1 pb-4">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-6 relative">
            <nav className="w-full">
              <ul className="flex justify-center items-center gap-8 py-2 w-full text-white text-xs tracking-[0.2em] uppercase font-medium">
                <li><Link href="/" className="hover:text-[#fdb61b] transition-colors py-4">Home</Link></li>

                {/* Megamenu Trigger */}
                <li className="group">
                  <Link href="/products" className="hover:text-[#fdb61b] transition-colors flex items-center gap-1 py-4 cursor-pointer">
                    SHOP <ChevronDown size={14} strokeWidth={2} className="opacity-70 group-hover:rotate-180 transition-transform" />
                  </Link>

                  {/* Megamenu Dropdown directly styled with Tailwind */}
                  <div className="absolute left-0 right-0 top-full mt-0 opacity-0 invisible translate-y-4 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-out z-[100]">
                    <div className="bg-[#0b0b0b] shadow-2xl border-t-2 border-[#fdb61b] p-8 tracking-normal normal-case text-left w-full rounded-b-lg flex gap-8">

                      {/* Column 1: Categories */}
                      <div className="flex-1">
                        <div className="mb-6">
                          <h4 className="text-[#fdb61b] text-[11px] font-bold uppercase tracking-widest mb-3">Shop By Category</h4>
                          <ul className="space-y-1">
                            {data.categories.map(category => (
                              <li key={category.id}>
                                <Link href={category.link} className="text-gray-400 hover:text-white hover:translate-x-1 transition-all text-sm block py-1">
                                  {category.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Column 2: Best Sellers */}
                      <div className="flex-1">
                        <div className="mb-6">
                          <h4 className="text-[#fdb61b] text-[11px] font-bold uppercase tracking-widest mb-3">Best Sellers</h4>
                          <ul className="space-y-1">
                            {data.products.filter(p => p.badgeType === 'bestseller' || p.rating >= 4).slice(0, 5).map(product => (
                              <li key={product.id}>
                                <Link href={`/product/${product.id}`} className="text-gray-400 hover:text-white hover:translate-x-1 transition-all text-sm block py-1">
                                  {product.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Column 3: New Arrivals & Sale */}
                      <div className="flex-1">
                        <div className="mb-6">
                          <h4 className="text-[#fdb61b] text-[11px] font-bold uppercase tracking-widest mb-3">Featured Highlights</h4>
                          <ul className="space-y-1">
                            {data.products.filter(p => p.badgeType === 'new' || p.badgeType === 'sale').slice(0, 5).map(product => (
                              <li key={product.id}>
                                <Link href={`/product/${product.id}`} className="text-gray-400 hover:text-white hover:translate-x-1 transition-all text-sm block py-1">
                                  {product.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Column 4: Promo Product */}
                      <div className="w-[300px] shrink-0 border-l border-white/10 pl-8">
                        <Link href={`/product/${data.products[0]?.id}`} className="relative group/promo block cursor-pointer h-full bg-white/5 rounded-lg overflow-hidden border border-white/10 hover:border-[#fdb61b]/30 transition-colors">
                          <div className="relative h-[200px] bg-black/40">
                            <Image src={data.products[0]?.image} alt={data.products[0]?.name} fill className="object-cover object-center group-hover/promo:scale-105 transition-transform duration-500" />
                            <span className="bg-[#fdb61b] text-black text-[10px] font-bold px-2 py-1 absolute top-2 left-2 rounded-sm shadow-sm z-10">Bestseller</span>
                          </div>
                          <div className="p-4 bg-transparent">
                            <p className="text-white text-sm font-semibold mb-1 leading-tight line-clamp-2">{data.products[0]?.name}</p>
                            <div className="flex items-center gap-1 mb-2">
                              <span className="text-[#fdb61b] text-[10px]">★★★★★</span>
                              <span className="text-gray-500 text-[10px] font-semibold">({data.products[0]?.reviews})</span>
                            </div>
                            <p className="text-[#fdb61b] text-[10px] mb-3 uppercase tracking-wider font-bold">Featured Handpick 🔥</p>
                            <div className="flex items-baseline gap-2">
                              <span className="text-white font-bold text-sm">PKR {data.products[0]?.price.toLocaleString()}</span>
                            </div>
                          </div>
                        </Link>
                      </div>

                    </div>
                  </div>
                </li>
                {data.categories.map((category) => (
                  <li key={category.id}>
                    <Link href={category.link} className="hover:text-[#fdb61b] transition-colors py-4">
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

      </header>

      {/* ========== MOBILE NAV - Converted to Tailwind ========== */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[150] transition-opacity duration-300 ${isMobileNavOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setIsMobileNavOpen(false)}
      ></div>

      <nav className={`fixed top-0 bottom-0 left-0 w-[300px] bg-white z-[200] border-r border-gray-200 p-6 flex flex-col transition-transform duration-300 ease-out font-sans ${isMobileNavOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <button className="absolute top-6 right-6 text-gray-500 hover:text-[#fdb61b] transition-colors" onClick={() => setIsMobileNavOpen(false)}>
          <X size={24} />
        </button>
        <div className="text-[#fdb61b] font-sans text-2xl font-bold uppercase tracking-widest mb-10">Aura Sentiments</div>
        <ul className="flex flex-col gap-4 text-gray-900 uppercase tracking-widest text-xs font-semibold">
          <li><Link href="/" className="block py-2 border-b border-gray-100 hover:text-[#fdb61b] transition-colors" onClick={() => setIsMobileNavOpen(false)}>Home</Link></li>
          {data.categories.map((category) => (
            <li key={category.id}>
              <Link href={category.link} className="block py-2 border-b border-gray-100 hover:text-[#fdb61b] transition-colors" onClick={() => setIsMobileNavOpen(false)}>
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-6 border-t border-gray-100 text-gray-500 text-xs">
          <p className="mb-2">📞 +92 300 123 4567</p>
          <p>✉ info@aurasentiments.com</p>
        </div>
      </nav>
    </>
  );
}
