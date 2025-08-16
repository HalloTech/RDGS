'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { addProductToCart } from "@/actions/cart"
import { productData } from "@/types/product"

interface ProductViewClientProps {
  product: productData
  productId: string
  user: any
}

export function ProductViewClient({ product, productId, user }: ProductViewClientProps) {
  const router = useRouter()
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [quantity, setQuantity] = useState<number>(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const handleAddToCart = async () => {
    if (!user) {
      router.push("/auth")
      return
    }

    if (!selectedSize) {
      toast.error("Please select a size")
      return
    }

    setIsAddingToCart(true)
    try {
      const result = await addProductToCart({
        userId: user.id,
        productId: productId,
        quantity: quantity,
        size: selectedSize
      })

      if (result.success) {
        toast.success("Product added to cart successfully!")
        router.refresh()
        window.dispatchEvent(new CustomEvent('cartUpdated'))
      } else {
        toast.error(result.error || "Failed to add product to cart")
      }
    } catch (error: any) {
      toast.error("Failed to add product to cart")
    } finally {
      setIsAddingToCart(false)
    }
  }

  return (
    <form className="grid gap-4 md:gap-10">
      <div className="grid gap-2">
        <Label htmlFor="size" className="text-base">
          Size
        </Label>
        <RadioGroup 
          id="size" 
          className="flex items-center gap-2"
          onValueChange={(value) => setSelectedSize(value)}
        >
          {product.availableSizesColors.map((item, index) => (
            <Label
              key={index}
              htmlFor={`size-${item.size}`}
              className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-muted"
            >
              <RadioGroupItem id={`size-${item.size}`} value={item.size} />
              {item.size}
            </Label>
          ))}
        </RadioGroup>
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="quantity" className="text-base">
          Quantity
        </Label>
        <Select 
          defaultValue="1" 
          onValueChange={(value) => setQuantity(parseInt(value))}
        >
          <SelectTrigger className="w-24">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="4">4</SelectItem>
            <SelectItem value="5">5</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Button 
        size="lg" 
        onClick={(e) => {
          e.preventDefault()
          handleAddToCart()
        }}
        disabled={isAddingToCart}
      >
        {isAddingToCart ? "Adding to Cart..." : "Add to Cart"}
      </Button>
    </form>
  )
}
