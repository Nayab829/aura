"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, Lock } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { CartItem } from "@/types";

export default function CheckoutPage() {
  const router = useRouter();
  const { clearCart } = useCart();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("auraCart");
      if (saved) {
        setCart(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const shipping = total > 0 ? 99 : 0; // Flat PKR 99 shipping
  const finalTotal = total + shipping;

  const handleCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    setIsProcessing(true);

    try {
      const formData = new FormData(e.currentTarget);
      const contactInfo = Object.fromEntries(formData.entries());

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contactInfo,
          cart,
          total: finalTotal
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.removeItem("auraCart");
        setCart([]);
        clearCart();

        // ==========================================
        // Redirect to WhatsApp using wa.me (No Twilio needed)
        // ==========================================
        const itemsList = cart.map((item: any) => `- ${item.name} (x${item.qty})`).join('\n');

        const whatsappMessage = `🔔 *New Order Received!*\n\n*Customer:* ${contactInfo.firstName as string} ${contactInfo.lastName as string}\n*Phone:* ${contactInfo.phone as string}\n*Address:* ${contactInfo.address as string}, ${contactInfo.city as string}\n\n*Items:*\n${itemsList}\n\n*Total:* PKR ${finalTotal.toLocaleString()}`;

        // Use the environment variable for the WhatsApp number (fallback provided just in case)
        const adminWhatsAppNumber = process.env.NEXT_PUBLIC_ADMIN_WHATSAPP_NUMBER || "923360303003";
        const whatsappUrl = `https://wa.me/${adminWhatsAppNumber}?text=${encodeURIComponent(whatsappMessage)}`;

        // Pass demo URLs via query string for demonstration
        const queryParams = new URLSearchParams();
        if (data.userEmailUrl) queryParams.append("userEmailUrl", data.userEmailUrl);
        if (data.adminEmailUrl) queryParams.append("adminEmailUrl", data.adminEmailUrl);
        queryParams.append("whatsappUrl", whatsappUrl);

        router.push("/order-confirmation?" + queryParams.toString());
      } else {
        alert("Sorry, could not process your order at this time.");
      }
    } catch (e) {
      console.error(e);
      alert("Something went wrong");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col">

      {/* Mini 6543 Header */}
      <header className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-6 flex items-center justify-between">
          <Link href="/" className="text-gray-900 font-sans font-bold text-xl tracking-widest uppercase">
            Aura Sentiments
          </Link>
          <div className="flex items-center gap-2 text-gray-400 text-sm font-medium tracking-wide">
            <Lock size={16} />
            <span>Secure Checkout</span>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 lg:px-6 py-10 lg:py-16">

        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors group">
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="uppercase tracking-widest font-semibold">Return to Store</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Left: Contact & Shipping Form */}
          <div className="lg:col-span-7">
            <form id="checkout-form" onSubmit={handleCheckout} className="space-y-10">

              {/* Contact section */}
              <section>
                <div className="flex items-end justify-between mb-4">
                  <h2 className="text-xl font-bold font-sans text-gray-900">Contact Information</h2>
                </div>
                <div className="space-y-4">
                  <input
                    name="email"
                    type="email"
                    placeholder="Email or mobile phone number"
                    required
                    className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-1 focus:ring-[#fdb61b] focus:border-[#fdb61b] block p-4 outline-none transition-colors"
                  />
                  <label className="flex items-center gap-3 text-sm text-gray-500 cursor-pointer">
                    <input type="checkbox" className="form-checkbox bg-white border-gray-300 text-[#fdb61b] rounded" />
                    <span>Keep me up to date on news and exclusive offers</span>
                  </label>
                </div>
              </section>

              {/* Shipping Section */}
              <section>
                <h2 className="text-xl font-bold font-sans text-gray-900 mb-4">Shipping Address</h2>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    name="firstName"
                    type="text"
                    placeholder="First name"
                    required
                    className="col-span-1 bg-white border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-1 focus:ring-[#fdb61b] focus:border-[#fdb61b] block p-4 outline-none transition-colors"
                  />
                  <input
                    name="lastName"
                    type="text"
                    placeholder="Last name"
                    required
                    className="col-span-1 bg-white border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-1 focus:ring-[#fdb61b] focus:border-[#fdb61b] block p-4 outline-none transition-colors"
                  />
                  <input
                    name="address"
                    type="text"
                    placeholder="Address"
                    required
                    className="col-span-2 bg-white border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-1 focus:ring-[#fdb61b] focus:border-[#fdb61b] block p-4 outline-none transition-colors"
                  />
                  <input
                    name="apartment"
                    type="text"
                    placeholder="Apartment, suite, etc. (optional)"
                    className="col-span-2 bg-white border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-1 focus:ring-[#fdb61b] focus:border-[#fdb61b] block p-4 outline-none transition-colors"
                  />
                  <input
                    name="city"
                    type="text"
                    placeholder="City"
                    required
                    className="col-span-1 bg-white border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-1 focus:ring-[#fdb61b] focus:border-[#fdb61b] block p-4 outline-none transition-colors"
                  />
                  <input
                    name="postalCode"
                    type="text"
                    placeholder="Postal code"
                    required
                    className="col-span-1 bg-white border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-1 focus:ring-[#fdb61b] focus:border-[#fdb61b] block p-4 outline-none transition-colors"
                  />
                  <input
                    name="phone"
                    type="tel"
                    placeholder="Phone"
                    required
                    className="col-span-2 bg-white border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-1 focus:ring-[#fdb61b] focus:border-[#fdb61b] block p-4 outline-none transition-colors"
                  />
                </div>
              </section>

              {/* Payment Section */}
              <section>
                <h2 className="text-xl font-bold font-sans text-gray-900 mb-4">Payment</h2>
                <p className="text-sm text-gray-500 mb-4">All transactions are secure and encrypted.</p>

                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="px-4 py-4 flex items-center justify-between border-b border-gray-100 bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full border-[5px] border-[#fdb61b] bg-white"></div>
                      <span className="font-semibold">Cash on Delivery (COD)</span>
                    </div>
                  </div>
                  <div className="px-4 py-8 bg-white text-center text-gray-500 text-sm">
                    Pay securely with cash upon receiving your order.
                  </div>
                </div>
              </section>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full h-14 bg-[#fdb61b] text-black font-bold uppercase tracking-widest text-sm rounded-lg hover:bg-[#c9a84c] transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? "Processing Order..." : "Complete Order"}
              </button>

            </form>
          </div>

          {/* Right: Order Summary Sidebar */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-10 bg-white border border-gray-200 rounded-2xl p-6 lg:p-8 shadow-sm">
              <h2 className="text-xl font-bold font-sans text-gray-900 mb-6">Order Summary</h2>

              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Your cart is empty.</p>
              ) : (
                <>
                  <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between items-center gap-4">
                        <div className="flex-1 flex items-center gap-3">
                          <div className="relative w-16 h-16 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-center shrink-0">
                            {/* Number Badge */}
                            <div className="absolute -top-2 -right-2 bg-gray-900 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold z-20">
                              {item.qty}
                            </div>
                            {item.image ? (
                              <div className="relative w-full h-full overflow-hidden rounded-lg">
                                <Image src={item.image} alt={item.name} fill className="object-cover z-0" />
                              </div>
                            ) : (
                              <span className="text-[10px] text-gray-400 font-bold uppercase z-10">Fragrance</span>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900 line-clamp-2">{item.name}</p>
                            <p className="text-xs text-gray-500 mt-1">50ml Extrait De Parfum</p>
                          </div>
                        </div>
                        <span className="text-sm shrink-0 font-bold">PKR {(item.price * item.qty).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-gray-100 space-y-3 text-sm">
                    <div className="flex justify-between text-gray-500 font-medium">
                      <span>Subtotal</span>
                      <span>PKR {total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-500 font-medium">
                      <span>Shipping</span>
                      <span>PKR {shipping.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-gray-200 flex justify-between items-center">
                    <span className="text-base font-bold text-gray-900 uppercase tracking-widest">Total</span>
                    <span className="text-2xl font-bold text-gray-900">PKR {finalTotal.toLocaleString()}</span>
                  </div>
                </>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
