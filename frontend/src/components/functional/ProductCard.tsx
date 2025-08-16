'use client'

import { useState } from "react"
import { Card } from "../ui/card"
import { Button } from "../ui/button"
import { ShoppingCart, Heart, Star } from "lucide-react"

export default function ProductCard({ product }: { product: any }) {
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  
  // Calculate discount percentage
  const discountPercentage = product.discountPercentage || 51
  const discountedPrice = product.price - (product.price * discountPercentage / 100)
  
  // Mock rating - in real app this would come from product data
  const rating = 4.5
  
  return (
    <Card className="w-full max-w-[300px] mx-auto overflow-hidden border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* WISHLIST BUTTON */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsWishlisted(!isWishlisted);
        }}
        className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white shadow-sm hover:bg-gray-50 transition-colors rounded-full"
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart className={`w-4 h-4 ${isWishlisted ? "text-red-500 fill-current" : "text-gray-400"}`} />
      </button>
      
      {/* PRODUCT IMAGE */}
      <div className="w-full h-64 flex items-center justify-center bg-gray-50 p-4 rounded-t-2xl">
        <img
          src={product.images?.[0] || "/placeholder.svg"}
          alt={product.name}
          className="object-contain w-full h-full"
          loading="lazy"
        />
      </div>
      
      {/* CARD BODY */}
      <div className="p-4">
        {/* PRODUCT NAME */}
        <h3 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">
          {product.name}
        </h3>
        
        {/* RATING */}
        <div className="flex items-center mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? "text-amber-400 fill-current" : "text-gray-300"}`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">
            {rating}
          </span>
        </div>
        
        {/* PRICES */}
        <div className="flex items-center gap-2 mb-3">
          <span className="font-semibold text-gray-900">
            ₹{discountedPrice.toFixed(0)}
          </span>
          <span className="text-sm line-through text-gray-500">
            ₹{product.price}
          </span>
        </div>
        
        {/* BUTTONS */}
        <div className="flex flex-col gap-2">
          <Button
            className="w-full bg-gray-900 hover:bg-gray-800 text-white text-xs font-medium py-2 h-auto rounded-lg"
            onClick={(e) => {
              e.stopPropagation();
              setIsAddingToCart(true);
              // your add to cart code here
              setTimeout(() => setIsAddingToCart(false), 1200);
            }}
            disabled={isAddingToCart}
          >
            {isAddingToCart ? (
              <span className="text-xs">Adding...</span>
            ) : (
              <div className="flex items-center justify-center gap-1">
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </div>
            )}
          </Button>
          <button className="text-xs text-gray-600 hover:text-gray-900 font-medium py-2 px-3 border border-gray-300 hover:border-gray-400 rounded-lg transition-colors w-full">
            Quick View
          </button>
        </div>
      </div>
    </Card>
  )
}
