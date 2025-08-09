'use client'

import { useState } from "react"
import { Card } from "../ui/card"
import { Button } from "../ui/button"
import { ShoppingCart, Loader2 } from "lucide-react"

// Mock: replace these with real logic/props/hooks as needed
const OFFER = "51% OFF"
const sizes = ["M", "L", "XL", "XXL"] // or from props/product, e.g. product.sizes || []
const discountPrice = (price: number) => (price * 0.49).toFixed(0) // example

export default function ProductCard({ product }) {
  // ... put your hooks/state for cart logic here if you want quick add
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  return (
    <Card className="relative w-full max-w-[320px] mx-auto group rounded-xl shadow-md hover:shadow-xl transition cursor-pointer overflow-hidden bg-white">
      {/* OFFER BADGE */}
      <div className="absolute left-3 top-3 z-10">
        <span className="bg-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
          {OFFER}
        </span>
      </div>
      {/* PRODUCT IMAGE */}
      <div
        className="w-full aspect-[3/4] bg-gray-50 flex items-center justify-center overflow-hidden"
        style={{ minHeight: 260, maxHeight: 340 }}
      >
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      {/* CARD BODY */}
      <div className="py-4 px-5 flex flex-col gap-2">
        <div className="text-gray-800 font-semibold text-base leading-tight truncate mb-1">
          {product.name}
        </div>
        {/* SIZES */}
        <div className="flex gap-1 mb-2">
          {sizes.map(size => (
            <span
              key={size}
              className="rounded-full border bg-white text-xs font-semibold px-3 py-0.5 text-gray-700 shadow-sm"
            >
              {size}
            </span>
          ))}
        </div>
        {/* PRICES */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg font-bold text-green-700">
            ₹{discountPrice(product.price)}
          </span>
          <span className="text-sm line-through text-gray-400 font-medium">
            ₹{product.price}
          </span>
        </div>
        {/* ADD TO CART BUTTON */}
        <Button
          className="mt-2 w-full bg-gray-900 hover:bg-gray-800 text-white rounded-full font-semibold flex items-center justify-center py-2"
          onClick={e => {
            e.preventDefault()
            setIsAddingToCart(true)
            // your add to cart code here
            setTimeout(() => setIsAddingToCart(false), 1200)
          }}
          disabled={isAddingToCart}
        >
          {isAddingToCart ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-1" />
              Adding...
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4 mr-1" />
              Add to Cart
            </>
          )}
        </Button>
      </div>
    </Card>
  )
}
