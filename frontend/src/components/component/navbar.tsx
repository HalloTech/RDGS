'use client'

import Link from "next/link";
import { useState, useEffect } from "react";
import { MountainIcon, ShoppingCart, User, Info, Phone, HomeIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import SearchBar from "../functional/SearchBar"; // your custom search bar component
import Image from "next/image";
import { getUserData } from "@/actions/auth";
import { getAllCarts, transferGuestCartToUser } from "@/actions/cart";
import { usePathname } from "next/navigation";
import { getCartIdentifier, getCartItemCount, clearGuestSession, getCurrentGuestSession } from "@/lib/cart-utils";

interface UserData {
  id: string;
  username: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function Navbar() {
  const [user, setUser] = useState<UserData | null>(null);
  const [cartItemCount, setCartItemCount] = useState<number>(0);
  const pathname = usePathname();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserData();
        if (userData) {
          setUser(userData);
          
          // Handle cart transfer if user just logged in and has guest cart
          const guestSessionId = getCurrentGuestSession();
          if (guestSessionId) {
            try {
              await transferGuestCartToUser(guestSessionId, userData.id);
              clearGuestSession(); // Clear guest session after successful transfer
            } catch (error) {
              console.error('Failed to transfer guest cart:', error);
            }
          }
        }
        // Always fetch cart data (for both guest and authenticated users)
        await fetchCartData(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Still try to fetch cart data for guest users
        await fetchCartData(null);
      }
    };

    fetchUserData();
  }, []);

  // Fetch cart data whenever the pathname changes (e.g., when adding items to cart)
  useEffect(() => {
    fetchCartData(user);
  }, [pathname]);
  
  // Listen for cart updates
  useEffect(() => {
    const handleCartUpdate = () => {
      fetchCartData(user);
    };
    
    window.addEventListener('cartUpdated', handleCartUpdate);
    
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, [user]);

  const fetchCartData = async (userData: UserData | null) => {
    try {
      const cartIdentifier = await getCartIdentifier(userData);
      const cartData: any = await getAllCarts(cartIdentifier);
      const totalItems = getCartItemCount(cartData);
      setCartItemCount(totalItems);
    } catch (error) {
      console.error("Error fetching cart data:", error);
      setCartItemCount(0);
    }
  };

  // Bottom scrollable navigation categories
  const navCategories = [
    "BESTSELLERS", "SAREE", "SALWAR KAMEEZ", "LEHENGAS", "INDO WESTERN",
    "BLOUSE", "MEN", "GOWNS", "BRIDAL", "RAKSHA BANDHAN", "WEDDING",
    "READY TO SHIP", "COLLECTION", "NEW", "SALE"
  ];

  const renderCategoryLink = (category: string) => {
    if (category === "SAREE") {
      return (
        <Link key={category} href="/saree" prefetch={false}
          className="mx-1 px-3 py-1 rounded-md hover:bg-gray-100 text-gray-800 font-semibold text-sm transition"
        >
          {category}
        </Link>
      );
    }
    if (category === "MEN") {
      return (
        <Link key={category} href="/men" prefetch={false}
          className="mx-1 px-3 py-1 rounded-lg bg-black text-white font-bold shadow"
          aria-current="page"
        >
          {category}
        </Link>
      );
    }
    if (category === "RAKSHA BANDHAN") {
      return (
        <Link key={category} href="/raksha-bandhan" prefetch={false}
          className="mx-1 px-3 py-1 rounded-lg bg-orange-500 text-white font-bold shadow"
        >
          {category}
        </Link>
      );
    }
    if (category === "NEW") {
      return (
        <Link key={category} href="/new" prefetch={false}
          className="mx-1 px-3 py-1 rounded-lg bg-amber-600 text-white font-bold"
        >
          {category}
        </Link>
      );
    }
    return (
      <Link key={category} href={`/${category.replace(/\s+/g, "-").toLowerCase()}`} prefetch={false}
        className="mx-1 px-3 py-1 rounded-md hover:bg-gray-100 text-gray-800 font-semibold text-sm transition"
      >
        {category}
      </Link>
    );
  };

  // Responsive mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <header
      className="bg-white shadow-lg border-b border-gray-100 select-none sticky top-0 z-50"
    >
      {/* MAIN ROW: LOGO - SEARCH - ICONS (desktop), logo + menu button (mobile) */}
      <div className="flex items-center justify-between py-2 px-2 sm:px-4 max-w-7xl mx-auto w-full">
        {/* Logo */}
        <Link
          href="/"
          className="flex-shrink-0 flex items-center gap-2 group"
          prefetch={false}
          aria-label="Home"
        >
          <div className="rounded-lg transition duration-300 bg-gradient-to-r from-gray-900 to-gray-700 group-hover:from-gray-800 group-hover:to-gray-600">
            <Image
              src="/images/royal_logo.png"
              alt="Royal DG Mart Logo"
              width={120}
              height={10}
              className="object-contain w-[100px] sm:w-[120px]"
            />
          </div>
        </Link>
        {/* Search Bar (desktop only) */}
        <div className="hidden lg:block flex-1 px-4 sm:px-8">
          <SearchBar />
        </div>
        {/* Icons (desktop only) */}
        <div className="hidden lg:flex gap-2 sm:gap-3 items-center ml-2 sm:ml-6">
          <Link href="/" className="rounded-full hover:bg-gray-100 p-2 transition" title="Home" prefetch={false}>
            <HomeIcon className="w-6 h-6 text-gray-700" aria-hidden="true" />
            <span className="sr-only">Home</span>
          </Link>
          <a href="https://wa.me/919999999999" className="rounded-full hover:bg-gray-100 p-2 transition" title="WhatsApp" target="_blank" rel="noopener noreferrer">
            <Phone className="w-6 h-6 text-gray-700" aria-hidden="true" />
            <span className="sr-only">WhatsApp</span>
          </a>
          <Link href="/profile" className="rounded-full hover:bg-gray-100 p-1.5 transition" title="Account" prefetch={false}>
            <Avatar className="h-8 w-8 bg-gray-100 border border-gray-300">
              <AvatarImage src="/placeholder-user.jpg" alt={`${user?.username}'s avatar`} />
              <AvatarFallback className="bg-gray-200 text-gray-700 font-semibold">
                {user?.username?.[0]?.toUpperCase() || <User className="w-5 h-5" />}
              </AvatarFallback>
            </Avatar>
            <span className="sr-only">User Profile</span>
          </Link>
          <Link href="/about" title="About Us" className="rounded-full hover:bg-gray-100 p-2 transition" prefetch={false}>
            <Info className="w-6 h-6 text-gray-700" aria-hidden="true" />
            <span className="sr-only">About Us</span>
          </Link>
          <Link href="/cart" className="rounded-full hover:bg-gray-100 p-2 transition relative" title="Cart" prefetch={false}>
            <ShoppingCart className="w-6 h-6 text-gray-700" aria-hidden="true" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold select-none" aria-live="polite">
                {cartItemCount > 99 ? "99+" : cartItemCount}
              </span>
            )}
            <span className="sr-only">Shopping Cart with {cartItemCount} items</span>
          </Link>
        </div>
        {/* Mobile menu button (mobile only) */}
        <button
          className="p-2 rounded-full hover:bg-gray-100 transition lg:hidden"
          aria-label="Open menu"
          onClick={() => setMobileMenuOpen(true)}
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
        </button>
      </div>

      {/* All menu content except logo in the menu drawer (mobile only) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-end justify-end lg:hidden">
          <div className="bg-white w-full max-w-xs h-full shadow-lg flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <span className="font-bold text-lg">Menu</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-full hover:bg-gray-100 transition" aria-label="Close menu">
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>
            <div className="p-4 border-b">
              <SearchBar />
            </div>
            <nav className="flex flex-col gap-2 p-4 overflow-y-auto">
              {/* Icons */}
              <Link href="/" className="flex items-center gap-2 text-gray-800 font-semibold" prefetch={false}>
                <HomeIcon className="w-5 h-5" /> Home
              </Link>
              <a href="https://wa.me/919999999999" className="flex items-center gap-2 text-gray-800 font-semibold" target="_blank" rel="noopener noreferrer">
                <Phone className="w-5 h-5" /> WhatsApp
              </a>
              <Link href="/profile" className="flex items-center gap-2 text-gray-800 font-semibold" prefetch={false}>
                <Avatar className="h-6 w-6 bg-gray-100 border border-gray-300">
                  <AvatarImage src="/placeholder-user.jpg" alt={`${user?.username}'s avatar`} />
                  <AvatarFallback className="bg-gray-200 text-gray-700 font-semibold">
                    {user?.username?.[0]?.toUpperCase() || <User className="w-4 h-4" />}
                  </AvatarFallback>
                </Avatar>
                Profile
              </Link>
              <Link href="/about" className="flex items-center gap-2 text-gray-800 font-semibold" prefetch={false}>
                <Info className="w-5 h-5" /> About Us
              </Link>
              <Link href="/cart" className="flex items-center gap-2 text-gray-800 font-semibold relative" prefetch={false}>
                <ShoppingCart className="w-5 h-5" /> Cart
                {cartItemCount > 0 && (
                  <span className="ml-2 bg-red-600 text-white text-xs rounded-full px-2 py-1 font-bold select-none">
                    {cartItemCount > 99 ? "99+" : cartItemCount}
                  </span>
                )}
              </Link>
              {/* Categories */}
              <div className="border-t pt-4 mt-4">
                {navCategories.map((cat) => (
                  <div key={cat}>{renderCategoryLink(cat)}</div>
                ))}
              </div>
            </nav>
          </div>
        </div>
      )}
      {/* Desktop categories navigation bar */}
      <nav className="w-full border-t border-gray-100 bg-white hidden lg:block">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide px-2 whitespace-nowrap py-1">
          {navCategories.map(renderCategoryLink)}
        </div>
      </nav>
    </header>
  );
}
