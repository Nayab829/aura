import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, User, ShoppingBag, ChevronDown, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import data from "@/assets/data.json";
import { HeaderProps, Product } from "@/types";

export default function Header({
  isMobileNavOpen,
  setIsMobileNavOpen,
}: HeaderProps) {
  const { cartCount, openCart } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const filtered = data.products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.notes?.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  return (
    <>
      <header className="absolute top-[45px] sm:top-[45px] left-0 right-0 z-[100] bg-transparent font-sans">

        {/* Row 1: Logo & Actions (Dark background) */}
        <div className="bg-black/80 backdrop-blur-sm border-b border-white/10 relative z-20">
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
                      placeholder="Search for scents..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                      className="w-full bg-white/5 text-white text-sm h-[36px] pl-4 pr-10 rounded-full focus:outline-none placeholder-gray-500 border border-white/10 focus:border-[#fdb61b]/50 transition-all"
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#fdb61b] transition-colors">
                      <Search size={18} strokeWidth={2} />
                    </button>

                    {/* Search Results Dropdown */}
                    {isSearchFocused && searchQuery.length > 1 && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl overflow-hidden z-[1000] border border-gray-100 animate-in fade-in slide-in-from-top-2 duration-300">
                        {searchResults.length > 0 ? (
                          <div className="p-2">
                            <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 px-3 py-2">Products</p>
                            {searchResults.map(product => (
                              <Link
                                key={product.id}
                                href={`/product/${product.id}`}
                                className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors group"
                                onClick={() => setSearchQuery("")}
                              >
                                <div className="relative w-12 h-12 rounded-md overflow-hidden bg-gray-100 shrink-0">
                                  <Image src={product.image} alt={product.name} fill className="object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-bold text-gray-900 truncate group-hover:text-[#fdb61b] transition-colors">{product.name}</p>
                                  <p className="text-xs text-gray-500 font-medium">PKR {product.price.toLocaleString()}</p>
                                </div>
                              </Link>
                            ))}
                            <Link
                              href={`/products?q=${searchQuery}`}
                              className="block text-center py-2 text-xs font-bold text-[#fdb61b] border-t border-gray-50 mt-1 hover:bg-gray-50 bg-[#fdb61b]/5 transition-colors"
                              onClick={() => setSearchQuery("")}
                            >
                              See all results
                            </Link>
                          </div>
                        ) : (
                          <div className="p-8 text-center">
                            <p className="text-sm text-gray-500 font-medium italic">No scents found for "{searchQuery}"</p>
                          </div>
                        )}
                      </div>
                    )}
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

      {/* ========== MOBILE NAV ========== */}
      <div
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-[150] transition-opacity duration-300 ${isMobileNavOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setIsMobileNavOpen(false)}
      ></div>

      <nav className={`fixed top-0 bottom-0 left-0 w-[300px] bg-white z-[200] border-r border-gray-200 p-6 flex flex-col transition-transform duration-300 ease-out font-sans ${isMobileNavOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between mb-8">
          <div className="text-[#fdb61b] font-sans text-xl font-bold uppercase tracking-widest">Aura</div>
          <button className="text-gray-900 hover:text-[#fdb61b] transition-colors" onClick={() => setIsMobileNavOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* Mobile Search */}
        <div className="mb-8 relative">
          <input
            type="text"
            placeholder="Search scents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 text-gray-900 text-sm h-[44px] pl-4 pr-10 rounded-lg focus:outline-none border border-gray-100 focus:border-[#fdb61b] transition-all"
          />
          <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />

          {searchQuery.length > 1 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-100 max-h-[300px] overflow-y-auto z-[250]">
              {searchResults.length > 0 ? (
                <div className="p-2">
                  {searchResults.map(product => (
                    <Link
                      key={product.id}
                      href={`/product/${product.id}`}
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-50 last:border-0"
                      onClick={() => {
                        setIsMobileNavOpen(false);
                        setSearchQuery("");
                      }}
                    >
                      <div className="relative w-10 h-10 rounded bg-gray-100 overflow-hidden shrink-0">
                        <Image src={product.image} alt={product.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900 truncate">{product.name}</p>
                        <p className="text-[10px] text-gray-500 font-medium">PKR {product.price.toLocaleString()}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center">
                  <p className="text-sm text-gray-400 italic">No results</p>
                </div>
              )}
            </div>
          )}
        </div>

        <ul className="flex flex-col gap-4 text-gray-900 uppercase tracking-widest text-xs font-semibold overflow-y-auto pr-2">
          <li><Link href="/" className="block py-3 border-b border-gray-50 hover:text-[#fdb61b] transition-colors" onClick={() => setIsMobileNavOpen(false)}>Home</Link></li>
          <li><Link href="/products" className="block py-3 border-b border-gray-50 hover:text-[#fdb61b] transition-colors" onClick={() => setIsMobileNavOpen(false)}>Shop All</Link></li>
          {data.categories.map((category) => (
            <li key={category.id}>
              <Link href={category.link} className="block py-3 border-b border-gray-50 hover:text-[#fdb61b] transition-colors" onClick={() => setIsMobileNavOpen(false)}>
                {category.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-6 border-t border-gray-100 text-gray-500 text-[10px] tracking-wider font-bold uppercase">
          <p className="mb-2">📞 +{process.env.NEXT_PUBLIC_ADMIN_WHATSAPP_NUMBER || "923360303003"}</p>
          <p>✉ {process.env.NEXT_PUBLIC_ADMIN_EMAIL || "aurasentiments@gmail.com"}</p>
        </div>
      </nav>
    </>
  );
}
