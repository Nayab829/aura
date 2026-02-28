"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useSearchParams } from "next/navigation";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import ProductCard from "@/components/ProductCard";
import data from "@/assets/data.json";

function ProductsContent() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q");

    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [filterCategory, setFilterCategory] = useState("all");
    const [sortBy, setSortBy] = useState("featured");

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500); // simulated loading time
        return () => clearTimeout(timer);
    }, []);

    let filteredProducts = [...data.products];

    // Apply search query filter if it exists
    if (query) {
        filteredProducts = filteredProducts.filter(p =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.category.toLowerCase().includes(query.toLowerCase()) ||
            p.notes?.toLowerCase().includes(query.toLowerCase())
        );
    }

    if (filterCategory !== "all") {
        filteredProducts = filteredProducts.filter(p => p.category === filterCategory);
    }

    if (sortBy === "price-low") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
        filteredProducts.sort((a, b) => b.rating - a.rating);
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center font-sans">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#fdb61b] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-500 font-semibold tracking-widest uppercase text-sm">Loading Collection...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-gray-50 text-gray-900 overflow-hidden font-sans">

            {/* Dark background just for header block */}
            <div className="bg-black/95">
                <Header
                    isMobileNavOpen={isMobileNavOpen}
                    setIsMobileNavOpen={setIsMobileNavOpen}
                />
                {/* Spacer for absolute header, assuming header is ~80px */}
                <div className="h-[80px] lg:h-[135px]"></div>
            </div>

            {/* Hero / Banner */}
            {/* <section className="relative w-full h-[300px] md:h-[420px] bg-black text-white flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={data.banners[0]?.image || "/images/categories/Men Fragrances Profile.jpg"}
                        alt="Shop All"
                        fill
                        className="object-cover object-center opacity-60 mix-blend-overlay"
                    />
                </div>
                <div className="relative z-10 text-center px-4">
                    <h1 className="font-sans text-4xl md:text-5xl font-extrabold uppercase tracking-widest text-white drop-shadow-lg mb-4">
                        All Products
                    </h1>
                    <p className="text-white/80 max-w-lg mx-auto text-sm md:text-base">
                        Explore our complete collection of premium fragrances curated just for you.
                    </p>
                </div>
            </section> */}

            {/* Breadcrumbs */}
            <div className="max-w-[1400px] mx-auto px-4 lg:px-6 py-6 border-b border-gray-200 mt-20">
                <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors group">
                    <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="uppercase tracking-widest font-semibold">Back to Home</span>
                </Link>
            </div>

            {/* Products Grid */}
            <section className="py-16 md:py-20 lg:py-24">
                <div className="max-w-[1400px] mx-auto px-4 lg:px-6">
                    <div className="mb-10 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold mb-2">
                                {query ? `Search results for "${query}"` : `Showing all ${filteredProducts.length} Products`}
                            </h2>
                            <div className="w-12 h-1 bg-[#fdb61b]"></div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 w-full md:w-auto">
                            {/* Filter */}
                            <div className="flex items-center gap-3">
                                <label className="text-sm font-semibold uppercase tracking-wider text-gray-500 whitespace-nowrap">Filter By:</label>
                                <select
                                    className="bg-white border border-gray-200 text-gray-900 text-sm rounded focus:ring-1 focus:ring-[#fdb61b] focus:border-[#fdb61b] py-2 px-3 outline-none transition-colors w-full cursor-pointer h-[42px]"
                                    value={filterCategory}
                                    onChange={(e) => setFilterCategory(e.target.value)}
                                >
                                    <option value="all">All Categories</option>
                                    {data.categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Sort */}
                            <div className="flex items-center gap-3">
                                <label className="text-sm font-semibold uppercase tracking-wider text-gray-500 whitespace-nowrap">Sort By:</label>
                                <select
                                    className="bg-white border border-gray-200 text-gray-900 text-sm rounded focus:ring-1 focus:ring-[#fdb61b] focus:border-[#fdb61b] py-2 px-3 outline-none transition-colors w-full cursor-pointer h-[42px]"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="featured">Featured</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="rating">Top Rated</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {filteredProducts.map((product) => (
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
                    ) : (
                        <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
                            <p className="text-gray-500 mb-6 font-semibold uppercase tracking-widest text-lg">
                                No products found.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
            <CartSidebar />
        </div>
    );
}

export default function ProductsPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center font-sans">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#fdb61b] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-500 font-semibold tracking-widest uppercase text-sm">Loading Collection...</p>
                </div>
            </div>
        }>
            <ProductsContent />
        </Suspense>
    );
}
