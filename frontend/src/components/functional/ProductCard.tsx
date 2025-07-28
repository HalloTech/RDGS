'use client'

import { productData } from "@/types/product"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { useSearchParams,useRouter,usePathname } from "next/navigation"
import { addProductToCart } from "@/actions/cart"
import { getUserData } from "@/actions/auth"
import toast from "react-hot-toast"

interface ProductCardProps{
    product:productData
}

export default function ProductCard({product}:ProductCardProps ){
    // console.log(product._id)
    const pathname=usePathname()
    // console.log(!pathname.includes('/product-view'))
    const {replace}=useRouter()
    const searchParams=useSearchParams()
    const router=useRouter()

    const handleProductClick=()=>{
        const params=new URLSearchParams(searchParams)
        params.set('category',product.category)
        params.delete('query')
        params.delete('page')

        replace(`/product-view/${product._id}?${params.toString()}`)
    }

    const addToCart=async()=>{
        try {
            const user=await getUserData()
            // console.log(user)
            if(!user){
                toast.error('Please login first to add to cart!')
                router.push('/auth')
                return
            }
            const res=await addProductToCart({userId:user.id,productId:product._id,quantity:1})
            
        } catch (error:any) {
            console.log(error)
            alert(error.message)
        }
    }
    
    return(
        <Card onClick={(e)=>{
            e.preventDefault()
            e.stopPropagation()
            handleProductClick()}} key={product._id}>
            <img
                // src="/placeholder.svg"
                src={product.images[0]}
                width={300}
                height={300}
                alt="Product Image"
                className="rounded-t-md object-contain w-full aspect-square cursor-pointer"
            />
            <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2 overflow-hidden" style={{display:'-webkit-box',lineClamp:1,'WebkitLineClamp':1,'WebkitBoxOrient':'vertical'}}>{product.name}</h3>
                <p className="text-muted-foreground mb-4 overflow-hidden " style={{display:'-webkit-box',lineClamp:3,'WebkitLineClamp':3,'WebkitBoxOrient':'vertical'}}>{product.description}</p>
                <div className="flex items-center justify-between">
                <span className="font-bold text-lg">{product.price}</span>
                <Button onClick={(e)=>{
                    e.preventDefault()
                    e.stopPropagation()
                    addToCart()
                }}>Add to Cart</Button>
                </div>
            </CardContent>
        </Card>
    )
}