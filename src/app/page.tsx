"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import ShopCategories from "@/components/ShopCategories";
import ProductCard from "@/components/ProductCard";
import CartSidebar from "@/components/CartSidebar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import data from "@/assets/data.json";

export default function Home() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Stats Counters
  const [customersCount, setCustomersCount] = useState(0);
  const [fragrancesCount, setFragrancesCount] = useState(0);
  const [yearsCount, setYearsCount] = useState(0);
  const [citiesCount, setCitiesCount] = useState(0);

  const { toastMsg, showToast } = useCart();

  // Handle Scroll (ScrollToTop button)
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Stats Counter Animation Observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateValue(setCustomersCount, 0, 100000, 2000);
          animateValue(setFragrancesCount, 0, 50, 2000);
          animateValue(setYearsCount, 0, 7, 2000);
          animateValue(setCitiesCount, 0, 15, 2000);
          observer.disconnect();
        }
      });
    }, { threshold: 0.5 });

    const statsSection = document.getElementById("stats-section");
    if (statsSection) observer.observe(statsSection);

    return () => observer.disconnect();
  }, []);

  const animateValue = (setter: Function, start: number, end: number, duration: number) => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setter(Math.floor(eased * end));
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("✓ Subscribed! Welcome to Aura Sentiments 🌙");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="relative overflow-hidden">

      <AnnouncementBar />

      <Header
        isMobileNavOpen={isMobileNavOpen}
        setIsMobileNavOpen={setIsMobileNavOpen}
      />

      <HeroSlider />

      <ShopCategories />

      {/* ========== BEST SELLERS ========== */}
      <section className="py-20 bg-white" id="best-sellers">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-[0.75rem] tracking-[0.2em] uppercase text-[#9a7a2e] mb-3">Our Top Picks</span>
            <h2 className="font-sans text-[2.5rem] md:text-[3rem] font-[800] text-[#111111] mb-5 leading-[1.1]">Best Sellers</h2>
            <p className="text-[1rem] text-[#4d4d4d] leading-[1.7] max-w-[600px] mx-auto">Loved by thousands — our most sought-after fragrances of the season</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {data.products.slice(0, 5).map(product => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                originalPrice={product.originalPrice}
                image={product.image}
                notes={product.notes}
                rating={product.rating}
                reviews={product.reviews}
                badge={product.badge}
                badgeType={product.badgeType as any}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/products" className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-[#2d2d2d] text-[#111111] rounded-[4px] text-[0.85rem] font-semibold tracking-wider uppercase transition-all duration-400 hover:border-[#c9a84c] hover:text-[#c9a84c] hover:bg-[#c9a84c]/5 hover:-translate-y-1">
              View All Best Sellers &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ========== BANNER: MEN'S ========== */}
      <section className="relative h-[450px] md:h-[550px] flex items-center overflow-hidden group" id="mens">
        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" style={{ backgroundImage: `url('${data.banners[2].image}')` }}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 lg:px-12 w-full">
          <div className="max-w-[500px]">
            <p className="text-[#c9a84c] text-[0.78rem] tracking-[0.2em] uppercase mb-4 border-l-3 border-[#c9a84c] pl-4">Exclusively For Him</p>
            <h2 className="font-sans text-[2.5rem] md:text-[3.2rem] font-light text-white leading-tight mb-6">Men's Attar<br /><em className="text-[#e8c97a] not-italic font-semibold">Collection</em></h2>
            <p className="text-white/65 text-[0.95rem] leading-[1.7] mb-8">Bold, powerful, and long-lasting — fragrances crafted for the modern man who values heritage.</p>
            <Link href="/category/men" className="inline-flex items-center justify-center px-8 py-3.5 bg-gradient-to-r from-[#c9a84c] to-[#e8c97a] text-[#0d0d0d] rounded-[4px] text-[0.9rem] font-semibold tracking-wider uppercase transition-all duration-400 hover:scale-105 shadow-[0_4px_20px_rgba(201,168,76,0.4)]">
              Explore Men's
            </Link>
          </div>
        </div>
      </section>

      {/* ========== MEN'S PRODUCTS ========== */}
      <section className="py-20 bg-[#f9f7f4]" id="mens-products">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {data.products.filter(p => p.category === 'men').map(product => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                originalPrice={product.originalPrice}
                image={product.image}
                notes={product.notes}
                rating={product.rating}
                reviews={product.reviews}
                badge={product.badge}
                badgeType={product.badgeType as any}
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/category/men" className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-[#2d2d2d] text-[#111111] rounded-[4px] text-[0.85rem] font-semibold tracking-wider uppercase transition-all duration-400 hover:border-[#c9a84c] hover:text-[#c9a84c] hover:bg-[#c9a84c]/5 hover:-translate-y-1">
              View All Men's &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ========== BANNER: WOMEN'S ========== */}
      <section className="relative h-[450px] md:h-[550px] flex items-center overflow-hidden group" id="womens">
        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" style={{ backgroundImage: `url('/images/categories/Women Fragrances Profile.jpg')` }}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 lg:px-12 w-full">
          <div className="max-w-[500px]">
            <p className="text-[#c9a84c] text-[0.78rem] tracking-[0.2em] uppercase mb-4 border-l-3 border-[#c9a84c] pl-4">Elegant & Graceful</p>
            <h2 className="font-sans text-[2.5rem] md:text-[3.2rem] font-light text-white leading-tight mb-6">Women's Attar<br /><em className="text-[#e8c97a] not-italic font-semibold">Collection</em></h2>
            <p className="text-white/65 text-[0.95rem] leading-[1.7] mb-8">Delicate, captivating, and timeless — fragrances crafted for her everyday elegance.</p>
            <Link href="/category/women" className="inline-flex items-center justify-center px-8 py-3.5 bg-gradient-to-r from-[#c9a84c] to-[#e8c97a] text-[#0d0d0d] rounded-[4px] text-[0.9rem] font-semibold tracking-wider uppercase transition-all duration-400 hover:scale-105 shadow-[0_4px_20px_rgba(201,168,76,0.4)]">
              Explore Women's
            </Link>
          </div>
        </div>
      </section>

      {/* ========== WOMEN'S PRODUCTS ========== */}
      <section className="py-20 bg-white" id="womens-products">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {data.products.filter(p => p.category === 'women').map(product => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                originalPrice={product.originalPrice}
                image={product.image}
                notes={product.notes}
                rating={product.rating}
                reviews={product.reviews}
                badge={product.badge}
                badgeType={product.badgeType as any}
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/category/women" className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-[#2d2d2d] text-[#111111] rounded-[4px] text-[0.85rem] font-semibold tracking-wider uppercase transition-all duration-400 hover:border-[#c9a84c] hover:text-[#c9a84c] hover:bg-[#c9a84c]/5 hover:-translate-y-1">
              View All Women's &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ========== BANNER: TESTERS ========== */}
      <section className="relative h-[450px] md:h-[550px] flex items-center overflow-hidden group" id="testers">
        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" style={{ backgroundImage: `url('/images/categories/Aura Testers Profile.jpg')` }}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 lg:px-12 w-full">
          <div className="max-w-[500px]">
            <p className="text-[#c9a84c] text-[0.78rem] tracking-[0.2em] uppercase mb-4 border-l-3 border-[#c9a84c] pl-4">Try Before You Commit</p>
            <h2 className="font-sans text-[2.5rem] md:text-[3.2rem] font-light text-white leading-tight mb-6">Aura Testers<br /><em className="text-[#e8c97a] not-italic font-semibold">Collection</em></h2>
            <p className="text-white/65 text-[0.95rem] leading-[1.7] mb-8">Discover your next signature scent with our cost-effective, high-quality tester vials.</p>
            <Link href="/category/testers" className="inline-flex items-center justify-center px-8 py-3.5 bg-gradient-to-r from-[#c9a84c] to-[#e8c97a] text-[#0d0d0d] rounded-[4px] text-[0.9rem] font-semibold tracking-wider uppercase transition-all duration-400 hover:scale-105 shadow-[0_4px_20px_rgba(201,168,76,0.4)]">
              Explore Testers
            </Link>
          </div>
        </div>
      </section>

      {/* ========== TESTERS PRODUCTS ========== */}
      <section className="py-20 bg-[#f9f7f4]" id="testers-products">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {data.products.filter(p => p.category === 'testers').map(product => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                originalPrice={product.originalPrice}
                image={product.image}
                notes={product.notes}
                rating={product.rating}
                reviews={product.reviews}
                badge={product.badge}
                badgeType={product.badgeType as any}
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/category/testers" className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-[#2d2d2d] text-[#111111] rounded-[4px] text-[0.85rem] font-semibold tracking-wider uppercase transition-all duration-400 hover:border-[#c9a84c] hover:text-[#c9a84c] hover:bg-[#c9a84c]/5 hover:-translate-y-1">
              View All Testers &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ========== GIFT SECTION ========== */}
      <section className="py-24 bg-[#f9f7f4]" id="gift">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <span className="inline-block text-[0.75rem] tracking-[0.2em] uppercase text-[#c9a84c] mb-3">Corporate Gifting</span>
            <h2 className="font-sans text-[2.5rem] md:text-[3rem] font-extrabold text-[#111111] leading-[1.1] mb-5">Want to Gift<br />Your Employees?</h2>
            <p className="text-[#4d4d4d] text-[1.1rem] leading-[1.7] mb-6">Make your corporate events unforgettable with our premium attar gift sets — beautifully packaged, elegantly presented, and deeply appreciated.</p>
            <ul className="space-y-0">
              <li className="text-[#4d4d4d] text-[0.95rem] py-2.5 border-b border-black/5">✓ Bulk pricing available</li>
              <li className="text-[#4d4d4d] text-[0.95rem] py-2.5 border-b border-black/5">✓ Custom branding on packaging</li>
              <li className="text-[#4d4d4d] text-[0.95rem] py-2.5 border-b border-black/5">✓ Dedicated account manager</li>
              <li className="text-[#4d4d4d] text-[0.95rem] py-2.5 border-b border-black/5">✓ Nationwide delivery</li>
            </ul>
            <button className="inline-flex items-center justify-center px-8 py-3.5 bg-gradient-to-r from-[#c9a84c] to-[#e8c97a] text-[#0d0d0d] rounded-[4px] text-[0.9rem] font-semibold tracking-wider uppercase transition-all duration-400 hover:scale-105 shadow-[0_4px_20px_rgba(201,168,76,0.4)] mt-8">
              Get a Quote
            </button>
          </div>
          <div className="hidden md:block overflow-hidden rounded-[20px] shadow-2xl">
            <Image src="/images/products/9 Testers Main.jpg" alt="Premium Gift Sets" width={600} height={400} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
          </div>
        </div>
      </section>

      {/* ========== STATS SECTION ========== */}
      <section className="bg-[#111111] py-20" id="stats-section">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-6 grid grid-cols-2 lg:grid-cols-4">
          <div className="text-center p-5 border-r border-white/10">
            <div className="font-sans text-[2.5rem] md:text-[3.5rem] font-extrabold text-[#c9a84c] leading-none mb-2">{customersCount > 90000 ? '100000+' : customersCount}</div>
            <div className="text-[0.85rem] uppercase tracking-[0.15em] text-white/60 font-semibold">Happy Customers</div>
          </div>
          <div className="text-center p-5 border-r border-white/10">
            <div className="font-sans text-[2.5rem] md:text-[3.5rem] font-extrabold text-[#c9a84c] leading-none mb-2">{fragrancesCount}{fragrancesCount === 50 ? '+' : ''}</div>
            <div className="text-[0.85rem] uppercase tracking-[0.15em] text-white/60 font-semibold">Unique Fragrances</div>
          </div>
          <div className="text-center p-5 border-r border-white/10">
            <div className="font-sans text-[2.5rem] md:text-[3.5rem] font-extrabold text-[#c9a84c] leading-none mb-2">{yearsCount}{yearsCount === 7 ? '+' : ''}</div>
            <div className="text-[0.85rem] uppercase tracking-[0.15em] text-white/60 font-semibold">Years of Excellence</div>
          </div>
          <div className="text-center p-5 border-r-0">
            <div className="font-sans text-[2.5rem] md:text-[3.5rem] font-extrabold text-[#c9a84c] leading-none mb-2">{citiesCount}{citiesCount === 15 ? '+' : ''}</div>
            <div className="text-[0.85rem] uppercase tracking-[0.15em] text-white/60 font-semibold">Cities Covered</div>
          </div>
        </div>
      </section>

      {/* ========== NEWSLETTER ========== */}
      <section className="bg-[#f9f7f4] py-24 border-y border-black/5">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-6 flex flex-col md:flex-row items-center gap-16 justify-between">
          <div className="text-center md:text-left">
            <h2 className="font-serif text-[2.5rem] text-[#111111] mb-4">Stay in the Know</h2>
            <p className="text-[#4d4d4d] text-[1.1rem]">Subscribe for exclusive offers, new arrivals, and fragrance stories delivered to your inbox.</p>
          </div>
          <form className="flex flex-col sm:flex-row gap-3 w-full max-w-[500px]" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 h-[54px] px-6 py-3 bg-white border border-black/10 rounded-[4px] text-[#111111] outline-none focus:border-[#c9a84c] transition-colors"
              required
            />
            <button type="submit" className="inline-flex items-center justify-center px-8 py-3.5 bg-gradient-to-r from-[#c9a84c] to-[#e8c97a] text-[#0d0d0d] rounded-[4px] text-[0.9rem] font-semibold tracking-wider uppercase transition-all duration-400 hover:scale-105 shadow-[0_4px_20px_rgba(201,168,76,0.4)]">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <Footer />

      <CartSidebar />

      {/* ========== TOAST ========== */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[500] bg-[#111111] text-white text-sm font-medium px-6 py-3.5 rounded-full shadow-2xl transition-all duration-300 whitespace-nowrap ${toastMsg ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        {toastMsg}
      </div>

      {/* ========== SCROLL TOP ========== */}
      <button
        className={`fixed bottom-8 right-8 z-[400] w-12 h-12 bg-gradient-to-br from-[#c9a84c] to-[#e8c97a] text-[#111] rounded-full shadow-lg flex items-center justify-center text-xl font-bold hover:scale-110 transition-all duration-300 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        ↑
      </button>

    </div>
  );
}
