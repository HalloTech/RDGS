

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { JSX, SVGProps } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import LogoutBtn from "../functional/LogoutBtn";
import { dummyProducts } from "@/dummy/products";
import ToggleMenuBtn from "../functional/ToggleMenuBtn";
import { UserRound } from "lucide-react";
import ProductCard from "../functional/ProductCard";
import { getProducts } from "@/actions/product";
import { productDataGetting } from "@/types/product";
import LoadMoreProductsHome from "../functional/LoadMoreProductsHome";
// import slider from '@/../public/images/slider.jpg';
import { useState, useEffect } from "react";




export default async function Homepage({ user }: { user: any }) {
  const products: productDataGetting = await getProducts({
    limit: 10,
    page: 1,
  });

  // Transform the data to match expected structure
  const transformedProducts = products?.products?.map(product => ({
    ...product,
    name: (product as any).title, // Use title as name
    images: (product as any).image ? [(product as any).image] : [], // Convert single image to array
    thumbnail: (product as any).image, // Use image as thumbnail
  })) || [];

  const mostSellingProducts = transformedProducts.filter((product, ind) => {
    return product.most_selling_product;
  });

  const isCarousels = transformedProducts.filter(
    (product, ind) => product.carousel
  );

  const slider = [
    "https://sttylme.com/cdn/shop/articles/for-app-swarovski-saree-landscape.jpg?v=1712298765",
  ]
  
  return (
    
    <div className="flex flex-col min-h-screen overflow-x-hidden ">
      <main className="flex-1">
        {/* Carousel */}
        <Carousel className="w-full h-screen" autoScroll autoScrollInterval={5000}>
          <CarouselContent className="h-full">
            {[slider, slider, slider].map((bgImage, ind) => (
              <CarouselItem key={ind} className="basis-full">
                <div
                  className="relative w-full h-screen bg-cover bg-center flex items-center"
                  style={{ backgroundImage: `url(${bgImage})` }}
                >
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-gray-900/50 to-black/60 z-0" />
                  <div className="relative z-10 text-white p-8 rounded-md max-w-lg ml-20 backdrop-blur-sm animate-fadeInUp">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg animate-fadeInUp delay-100">
                      Discover the Latest Trends
                    </h1>
                    <p className="mb-6 text-xl md:text-2xl font-medium animate-fadeInUp delay-200">
                      Explore our curated collection of fashionable and high-quality products.
                    </p>
                    <Link
                      href="#"
                      className="inline-flex items-center justify-center rounded-full bg-white text-black px-8 py-4 font-bold text-lg shadow-lg hover:bg-gray-100 transition animate-fadeInUp delay-300"
                      prefetch={false}
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10" />
        </Carousel>

       {/* Page-1 Products */}
<section className="bg-white py-12 px-6 md:px-12">
  <div className="max-w-[1500px] mx-auto">
    <h2 className="text-2xl font-bold mb-6">New Arrivals</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {transformedProducts?.slice(0,4).map((product, ind) => {
        return <ProductCard key={product._id} product={product} />;
      })}
    </div>
  </div>
</section>

{/* CATEGORIES SECTION - Styled Like the Screenshot */}
<section className="py-16 px-4 sm:px-8 lg:px-12 bg-[#FEFBEA]">
  <div className="max-w-[1500px] mx-auto">
    {/* Section header (optional) */}
    <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
      Categories
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {/* Card 1 */}
      <div className="relative group rounded-l shadow-md overflow-hidden bg-white flex flex-col h-[450px]">
        {/* Card image (replace with real image path) */}
        <img
          src="/banners/blue-indian-outfit-with-handblocked-ikat-ajarakh-palkhi-fashion-376698.png"
          alt="24 Hr Dispatch"
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 w-full z-10 p-6">
          <div className="text-white">
            <h3 className="text-2xl font-bold mb-1 drop-shadow">24 Hr Dispatch</h3>
          </div>
          <button className="mt-3 px-5 py-2 rounded-full bg-white text-black text-base font-semibold shadow hover:bg-gray-200 transition">
            Shop Now
          </button>
        </div>
      </div>

      {/* Card 2 */}
      <div className="relative group rounded-l shadow-md overflow-hidden bg-white flex flex-col h-[450px]">
        <img
          src="/banners/DSC_2173_720x_dec1d27e-c2a7-4ce7-8b21-654c0ca12e43_1024x.png"
          alt="Wedding Wardrobe"
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 w-full z-10 p-6">
          <div className="text-white">
            <h3 className="text-2xl font-bold mb-1 drop-shadow">Wedding Wardrobe '25</h3>
            <div className="text-base opacity-90 font-light">
              Made For Everyone, Tailored For Love
            </div>
          </div>
          <button className="mt-3 px-5 py-2 rounded-full bg-white text-black text-base font-semibold shadow hover:bg-gray-200 transition">
            Shop Now
          </button>
        </div>
      </div>

      {/* Card 3 */}
      <div className="relative group rounded-l shadow-md overflow-hidden bg-white flex flex-col h-[450px]">
        <img
          src="/banners/Women_Clothing_480x480.png"
          alt="Independence Specials"
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 w-full z-10 p-6">
          <div className="text-white">
            <h3 className="text-2xl font-bold mb-1 drop-shadow">Independence Specials</h3>
            <div className="text-base opacity-90 font-light">
              Freedom Looks Good On Us
            </div>
          </div>
          <button className="mt-3 px-5 py-2 rounded-full bg-white text-black text-base font-semibold shadow hover:bg-gray-200 transition">
            Shop Now
          </button>
        </div>
      </div>

      {/* Card 4 */}
      <div className="relative group rounded-l shadow-md overflow-hidden bg-white flex flex-col h-[450px]">
        <img
          src="/banners/women-in-patiala-salwar-from-punjab.png"
          alt="Bestsellers"
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 w-full z-10 p-6">
          <div className="text-white">
            <h3 className="text-2xl font-bold mb-1 drop-shadow">Bestsellers</h3>
            <div className="text-base opacity-90 font-light">
              Elevate your closet game
            </div>
          </div>
          <button className="mt-3 px-5 py-2 rounded-full bg-white text-black text-base font-semibold shadow hover:bg-gray-200 transition">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  </div>
</section>

        {/* Why Shop With Us */}
        <section
  className="py-16 px-4 sm:px-8 lg:px-12"
  style={{ backgroundColor: "#FEFBEA" }}
>
          <div className="max-w-[1500px] mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Shop With Us</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                We're committed to providing you with the best shopping experience possible
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Shipping</h3>
                <p className="text-gray-600">Free shipping on orders over $50. Get your items delivered in 2-3 business days.</p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Guarantee</h3>
                <p className="text-gray-600">All our products are carefully selected and tested for quality assurance.</p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Payment</h3>
                <p className="text-gray-600">Your payment information is protected with bank-level security encryption.</p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Support</h3>
                <p className="text-gray-600">Our customer support team is available around the clock to help you.</p>
              </div>
            </div>
          </div>
        </section>

{/* Explore Featured Categories Section */}
<section className="py-20 px-4 sm:px-8 lg:px-16 bg-[#FEFBEA]">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Explore Featured Categories
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto text-lg">
        Discover our curated collections designed for every occasion
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* CARD 1 */}
      <div className="relative overflow-hidden group rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2">
        <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/30 to-transparent z-10 transition-all duration-700"></div>
        <img
          src="/banners/landscape-07.png"
          alt="Blouse Beaut"
          className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute bottom-0 left-0 z-20 p-8 w-full transition-all duration-500 group-hover:backdrop-blur-sm group-hover:bg-black/20 rounded-b-2xl">
          <h3 className="text-3xl font-bold text-white mb-2 transform transition-all duration-500 group-hover:translate-x-2">Blouse Beaut</h3>
          <p className="text-white text-lg mb-4 opacity-90 transform transition-all duration-500 group-hover:translate-x-2">Ultra Glam Fits for Iconic Hits</p>
          <Link
            href="#"
            className="inline-flex items-center bg-white text-gray-900 font-bold px-6 py-3 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 group-hover:-translate-y-1 transform group-hover:scale-105"
            prefetch={false}
          >
            Shop Now
            <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
      {/* CARD 2 */}
      <div className="relative overflow-hidden group rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2">
        <div className="absolute inset-0 bg-gradient-to-tl from-black/70 via-black/30 to-transparent z-10 transition-all duration-700"></div>
        <img
          src="/banners/landscape-06.png"
          alt="Indowestern Edit"
          className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute bottom-0 left-0 z-20 p-8 w-full transition-all duration-500 group-hover:backdrop-blur-sm group-hover:bg-black/20 rounded-b-2xl">
          <h3 className="text-3xl font-bold text-white mb-2 transform transition-all duration-500 group-hover:translate-x-2">Indowestern Edit</h3>
          <p className="text-white text-lg mb-4 opacity-90 transform transition-all duration-500 group-hover:translate-x-2">Serving Looks For Every Vibe</p>
          <Link
            href="#"
            className="inline-flex items-center bg-white text-gray-900 font-bold px-6 py-3 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 group-hover:-translate-y-1 transform group-hover:scale-105"
            prefetch={false}
          >
            Shop Now
            <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>

{/* Explore Featured Categories Section */}
<section
  className="py-16 px-4 sm:px-8 lg:px-12"
  style={{ backgroundColor: "#FEFBEA" }}
>
  <div className="max-w-[1500px] mx-auto">
    <Carousel className="w-full relative">
      <CarouselContent>
        {[
          {
            name: "Forever Bride",
            // Use your real model/banner image path here:
            img: "/banners/landscape-08.png", // e.g. in /public/banners/
            subtitle: "Your Fairytale Chapter Starts Here",
            buttonText: "Shop Now"
          },
          {
            name: "Modern Muse",
            img: "/banners/landscape-07.png",
            subtitle: "Elegant Looks, Effortless Vibes",
            buttonText: "Explore Now"
          },
          {
            name: "Classic Edit",
            img: "/banners/landscape-06.png",
            subtitle: "Traditional Magic, Timeless Style",
            buttonText: "See Collection"
          }
        ].map((cat) => (
          <CarouselItem key={cat.name} className="basis-full px-2">
            <div
              className="relative w-full h-[480px] max-w-[1280px] mx-auto overflow-hidden rounded-xl shadow-lg group flex items-center"
              style={{
                aspectRatio: "1280/480"
              }}
            >
              {/* Main Category Image */}
              <img
                src={cat.img}
                alt={cat.name}
                className="object-cover w-full h-full transition-transform group-hover:scale-105"
                style={{ width: "100%", height: "100%" }}
              />

              {/* Gradient overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent z-10" />

              {/* Overlay Content (headline, subtitle, button) */}
              <div className="absolute z-20 left-0 top-0 h-full flex flex-col justify-center pl-14 max-w-xl">
                <h2 className="text-white font-extrabold text-4xl md:text-5xl mb-4 drop-shadow-lg">
                  {cat.name}
                </h2>
                <div className="text-white text-lg md:text-2xl font-medium mb-8 drop-shadow-lg opacity-95">
                  {cat.subtitle}
                </div>
                <Link
                  href="#"
                  className="inline-flex items-center justify-center rounded-full bg-white/90 text-black px-10 py-4 text-lg font-bold shadow-lg hover:bg-white transition"
                  prefetch={false}
                >
                  {cat.buttonText}
                </Link>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/70 hover:bg-white" />
      <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/70 hover:bg-white" />
    </Carousel>
  </div>
</section>

{/* Instagram Section - Improved Design */}
<section className="py-16 px-4 sm:px-8 lg:px-12 bg-gradient-to-br from-pink-50 to-purple-50">
  <div className="max-w-7xl mx-auto">
    {/* Section Header */}
    <div className="text-center mb-12">
      <div className="flex items-center justify-center mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.266.058 1.85.25 2.42.49a4.92 4.92 0 0 1 2.13 1.84c.58.82.77 1.4.83 2.42.06 1.266.07 1.646.07 4.85s-.01 3.584-.07 4.85c-.06 1.02-.25 1.6-.83 2.42a4.92 4.92 0 0 1-1.84 2.13c-.82.58-1.4.77-2.42.83-1.266.06-1.646.07-4.85.07s-3.584-.01-4.85-.07c-1.02-.06-1.6-.25-2.42-.83a4.92 4.92 0 0 1-2.13-1.84c-.58-.82-.77-1.4-.83-2.42-.06-1.266-.07-1.646-.07-4.85s.01-3.584.07-4.85c.06-1.02.25-1.6.83-2.42a4.92 4.92 0 0 1 1.84-2.13c.82-.58 1.4-.77 2.42-.83 1.266-.06 1.646-.07 4.85-.07M12 0C8.74 0 8.33.015 7.05.073 5.77.13 4.87.32 4.05.64c-.82.32-1.5.79-2.13 1.42C1.29 2.7 0.82 3.37.5 4.19.18 5 .015 5.9.015 7.18.015 8.46 0 8.87 0 12s.015 3.54.073 4.82c.058 1.28.25 2.18.57 3 .32.82.79 1.5 1.42 2.13.63.63 1.31 1.1 2.13 1.42.82.32 1.72.51 3 .57 1.28.058 1.69.073 4.95.073s3.67-.015 4.95-.073c1.28-.058 2.18-.25 3-.57.82-.32 1.5-.79 2.13-1.42.63-.63 1.1-1.31 1.42-2.13.32-.82.51-1.72.57-3 0-1.28.073-1.69.073-4.95s-.015-3.67-.073-4.95c-.058-1.28-.25-2.18-.57-3-.32-.82-.79-1.5-1.42-2.13-.63-.63-1.31-1.1-2.13-1.42-.82-.32-1.72-.51-3-.57C15.67.015 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zm0 10.2a4.04 4.04 0 1 1 0-8.08 4.04 4.04 0 0 1 0 8.08zm6.41-10.8a1.44 1.44 0 1 0 0-2.88 1.44 1.44 0 0 0 0 2.88z"/>
          </svg>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Follow us on Instagram
        </h2>
      </div>
      <p className="text-gray-600 max-w-2xl mx-auto text-lg">
        Stay updated with our latest collections, style tips, and behind-the-scenes moments
      </p>
    </div>

    {/* Instagram Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {/* Post 1 */}
      <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
        <img
          src="/instagram/1.jpg"
          alt="Instagram post"
          className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
          <div className="text-white">
            <h3 className="font-bold text-lg mb-1">New Collection</h3>
            <p className="text-sm opacity-90">Check out our latest saree designs</p>
          </div>
        </div>
        <div className="absolute top-4 right-4 bg-white bg-opacity-90 text-pink-700 rounded-full px-3 py-1 font-bold text-xs shadow opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          #Sarees
        </div>
      </div>

      {/* Post 2 */}
      <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
        <img
          src="/instagram/2.jpg"
          alt="Instagram post"
          className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
          <div className="text-white">
            <h3 className="font-bold text-lg mb-1">Style Tips</h3>
            <p className="text-sm opacity-90">Learn how to drape like a pro</p>
          </div>
        </div>
        <div className="absolute top-4 right-4 bg-white bg-opacity-90 text-pink-700 rounded-full px-3 py-1 font-bold text-xs shadow opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          #Styling
        </div>
      </div>

      {/* Post 3 */}
      <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
        <img
          src="/instagram/3.jpg"
          alt="Instagram post"
          className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
          <div className="text-white">
            <h3 className="font-bold text-lg mb-1">Behind the Scenes</h3>
            <p className="text-sm opacity-90">Our design process revealed</p>
          </div>
        </div>
        <div className="absolute top-4 right-4 bg-white bg-opacity-90 text-pink-700 rounded-full px-3 py-1 font-bold text-xs shadow opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          #BTS
        </div>
      </div>

      {/* Post 4 */}
      <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
        <img
          src="/instagram/4.jpg"
          alt="Instagram post"
          className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
          <div className="text-white">
            <h3 className="font-bold text-lg mb-1">Customer Spotlight</h3>
            <p className="text-sm opacity-90">How our customers style our pieces</p>
          </div>
        </div>
        <div className="absolute top-4 right-4 bg-white bg-opacity-90 text-pink-700 rounded-full px-3 py-1 font-bold text-xs shadow opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          #CustomerLove
        </div>
      </div>
    </div>

    {/* Instagram CTA */}
    <div className="text-center mt-12">
      <a
        href="https://instagram.com/yourprofile"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-full shadow-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.266.058 1.85.25 2.42.49a4.92 4.92 0 0 1 2.13 1.84c.58.82.77 1.4.83 2.42.06 1.266.07 1.646.07 4.85s-.01 3.584-.07 4.85c-.06 1.02-.25 1.6-.83 2.42a4.92 4.92 0 0 1-1.84 2.13c-.82.58-1.4.77-2.42.83-1.266.06-1.646.07-4.85.07s-3.584-.01-4.85-.07c-1.02-.06-1.6-.25-2.42-.83a4.92 4.92 0 0 1-2.13-1.84c-.58-.82-.77-1.4-.83-2.42-.06-1.266-.07-1.646-.07-4.85s.01-3.584.07-4.85c.06-1.02.25-1.6.83-2.42a4.92 4.92 0 0 1 1.84-2.13c.82-.58 1.4-.77 2.42-.83 1.266-.06 1.646-.07 4.85-.07M12 0C8.74 0 8.33.015 7.05.073 5.77.13 4.87.32 4.05.64c-.82.32-1.5.79-2.13 1.42C1.29 2.7 0.82 3.37.5 4.19.18 5 .015 5.9.015 7.18.015 8.46 0 8.87 0 12s.015 3.54.073 4.82c.058 1.28.25 2.18.57 3 .32.82.79 1.5 1.42 2.13.63.63 1.31 1.1 2.13 1.42.82.32 1.72.51 3 .57 1.28.058 1.69.073 4.95.073s3.67-.015 4.95-.073c1.28-.058 2.18-.25 3-.57.82-.32 1.5-.79 2.13-1.42.63-.63 1.1-1.31 1.42-2.13.32-.82.51-1.72.57-3 0-1.28.073-1.69.073-4.95s-.015-3.67-.073-4.95c-.058-1.28-.25-2.18-.57-3-.32-.82-.79-1.5-1.42-2.13-.63-.63-1.31-1.1-2.13-1.42-.82-.32-1.72-.51-3-.57C15.67.015 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zm0 10.2a4.04 4.04 0 1 1 0-8.08 4.04 4.04 0 0 1 0 8.08zm6.41-10.8a1.44 1.44 0 1 0 0-2.88 1.44 1.44 0 0 0 0 2.88z"/>
        </svg>
        Follow @yourinstagramprofile
      </a>
    </div>
  </div>
</section>

<section className="w-full bg-gradient-to-br from-pink-200 via-white to-orange-100 py-16 flex flex-col items-center justify-center px-4 sm:px-8 lg:px-0">
  <div className="max-w-3xl w-full mx-auto text-center">
    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-5 tracking-tight">
      CAN'T WAIT TO DRESS UP?
    </h2>
    <p className="text-lg text-gray-700 mb-8 font-medium">
      Discover the best deals on your festive & wedding wardrobe.
      Shop now and elevate your ethnic look with premium trends!
    </p>
    <a
      href="/collections/festive"
      className="inline-block px-10 py-4 rounded-full bg-gradient-to-r from-fuchsia-600 to-orange-500 text-white text-lg font-bold shadow-lg hover:scale-105 hover:shadow-xl transition"
    >
      SHOP THE SALE
    </a>
  </div>
</section>

        {/* Load More Content */}
        <LoadMoreProductsHome />
      </main>
      <footer className="bg-[#FEFBEA] text-grey py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <HomeIcon className="h-8 w-8 text-amber-500" />
                <span className="font-bold text-2xl">RoyalStore</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Your one-stop shop for the latest trends and best deals. Shop with confidence and style!
              </p>
              <div className="flex gap-4 mb-6">
                <a href="#" className="bg-wehite-800 p-3 rounded-full hover:bg-amber-500 transition">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.59-2.47.7a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 9.13 4.07 7.38 1.64 4.7c-.37.64-.58 1.39-.58 2.19 0 1.51.77 2.84 1.94 3.62-.72-.02-1.39-.22-1.98-.55v.06c0 2.11 1.5 3.87 3.5 4.27-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.68 2.12 2.9 3.99 2.93A8.6 8.6 0 0 1 2 19.54c-.29 0-.57-.02-.85-.05A12.13 12.13 0 0 0 8.29 21.5c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 22.46 6z" />
                  </svg>
                </a>
                <a href="#" className="bg-white-800 p-3 rounded-full hover:bg-amber-500 transition">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 4.41 3.6 8.07 8.24 8.93.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.54-1.37-1.32-1.74-1.32-1.74-1.08-.74.08-.73.08-.73 1.2.08 1.83 1.23 1.83 1.23 1.06 1.82 2.78 1.3 3.46.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.97 0-1.32.47-2.39 1.23-3.23-.12-.3-.53-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.01 2.05.14 3 .4 2.29-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.23 0 4.64-2.8 5.67-5.48 5.97.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.36 20.07 24 16.41 24 12c0-5.5-4.46-9.96-9.96-9.96z" />
                  </svg>
                </a>
                <a href="#" className="bg-white-800 p-3 rounded-full hover:bg-amber-500 transition">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21.54 7.2c-.13-.47-.52-.81-.99-.81h-2.13c-.47 0-.86.34-.99.81l-1.7 6.13c-.13.47.09.97.52 1.17.43.2.97.09 1.17-.34l.34-.61h2.36l.34.61c.2.43.74.54 1.17.34.43-.2.65-.7.52-1.17l-1.7-6.13zm-2.13 5.13l.7-2.52.7 2.52h-1.4zM12 2C6.48 2 2 6.48 2 12c0 4.41 3.59 8 8 8s8-3.59 8-8c0-5.52-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z" />
                  </svg>
                </a>
                <a href="#" className="bg-white-800 p-3 rounded-full hover:bg-amber-500 transition">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.486v6.749z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Customer Service */}
            <div>
              <h3 className="font-bold text-lg mb-6 relative inline-block">
                Customer Service
                <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-amber-500"></span>
              </h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-amber-500 transition">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-amber-500 transition">Returns</a></li>
                <li><a href="#" className="text-gray-400 hover:text-amber-500 transition">Shipping Info</a></li>
                <li><a href="#" className="text-gray-400 hover:text-amber-500 transition">Track Order</a></li>
                <li><a href="#" className="text-gray-400 hover:text-amber-500 transition">FAQs</a></li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg mb-6 relative inline-block">
                Quick Links
                <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-amber-500"></span>
              </h3>
              <ul className="space-y-3">
                <li><a href="/about" className="text-gray-400 hover:text-amber-500 transition">About Us</a></li>
                <li><a href="/contact" className="text-gray-400 hover:text-amber-500 transition">Contact Us</a></li>
                <li><a href="/saree" className="text-gray-400 hover:text-amber-500 transition">Sarees</a></li>
                <li><a href="/lehenga" className="text-gray-400 hover:text-amber-500 transition">Lehengas</a></li>
                <li><a href="/offers" className="text-gray-400 hover:text-amber-500 transition">Special Offers</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="font-bold text-lg mb-6 relative inline-block">
                Newsletter
                <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-amber-500"></span>
              </h3>
              <p className="text-gray-400 mb-4">
                Subscribe to get special offers, free giveaways, and new product alerts.
              </p>
              <form className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <button
                  type="submit"
                  className="bg-amber-500 text-gray-900 font-semibold rounded-lg px-4 py-3 hover:bg-amber-400 transition"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <h3 className="font-bold text-lg mb-4">We Accept</h3>
                <div className="flex gap-4">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" className="h-8 w-auto filter grayscale hover:grayscale-0 transition" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" alt="Mastercard" className="h-8 w-auto filter grayscale hover:grayscale-0 transition" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/PayPal_Logo_2007.png" alt="PayPal" className="h-8 w-auto filter grayscale hover:grayscale-0 transition" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/RuPay_Logo.png" alt="RuPay" className="h-8 w-auto filter grayscale hover:grayscale-0 transition" />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-400">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z" />
                  </svg>
                  <span>Easy Returns</span>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>&copy; 2024 RoyalStore. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-6 mt-4">
              <a href="#" className="hover:text-amber-500 transition">Privacy Policy</a>
              <a href="#" className="hover:text-amber-500 transition">Terms of Service</a>
              <a href="#" className="hover:text-amber-500 transition">Shipping Policy</a>
              <a href="#" className="hover:text-amber-500 transition">Refund Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FootprintsIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z" />
      <path d="M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z" />
      <path d="M16 17h4" />
      <path d="M4 13h4" />
    </svg>
  );
}

function HomeIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function LaptopIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" />
    </svg>
  );
}

function MenuIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MountainIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function SearchIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function ShirtIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
    </svg>
  );
}

function ShoppingBagIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function ShoppingCartIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}

function WatchIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="6" />
      <polyline points="12 10 12 12 13 13" />
      <path d="m16.13 7.66-.81-4.05a2 2 0 0 0-2-1.61h-2.68a2 2 0 0 0-2 1.61l-.78 4.05" />
      <path d="m7.88 16.36.8 4a2 2 0 0 0 2 1.61h2.72a2 2 0 0 0 2-1.61l.81-4.05" />
    </svg>
  );
}

function XIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
