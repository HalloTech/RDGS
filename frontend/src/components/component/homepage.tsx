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
import { JSX, SVGProps } from "react";
import ProductCard from "../functional/ProductCard";
import { getProducts } from "@/actions/product";
import { productDataGetting } from "@/types/product";
import LoadMoreProductsHome from "../functional/LoadMoreProductsHome";

export default async function Homepage({ user }: { user: any }) {
  const products: productDataGetting = await getProducts({
    limit: 10,
    page: 1,
  });

  const transformedProducts =
    products?.products?.map((product) => ({
      ...product,
      name: (product as any).title,
      images: (product as any).image ? [(product as any).image] : [],
      thumbnail: (product as any).image,
    })) || [];

  // Debug: log products and transformedProducts
  console.log('products:', products);
  console.log('transformedProducts:', transformedProducts);

  const sliderImages = [
    "https://images.pexels.com/photos/32170138/pexels-photo-32170138.jpeg",
    "https://images.pexels.com/photos/1676059/pexels-photo-1676059.jpeg",
    "https://images.pexels.com/photos/13156811/pexels-photo-13156811.jpeg",
    "https://images.pexels.com/photos/18556227/pexels-photo-18556227.jpeg"
  ];

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <main className="flex-1">
        {/* Main Carousel - Infinite Loop & Responsive */}
        <Carousel
          className="w-full h-[20vh] sm:h-[60vh] md:h-[50vh] lg:h-[70vh] xl:h-screen"
          autoScroll
          autoScrollInterval={3000}
          loop
        >
          <CarouselContent className="h-full">
            {sliderImages.map((bgImage, ind) => (
              <CarouselItem key={ind} className="basis-full relative">
                <div
                  className="relative w-full h-full min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh] lg:min-h-[90vh] xl:min-h-screen bg-cover bg-center flex items-center justify-center sm:justify-start"
                  style={{ backgroundImage: `url(${bgImage})` }}
                >
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-0" />
                  {/* Text Content */}
                  <div className="relative z-10 max-w-lg w-full p-4 sm:p-8 md:p-12 m-2 sm:m-8 md:m-20 bg-black bg-opacity-10 rounded-md backdrop-blur-md animate-fadeInUp flex flex-col items-center sm:items-start text-center sm:text-left">
                    {/* Mobile: Only single text and button */}
                    <div className="block sm:hidden w-full flex flex-col items-center justify-center">
                      <h1 className="text-white font-extrabold text-2xl mb-4 drop-shadow-lg transition-transform text-center">
                        Discover the Latest Trends
                      </h1>
                      <Link
                        href="#"
                        className="inline-block bg-white text-black rounded-full px-4 py-2 font-bold text-sm shadow-lg hover:bg-gray-100 transition"
                        prefetch={false}
                      >
                        Shop Now
                      </Link>
                    </div>
                    {/* Desktop: Full content */}
                    <div className="hidden sm:flex flex-col items-start text-left w-full">
                      <h1 className="text-white font-extrabold text-4xl md:text-5xl lg:text-6xl mb-4 drop-shadow-lg transition-transform">
                        Discover the Latest Trends
                      </h1>
                      <p className="text-white text-xl md:text-2xl mb-6 font-medium drop-shadow-md">
                        Explore our curated collection of fashionable and high-quality products.
                      </p>
                      <Link
                        href="#"
                        className="inline-block bg-white text-black rounded-full px-8 py-4 font-bold text-lg shadow-lg hover:bg-gray-100 transition"
                        prefetch={false}
                      >
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10" />
          <CarouselNext className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10" />
        </Carousel>


        {/* New Arrivals - Modern Card Grid (Sarees style) */}
        <section className="bg-white py-10 sm:py-14 px-4 sm:px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center sm:text-left">
              New Arrivals
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {transformedProducts && transformedProducts.length > 0 ? (
                transformedProducts.slice(0, 4).map((product) => (
                  <div key={product._id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
                    <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96 overflow-hidden">
                      <img
                        src={product.images?.[0] || '/placeholder-user.jpg'}
                        alt={product.name}
                        className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute top-2 left-2 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">New</div>
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="text-lg font-bold mb-2 text-gray-900 truncate">{product.name}</h3>
                      <p className="text-sm text-gray-500 mb-4 line-clamp-2">{product.description || 'Beautiful new arrival product.'}</p>
                      <div className="mt-auto flex items-center justify-between">
                        <span className="text-xl font-bold text-amber-600">₹{product.price}</span>
                        <Link
                          href={`/product-view/${product._id}`}
                          className="px-4 py-2 bg-amber-500 text-white rounded-full font-semibold shadow hover:bg-amber-600 transition"
                          prefetch={false}
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-4 text-center py-12 text-gray-400 text-lg font-semibold">
                  No new arrivals found. Please check your product data.
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-12 sm:py-16 px-4 sm:px-8 lg:px-12 bg-[#FEFBEA]">
          <div className="max-w-[auto] mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-10 text-center">
              Categories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <CategoryCard
                img="/banners/blue-indian-outfit-with-handblocked-ikat-ajarakh-palkhi-fashion-376698.png"
                title="24 Hr Dispatch"
                subtitle=""
                buttonText="Shop Now"
              />
              <CategoryCard
                img="/banners/DSC_2173_720x_dec1d27e-c2a7-4ce7-8b21-654c0ca12e43_1024x.png"
                title="Wedding Wardrobe '25"
                subtitle="Made For Everyone, Tailored For Love"
                buttonText="Shop Now"
              />
              <CategoryCard
                img="/banners/Women_Clothing_480x480.png"
                title="Independence Specials"
                subtitle="Freedom Looks Good On Us"
                buttonText="Shop Now"
              />
              <CategoryCard
                img="/banners/women-in-patiala-salwar-from-punjab.png"
                title="Bestsellers"
                subtitle="Elevate your closet game"
                buttonText="Shop Now"
              />
            </div>
          </div>
        </section>

        {/* Featured Bridal Look */}
        <section className="w-full relative min-h-[300px] md:min-h-[400px] lg:min-h-[550px] flex items-center justify-center bg-gray-100 mb-15 overflow-hidden">
          <img
            src="/banners/landscape-06.png"
            alt="Featured Bridal Look"
            className="w-full h-full object-cover absolute inset-0 z-0"
            style={{ minHeight: "100%", minWidth: "100%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent z-10" />
          <div className="relative z-20 text-white px-6 sm:px-8 py-10 w-full max-w-2xl lg:pl-12">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Forever Bride
            </h1>
            <p className="text-base sm:text-lg lg:text-xl mb-5 opacity-90">
              Your Fairytale Chapter Starts Here
            </p>
            <Link
              href="/collections/bridal"
              className="inline-block px-6 py-3 lg:px-8 lg:py-4 bg-white text-black font-bold rounded-full shadow-lg hover:bg-gray-100 transition"
              prefetch={false}
            >
              Check Out
            </Link>
          </div>
        </section>

       
        {/* Instagram Section */}
        <section className="py-16 px-4 sm:px-8 lg:px-12 bg-gradient-to-br from-pink-50 to-purple-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.266.058 1.85.25 2.42.49a4.92 4.92 0 0 1 2.13 1.84c.58.82.77 1.4.83 2.42.06 1.266.07 1.646.07 4.85s-.01 3.584-.07 4.85c-.06 1.02-.25 1.6-.83 2.42a4.92 4.92 0 0 1-1.84 2.13c-.82.58-1.4.77-2.42.83-1.266.06-1.646.07-4.85.07s-3.584-.01-4.85-.07c-1.02-.06-1.6-.25-2.42-.83a4.92 4.92 0 0 1-2.13-1.84c-.58-.82-.77-1.4-.83-2.42-.06-1.266-.07-1.646-.07-4.85s.01-3.584.07-4.85c.06-1.02.25-1.6.83-2.42a4.92 4.92 0 0 1 1.84-2.13c.82-.58 1.4-.77 2.42-.83 1.266-.06 1.646-.07 4.85-.07M12 0C8.74 0 8.33.015 7.05.073 5.77.13 4.87.32 4.05.64c-.82.32-1.5.79-2.13 1.42C1.29 2.7 0.82 3.37.5 4.19.18 5 .015 5.9.015 7.18.015 8.46 0 8.87 0 12s.015 3.54.073 4.82c.058 1.28.25 2.18.57 3 .32.82.79 1.5 1.42 2.13.63.63 1.31 1.1 2.13 1.42.82.32 1.72.51 3 .57 1.28.058 1.69.073 4.95.073s3.67-.015 4.95-.073c1.28-.058 2.18-.25 3-.57.82-.32 1.5-.79 2.13-1.42.63-.63 1.1-1.31 1.42-2.13.32-.82.51-1.72.57-3 0-1.28.073-1.69.073-4.95s-.015-3.67-.073-4.95c-.058-1.28-.25-2.18-.57-3-.32-.82-.79-1.5-1.42-2.13-.63-.63-1.31-1.1-2.13-1.42-.82-.32-1.72-.51-3-.57C15.67.015 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zm0 10.2a4.04 4.04 0 1 1 0-8.08 4.04 4.04 0 0 1 0 8.08zm6.41-10.8a1.44 1.44 0 1 0 0-2.88 1.44 1.44 0 0 0 0 2.88z" />
                  </svg>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Follow us on Instagram
                </h2>
              </div>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Stay updated with our latest collections, style tips, and
                behind-the-scenes moments
              </p>
            </div>
            

            {/* Instagram Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {/* Instagram posts with real images and captions */}
              {[
                {
                  img: "/images/Screenshot 2025-08-24 at 10.47.24 AM.png",
                  title: "Festive Saree Style",
                  desc: "Celebrating tradition with a modern twist.",
                  tag: "#FestiveFashion"
                },
                {
                  img: "/images/Screenshot 2025-08-24 at 10.47.52 AM.png",
                  title: "Bridal Elegance",
                  desc: "A moment to remember in our bridal collection.",
                  tag: "#BridalLook"
                },
                {
                  img: "/images/Screenshot 2025-08-24 at 10.48.58 AM.png",
                  title: "Summer Vibes",
                  desc: "Light, breezy, and beautiful for every day.",
                  tag: "#SummerStyle"
                },
                {
                  img: "/images/Screenshot 2025-08-24 at 10.59.37 AM.png",
                  title: "Classic Beauty",
                  desc: "Timeless saree looks for every occasion.",
                  tag: "#ClassicSaree"
                }
              ].map((post, idx) => (
                <div
                  key={idx}
                  className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <img
                    src={post.img}
                    alt={post.title}
                    className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="text-white">
                      <h3 className="font-bold text-lg mb-1">{post.title}</h3>
                      <p className="text-sm opacity-90">{post.desc}</p>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-white bg-opacity-90 text-pink-700 rounded-full px-3 py-1 font-bold text-xs shadow opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {post.tag}
                  </div>
                </div>
              ))}
            </div>



            {/* Instagram CTA */}
            <div className="text-center mt-12">
              <a
                href="https://instagram.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-full shadow-lg hover:from-pink-600 hover:to-purple-700 transition-transform duration-300 transform hover:-translate-y-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.266.058 1.85.25 2.42.49a4.92 4.92 0 0 1 2.13 1.84c.58.82.77 1.4.83 2.42.06 1.266.07 1.646.07 4.85s-.01 3.584-.07 4.85c-.06 1.02-.25 1.6-.83 2.42a4.92 4.92 0 0 1-1.84 2.13c-.82.58-1.4.77-2.42.83-1.266.06-1.646.07-4.85.07s-3.584-.01-4.85-.07c-1.02-.06-1.6-.25-2.42-.83a4.92 4.92 0 0 1-2.13-1.84c-.58-.82-.77-1.4-.83-2.42-.06-1.266-.07-1.646-.07-4.85s.01-3.584.07-4.85c.06-1.02.25-1.6.83-2.42a4.92 4.92 0 0 1 1.84-2.13c.82-.58 1.4-.77 2.42-.83 1.266-.06 1.646-.07 4.85-.07M12 0C8.74 0 8.33.015 7.05.073 5.77.13 4.87.32 4.05.64c-.82.32-1.5.79-2.13 1.42C1.29 2.7 0.82 3.37.5 4.19.18 5 .015 5.9.015 7.18.015 8.46 0 8.87 0 12s.015 3.54.073 4.82c.058 1.28.25 2.18.57 3 .32.82.79 1.5 1.42 2.13.63.63 1.31 1.1 2.13 1.42.82.32 1.72.51 3 .57 1.28.058 1.69.073 4.95.073s3.67-.015 4.95-.073c1.28-.058 2.18-.25 3-.57.82-.32 1.5-.79 2.13-1.42.63-.63 1.1-1.31 1.42-2.13.32-.82.51-1.72.57-3 0-1.28.073-1.69.073-4.95s-.015-3.67-.073-4.95c-.058-1.28-.25-2.18-.57-3-.32-.82-.79-1.5-1.42-2.13-.63-.63-1.31-1.1-2.13-1.42-.82-.32-1.72-.51-3-.57C15.67.015 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zm0 10.2a4.04 4.04 0 1 1 0-8.08 4.04 4.04 0 0 1 0 8.08zm6.41-10.8a1.44 1.44 0 1 0 0-2.88 1.44 1.44 0 0 0 0 2.88z" />
                </svg>
                Follow @yourinstagramprofile
              </a>
            </div>
          </div>
        </section>

         {/* Explore Featured Categories Carousel */}
        <section
          className="py-24 px-0 bg-[#FEFBEA]"
          aria-label="Explore Featured Categories Carousel"
        >
          <div className="w-full">
            <div className="mb-16 text-center">
              <h2 className="text-xl md:text-4xl font-bold text-gray-900 mb-4">
                Explore Featured Categories
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto text-lg">
                Discover our curated collections designed for every occasion
              </p>
            </div>
            <Carousel>
              <CarouselContent>
                {[
                  {
                    name: "Forever Bride",
                    img: "/banners/landscape-08.png",
                    subtitle: "Your Fairytale Chapter Starts Here",
                    buttonText: "Shop Now",
                  },
                  {
                    name: "Modern Muse",
                    img: "/banners/landscape-07.png",
                    subtitle: "Elegant Looks, Effortless Vibes",
                    buttonText: "Explore Now",
                  },
                  {
                    name: "Classic Edit",
                    img: "/banners/landscape-06.png",
                    subtitle: "Traditional Magic, Timeless Style",
                    buttonText: "See Collection",
                  },
                ].map((cat) => (
                  <CarouselItem
                    key={cat.name}
                    className="relative px-4 overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-2 flex items-center h-[300px] md:h-[420px] xl:h-[550px]"
                    style={{ aspectRatio: "1280/650" }}
                  >
                    <img
                      src={cat.img}
                      alt={cat.name}
                      className="object-cover w-full h-full absolute inset-0 transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent z-10" />
                    <div className="relative z-20 flex flex-col justify-center pl-8 md:pl-16 xl:pl-24 max-w-2xl h-full">
                      <h2 className="text-white font-extrabold text-3xl md:text-5xl xl:text-7xl mb-6 drop-shadow-2xl">
                        {cat.name}
                      </h2>
                      <p className="text-white text-lg md:text-2xl xl:text-3xl font-medium mb-8 xl:mb-12 drop-shadow-lg opacity-95">
                        {cat.subtitle}
                      </p>
                      <Link
                        href="#"
                        className="inline-flex items-center justify-center rounded-full bg-white/90 text-black px-8 py-4 md:px-12 md:py-5 xl:px-16 xl:py-6 text-lg md:text-2xl xl:text-3xl font-bold shadow-2xl hover:bg-white transition"
                        prefetch={false}
                      >
                        {cat.buttonText}
                      </Link>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>


        {/* Shop The Sale Section */}
        <section className="w-full bg-gradient-to-br from-pink-200 via-white to-orange-100 py-16 flex flex-col items-center justify-center px-4 sm:px-8 lg:px-0">
          <div className="max-w-3xl w-full mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-5 tracking-tight">
              CAN'T WAIT TO DRESS UP?
            </h2>
            <p className="text-lg text-gray-700 mb-8 font-medium">
              Discover the best deals on your festive &amp; wedding wardrobe.
              Shop now and elevate your ethnic look with premium trends!
            </p>
            <Link
              href="/collections/festive"
              className="inline-block px-10 py-4 rounded-full bg-gradient-to-r from-fuchsia-600 to-orange-500 text-white text-lg font-bold shadow-lg hover:scale-105 hover:shadow-xl transition"
              prefetch={false}
            >
              SHOP THE SALE
            </Link>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-[#FEFBEA] text-gray-700 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <HomeIcon className="h-8 w-8 text-amber-500" />
                <span className="font-bold text-2xl">RoyalStore</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Your one-stop shop for the latest trends and best deals. Shop
                with confidence and style!
              </p>
              <div className="flex gap-4 mb-6">
                <SocialIcon
                  href="#"
                  svgPath="M22.46 6c-.77.35-1.6....
                  /* truncated for brevity */
                  "
                  title="Twitter"
                />
                <SocialIcon
                  href="#"
                  svgPath="M12 2.04c-5.5 0-9.96 4.46....
                  /* truncated for brevity */
                  "
                  title="GitHub"
                />
                <SocialIcon
                  href="#"
                  svgPath="M21.54 7.2c-.13-.47-.52-....
                  /* truncated for brevity */
                  "
                  title="Some Icon"
                />
                <SocialIcon
                  href="#"
                  svgPath="M19 0h-14c-2.761 0-5 2....
                  /* truncated for brevity */
                  "
                  title="LinkedIn"
                />
              </div>
            </div>

            {/* Customer Service Links */}
            <FooterLinks
              title="Customer Service"
              links={[
                { href: "#", label: "Help Center" },
                { href: "#", label: "Returns" },
                { href: "#", label: "Shipping Info" },
                { href: "#", label: "Track Order" },
                { href: "#", label: "FAQs" },
              ]}
            />

            {/* Quick Links */}
            <FooterLinks
              title="Quick Links"
              links={[
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact Us" },
                { href: "/saree", label: "Sarees" },
                { href: "/lehenga", label: "Lehengas" },
                { href: "/offers", label: "Special Offers" },
              ]}
            />

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
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <Button className="bg-amber-500 text-gray-900 font-semibold rounded-lg px-4 py-3 hover:bg-amber-400 transition">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <h3 className="font-bold text-lg mb-4">We Accept</h3>
                <div className="flex gap-4">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
                    alt="Visa"
                    className="h-8 w-auto filter grayscale hover:grayscale-0 transition"
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
                    alt="Mastercard"
                    className="h-8 w-auto filter grayscale hover:grayscale-0 transition"
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/PayPal_Logo_2007.png"
                    alt="PayPal"
                    className="h-8 w-auto filter grayscale hover:grayscale-0 transition"
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/RuPay_Logo.png"
                    alt="RuPay"
                    className="h-8 w-auto filter grayscale hover:grayscale-0 transition"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4 text-gray-400">
                <div className="flex items-center gap-2">
                  <CheckIcon />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <MinusIcon />
                  <span>Easy Returns</span>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>© 2024 RoyalStore. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-6 mt-4">
              <FooterLink href="#" label="Privacy Policy" />
              <FooterLink href="#" label="Terms of Service" />
              <FooterLink href="#" label="Shipping Policy" />
              <FooterLink href="#" label="Refund Policy" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Category Card Component
function CategoryCard({
  img,
  title,
  subtitle,
  buttonText,
}: {
  img: string;
  title: string;
  subtitle?: string;
  buttonText: string;
}) {
  return (
    <div className="relative group rounded-xl shadow-md overflow-hidden bg-white flex flex-col h-[300px] xs:h-[340px] sm:h-[380px] md:h-[420px] lg:h-[450px] hover:shadow-lg transition-shadow cursor-pointer">
      <img
        src={img}
        alt={title}
        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 p-4 sm:p-6 z-10 w-full">
        <h3 className="text-lg sm:text-2xl font-bold mb-1 text-white drop-shadow-md">{title}</h3>
        {subtitle && <p className="text-xs sm:text-base opacity-90 font-light text-white">{subtitle}</p>}
        <button className="mt-2 sm:mt-3 px-4 sm:px-5 py-2 rounded-full bg-white text-black font-semibold shadow hover:bg-gray-200 transition w-full sm:w-auto text-xs sm:text-base">
          {buttonText}
        </button>
      </div>
    </div>
  );
}

function SocialIcon({
  href,
  svgPath,
  title,
}: {
  href: string;
  svgPath: string;
  title: string;
}) {
  return (
    <a href={href} className="bg-white-800 p-3 rounded-full hover:bg-amber-500 transition" aria-label={title}>
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: svgPath }} />
    </a>
  );
}

function FooterLinks({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="font-bold text-lg mb-6 relative inline-block">
        {title}
        <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-amber-500"></span>
      </h3>
      <ul className="space-y-3">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link href={href} className="text-gray-400 hover:text-amber-500 transition">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="hover:text-amber-500 transition">
      {label}
    </Link>
  );
}

function CheckIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      className="h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

function MinusIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      className="h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <line x1="7" y1="12" x2="17" y2="12" />
    </svg>
  );
}

function HomeIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      className="h-8 w-8 text-amber-500"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1 -2 2H5a2 2 0 0 1 -2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
