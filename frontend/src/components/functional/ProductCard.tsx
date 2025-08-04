'use client'

import { productData } from "@/types/product"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { addProductToCart } from "@/actions/cart"
import { getUserData } from "@/actions/auth"
import toast from "react-hot-toast"
import { useState } from "react"
import { ShoppingCart, Loader2 } from "lucide-react"

interface ProductCardProps{
    product:productData
}

export default function ProductCard({product}:ProductCardProps ){
    const pathname = usePathname()
    const {replace} = useRouter()
    const searchParams = useSearchParams()
    const router = useRouter()
    const [isAddingToCart, setIsAddingToCart] = useState(false)

    const handleProductClick = () => {
        const params = new URLSearchParams(searchParams)
        params.set('category', product.category)
        params.delete('query')
        params.delete('page')

        replace(`/product-view/${product._id}?${params.toString()}`)
    }

    const addToCart = async () => {
        if (isAddingToCart) return; // Prevent multiple clicks
        
        setIsAddingToCart(true)
        try {
            const user = await getUserData()
            
            if (!user) {
                toast.error('Please login first to add to cart!')
                router.push('/auth')
                return
            }

            const result = await addProductToCart({
                userId: user.id,
                productId: product._id,
                quantity: 1
            })

            if (result.success) {
                toast.success(`${product.name} added to cart successfully!`)
                // Optionally refresh the page or update cart count
                window.location.reload()
            } else {
                toast.error(result.error || 'Failed to add product to cart')
            }
            
        } catch (error: any) {
            console.error('Error adding to cart:', error)
            toast.error(error.message || 'Failed to add product to cart')
        } finally {
            setIsAddingToCart(false)
        }
    }
    
    return(
        <Card 
            onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleProductClick()
            }} 
            key={product._id}
            className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
        >
            <div className="relative">
                <img
                    src={product.images[0]}
                    width={300}
                    height={300}
                    alt={product.name}
                    className="rounded-t-md object-contain w-full aspect-square cursor-pointer group-hover:scale-105 transition-transform duration-300"
                />
                {/* Quick Add to Cart Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Button
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            addToCart()
                        }}
                        disabled={isAddingToCart}
                        className="bg-white text-gray-900 hover:bg-gray-100 border-2 border-gray-200"
                    >
                        {isAddingToCart ? (
                            <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Adding...
                            </>
                        ) : (
                            <>
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                Quick Add
                            </>
                        )}
                    </Button>
                </div>
            </div>
            
            <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2 overflow-hidden" style={{
                    display: '-webkit-box',
                    lineClamp: 1,
                    'WebkitLineClamp': 1,
                    'WebkitBoxOrient': 'vertical'
                }}>
                    {product.name}
                </h3>
                
                <p className="text-muted-foreground mb-4 overflow-hidden" style={{
                    display: '-webkit-box',
                    lineClamp: 3,
                    'WebkitLineClamp': 3,
                    'WebkitBoxOrient': 'vertical'
                }}>
                    {product.description}
                </p>
                
                <div className="flex items-center justify-between">
                    <span className="font-bold text-lg text-green-600">
                        ${product.price}
                    </span>
                    <Button 
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            addToCart()
                        }}
                        disabled={isAddingToCart}
                        className="bg-gray-900 hover:bg-gray-800 text-white"
                    >
                        {isAddingToCart ? (
                            <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Adding...
                            </>
                        ) : (
                            <>
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                Add to Cart
                            </>
                        )}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}