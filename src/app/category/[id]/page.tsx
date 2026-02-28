"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import ProductCard from "@/components/ProductCard";
import data from "@/assets/data.json";
import { Product } from "@/types";

export default function CategoryPage() {
    const params = useParams();
    const router = useRouter();

    // ensure params.id is a string, and normalize avoiding arrays
    const idValue = Array.isArray(params.id) ? params.id[0] : params.id;
    const categoryId = idValue?.toLowerCase();

    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500); // simulated loading time
        return () => clearTimeout(timer);
    }, [categoryId]);

    const category = data.categories.find(c => c.id === categoryId);
    const products = data.products.filter(p => p.category === categoryId);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center font-sans">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#fdb61b] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-500 font-semibold tracking-widest uppercase text-sm">Discovering Scents...</p>
                </div>
            </div>
        );
    }

    // You can show a loading state or default values if the category isn't loaded yet
    if (!category) {
        return (
            <div className="min-h-screen flex items-center justify-center font-sans bg-gray-50 text-gray-900">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Category not found</h1>
                    <Link href="/" className="text-[#fdb61b] hover:underline">
                        Return to Home
                    </Link>
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

            {/* Category Hero / Banner */}
            <section className="relative w-full h-[300px] md:h-[420px] bg-black text-white flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover object-center opacity-60 mix-blend-overlay"
                    />
                </div>
                <div className="relative z-10 text-center px-4">
                    <h1 className="font-sans text-4xl md:text-5xl font-extrabold uppercase tracking-widest text-white drop-shadow-lg mb-4">
                        {category.name}
                    </h1>
                    <p className="text-white/80 max-w-lg mx-auto text-sm md:text-base">
                        Explore our curated collection of {category.name.toLowerCase()} crafted to leave a lasting impression.
                    </p>
                </div>
            </section>

            {/* Breadcrumbs */}
            <div className="max-w-[1400px] mx-auto px-4 lg:px-6 py-6 border-b border-gray-200">
                <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors group">
                    <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="uppercase tracking-widest font-semibold">Back to Home</span>
                </Link>
            </div>

            {/* Products Grid */}
            <section className="py-16 md:py-20 lg:py-24">
                <div className="max-w-[1400px] mx-auto px-4 lg:px-6">
                    <div className="mb-10 flex justify-between items-end">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold mb-2">Showing all {products.length} Products</h2>
                            <div className="w-12 h-1 bg-[#fdb61b]"></div>
                        </div>
                    </div>

                    {products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {products.map((product) => (
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
                                No products found in this category.
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
