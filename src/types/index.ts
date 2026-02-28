export interface CartItem {
    id: string;
    name: string;
    price: number;
    image?: string;
    qty: number;
}

export interface CartContextType {
    // State
    cart: CartItem[];
    isCartOpen: boolean;
    toastMsg: string;

    // Derived
    cartCount: number;
    cartTotal: number;

    // Actions
    addToCart: (id: string, name: string, price: number, image?: string) => void;
    removeFromCart: (id: string) => void;
    updateQty: (id: string, qty: number) => void;
    clearCart: () => void;
    setCart: (cart: CartItem[]) => void;
    openCart: () => void;
    closeCart: () => void;
    showToast: (msg: string) => void;
    toggleWishlist: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface Product {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    notes: string;
    rating: number;
    reviews: number;
    badge?: string;
    badgeType?: "bestseller" | "sale" | "new" | string;
    category?: string;
}

export interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    notes: string;
    rating: number;
    reviews: number;
    badge?: string;
    badgeType?: "bestseller" | "sale" | "new";
}

export interface HeaderProps {
    isMobileNavOpen: boolean;
    setIsMobileNavOpen: (val: boolean) => void;
}

export interface ContactInfo {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    apartment?: string;
    city: string;
    postalCode: string;
}

export interface CheckoutData {
    contactInfo: ContactInfo;
    cart: CartItem[];
    total: number;
}
