"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { CartItem, CartContextType } from "@/types";

// ─── Context ─────────────────────────────────────────────────────────────────

const CartContext = createContext<CartContextType | null>(null);

// ─── Provider ────────────────────────────────────────────────────────────────

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCartState] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [toastMsg, setToastMsg] = useState("");

    // Load cart from localStorage on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem("auraCart");
            if (saved) setCartState(JSON.parse(saved));
        } catch (e) {
            console.error("Failed to load cart:", e);
        }
    }, []);

    // Persist cart to localStorage on change
    useEffect(() => {
        localStorage.setItem("auraCart", JSON.stringify(cart));
    }, [cart]);

    // ── Actions ──────────────────────────────────────────────────────────────

    const showToast = useCallback((msg: string) => {
        setToastMsg(msg);
        setTimeout(() => setToastMsg(""), 2800);
    }, []);

    const addToCart = useCallback((id: string, name: string, price: number, image?: string) => {
        setCartState(prev => {
            const existing = prev.find(item => item.id === id);
            if (existing) {
                return prev.map(item => item.id === id ? { ...item, qty: item.qty + 1 } : item);
            }
            return [...prev, { id, name, price, image, qty: 1 }];
        });
        showToast(`✓ ${name} added to cart`);
        setIsCartOpen(true);
    }, [showToast]);

    const removeFromCart = useCallback((id: string) => {
        setCartState(prev => prev.filter(item => item.id !== id));
    }, []);

    const updateQty = useCallback((id: string, qty: number) => {
        if (qty <= 0) {
            setCartState(prev => prev.filter(item => item.id !== id));
        } else {
            setCartState(prev => prev.map(item => item.id === id ? { ...item, qty } : item));
        }
    }, []);

    const clearCart = useCallback(() => setCartState([]), []);

    const setCart = useCallback((newCart: CartItem[]) => setCartState(newCart), []);

    const openCart = useCallback(() => setIsCartOpen(true), []);
    const closeCart = useCallback(() => setIsCartOpen(false), []);

    const toggleWishlist = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        const btn = e.currentTarget;
        if (btn.classList.contains("active")) {
            btn.classList.remove("active");
            btn.innerHTML = "♡";
        } else {
            btn.classList.add("active");
            btn.innerHTML = "♥";
            showToast("♥ Added to Wishlist");
        }
    }, [showToast]);

    // ── Derived ──────────────────────────────────────────────────────────────

    const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
    const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    return (
        <CartContext.Provider value={{
            cart,
            isCartOpen,
            toastMsg,
            cartCount,
            cartTotal,
            addToCart,
            removeFromCart,
            updateQty,
            clearCart,
            setCart,
            openCart,
            closeCart,
            showToast,
            toggleWishlist,
        }}>
            {children}
        </CartContext.Provider>
    );
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
    return ctx;
}
