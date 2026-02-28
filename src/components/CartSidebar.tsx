"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartSidebar() {
  const { cart, isCartOpen, closeCart, removeFromCart, setCart, cartTotal, cartCount, showToast } = useCart();

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[150] transition-opacity duration-300 ${isCartOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={closeCart}
      />

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 bottom-0 w-[380px] max-w-full bg-white z-[200] shadow-2xl flex flex-col transition-transform duration-300 ease-out font-sans ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-black/8">
          <h3 className="font-sans font-bold text-[1.1rem] text-[#111111] tracking-wide">Your Cart ({cartCount})</h3>
          <button
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#f5f5f5] text-[#666] hover:text-[#111] transition-colors"
            onClick={closeCart}
          >✕</button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-[#999]">
              <p className="text-5xl mb-4">🛒</p>
              <p className="font-medium text-[#555] mb-1">Your cart is empty</p>
              <p className="text-sm mb-8">Add some fragrances to get started</p>
              <button
                className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-[#c9a84c] to-[#e8c97a] text-[#0d0d0d] rounded-[4px] text-[0.85rem] font-semibold tracking-wider uppercase hover:scale-105 transition-transform"
                onClick={closeCart}
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-1">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-4 border-b border-black/6">
                  <div className="flex items-center flex-1 pr-4 gap-3">
                    {item.image && (
                      <div className="relative w-14 h-14 bg-gray-50 rounded-md border border-gray-100 overflow-hidden shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                    )}
                    <div>
                      <strong className="block text-sm font-semibold text-[#111] mb-1">{item.name}</strong>
                      <div className="text-[#9a7a2e] font-semibold text-sm">PKR {item.price.toLocaleString()} × {item.qty}</div>
                    </div>
                  </div>
                  <button
                    className="w-7 h-7 flex items-center justify-center text-[#bbb] hover:text-red-500 hover:bg-red-50 rounded-full transition-colors text-sm"
                    onClick={() => removeFromCart(item.id)}
                  >✕</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="px-6 py-5 border-t border-black/8 bg-[#fafafa]">
            <div className="flex justify-between items-center mb-5">
              <span className="text-[#555] font-medium">Total</span>
              <strong className="font-sans font-bold text-[1.3rem] text-[#111]">PKR {cartTotal.toLocaleString()}</strong>
            </div>
            <button
              className="w-full inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#c9a84c] to-[#e8c97a] text-[#0d0d0d] rounded-[4px] text-[0.9rem] font-bold tracking-wider uppercase hover:scale-[1.02] transition-transform shadow-[0_4px_20px_rgba(201,168,76,0.4)]"
              onClick={() => {
                showToast("🎉 Redirecting to checkout...");
                setTimeout(() => { setCart([]); closeCart(); }, 1500);
              }}
            >
              <Link href="/checkout">Proceed to Checkout</Link>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
