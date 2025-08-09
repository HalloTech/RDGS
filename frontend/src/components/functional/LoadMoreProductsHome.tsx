'use client'

import { getProducts } from "@/actions/product"
import { productData, productDataGetting } from "@/types/product"
import { useEffect, useState } from "react"
import ProductCard from "./ProductCard"
import { useInView } from "react-intersection-observer"
import { Loader, Loader2 } from "lucide-react"

interface LoadMoreProductsHomeProps{
    
}

export default function LoadMoreProductsHome({}:LoadMoreProductsHomeProps ){
    const [productsData,setProductsData]=useState<productData[]>([])
    const [page, setPage] = useState(2)
    const [hasNextPage, setHasNextPage] = useState(true)
    const {ref,inView}=useInView()
    console.log(inView)

    const fetchAllProducts=async()=>{
        try {
            const res:productDataGetting=await getProducts({limit:10,page:page})

            console.log('LoadMore response:', res)
            
            // Transform the data to match expected structure
            const transformedProducts = res?.products?.map(product => ({
                ...product,
                name: (product as any).title, // Use title as name
                images: (product as any).image ? [(product as any).image] : [], // Convert single image to array
                thumbnail: (product as any).image, // Use image as thumbnail
            })) || []
            
            setProductsData([...transformedProducts,...productsData])
            setHasNextPage(res.hasNextPage)
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        if(inView && hasNextPage){
            fetchAllProducts()
            setPage(prev => prev + 1)
        }
    },[inView])

}