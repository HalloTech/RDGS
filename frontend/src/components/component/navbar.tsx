import Link from "next/link";
import { useState } from "react";
import { MountainIcon, ShoppingCart, User, Info, Phone } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import SearchBar from "../functional/SearchBar"; // your custom search bar component
import ToggleMenuBtn from "../functional/ToggleMenuBtn"; // your existing mobile menu button
import Image from "next/image";

export default function Navbar() {
  // Temporary user and cart count - replace with your actual logic
  const user = { username: "Priya" };
  const cartItemCount = 2;

  // Top category tabs
  const topTabs = [
    { name: "WOMEN", href: "/", active: true },
    { name: "MEN", href: "/men" },
    { name: "BRIDAL", href: "/bridal" },
    { name: "LUXE", href: "/luxe" },
  ];

  // Bottom scrollable navigation categories
  const navCategories = [
    "BESTSELLERS", "SAREE", "SALWAR KAMEEZ", "LEHENGAS", "INDO WESTERN",
    "BLOUSE", "MEN", "GOWNS", "BRIDAL", "RAKSHA BANDHAN", "WEDDING",
    "READY TO SHIP", "COLLECTION", "NEW", "SALE"
  ];

  return (
    <header
  className="bg-white shadow-lg border-b border-gray-100 select-none" style={{ position: "sticky", top: 0, zIndex: 9999 }}
>
      {/* TOP TABS */}
      <div className="flex w-full items-center gap-2 px-4 pt-1 pb-2">
        {topTabs.map(tab => (
          <Link
            key={tab.name}
            href={tab.href}
            className={`py-1 px-5 text-xs font-bold tracking-widest uppercase rounded ${tab.active ? "bg-black text-white shadow" : "text-gray-600 hover:text-black"}`}
            prefetch={false}
            aria-current={tab.active ? "page" : undefined}
          >
            {tab.name}
          </Link>
        ))}

        <span className="ml-3 text-xs text-slate-600 font-semibold tracking-widest cursor-pointer hover:text-black transition">
          Find Store
        </span>
      </div>

      {/* MAIN ROW: LOGO - SEARCH - ICONS */}
      <div className="flex justify-between items-center py-2 px-4 max-w-7xl mx-auto">
        {/* Logo */}
        <Link
  href="/"
  className="flex-shrink-0 flex items-center gap-3 group"
  prefetch={false}
  aria-label="Home"
>
  <div className=" rounded-lg transition duration-300 bg-gradient-to-r from-gray-900 to-gray-700 group-hover:from-gray-800 group-hover:to-gray-600">
    <Image
      src="/images/royal_logo.png" // replace with your actual logo path
      alt="Royal DG Mart Logo"
      width={150}
      height={10}
      className="object-contain"
    />
  </div>
  {/* <div>
    <span className="text-2xl font-bold text-gray-900">ROYAL</span>
    <span className="text-xs font-bold tracking-[.25em] text-gray-500 -mt-1 block">
      DG MART
    </span>
  </div> */}
</Link>
        {/* Search Bar (desktop only) */}
        <div className="hidden lg:block flex-1 px-8">
          <SearchBar placeholder="Search for Suits, Sarees..." />
        </div>

        {/* Icons */}
        <div className="flex gap-3 items-center ml-6">
          {/* WhatsApp Icon */}
          <a href="https://wa.me/919999999999" className="rounded-full hover:bg-gray-100 p-2 transition" title="WhatsApp" target="_blank" rel="noopener noreferrer">
            <Phone className="w-6 h-6 text-gray-700" aria-hidden="true" />
            <span className="sr-only">WhatsApp</span>
          </a>

          {/* Profile Icon */}
          <Link href="/profile" className="rounded-full hover:bg-gray-100 p-1.5 transition" title="Account" prefetch={false}>
            <Avatar className="h-8 w-8 bg-gray-100 border border-gray-300">
              <AvatarImage src="/placeholder-user.jpg" alt={`${user.username}'s avatar`} />
              <AvatarFallback className="bg-gray-200 text-gray-700 font-semibold">
                {user?.username?.[0]?.toUpperCase() || <User className="w-5 h-5" />}
              </AvatarFallback>
            </Avatar>
            <span className="sr-only">User Profile</span>
          </Link>

          {/* About Us Icon */}
          <Link href="/about" title="About Us" className="rounded-full hover:bg-gray-100 p-2 transition" prefetch={false}>
            <Info className="w-6 h-6 text-gray-700" aria-hidden="true" />
            <span className="sr-only">About Us</span>
          </Link>

          {/* Cart Icon with badge */}
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
      </div>

      {/* CATEGORIES NAVIGATION (scrollable horizontal bar) */}
      <nav className="w-full border-t border-gray-100 bg-white">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide px-2 whitespace-nowrap py-1">
          {navCategories.map(cat => {
            if (cat === "MEN") {
              return (
                <Link key={cat} href="/men" prefetch={false}
                  className="mx-1 px-3 py-1 rounded-lg bg-black text-white font-bold shadow"
                  aria-current="page"
                >
                  {cat}
                </Link>
              );
            }
            if (cat === "RAKSHA BANDHAN") {
              return (
                <Link key={cat} href="/raksha-bandhan" prefetch={false}
                  className="mx-1 px-3 py-1 rounded-lg bg-orange-500 text-white font-bold shadow"
                >
                  {cat}
                </Link>
              );
            }
            if (cat === "NEW") {
              return (
                <Link key={cat} href="/new" prefetch={false}
                  className="mx-1 px-3 py-1 rounded-lg bg-amber-600 text-white font-bold"
                >
                  {cat}
                </Link>
              );
            }
            return (
              <Link key={cat} href={`/${cat.replace(/\s+/g, "-").toLowerCase()}`} prefetch={false}
                className="mx-1 px-3 py-1 rounded-md hover:bg-gray-100 text-gray-800 font-semibold text-sm transition"
              >
                {cat}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* You can add mobile menu/search here if needed */}
    </header>
  );
}
