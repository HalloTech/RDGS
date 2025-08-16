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
    const [loading, setLoading] = useState(false)
    const {ref,inView}=useInView()

    const fetchAllProducts=async()=>{
        if (loading) return;
        
        setLoading(true);
        try {
            const res:productDataGetting=await getProducts({limit:10,page:page})

            // Transform the data to match expected structure
            const transformedProducts = res?.products?.map(product => ({
                ...product,
                name: (product as any).title, // Use title as name
                images: (product as any).image ? [(product as any).image] : [], // Convert single image to array
                thumbnail: (product as any).image, // Use image as thumbnail
            })) || []
            
            setProductsData(prev => [...prev, ...transformedProducts])
            setHasNextPage(res.hasNextPage)
            setPage(prev => prev + 1)
            
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(inView && hasNextPage && !loading){
            fetchAllProducts()
        }
    },[inView, hasNextPage, loading])

    return (
        <section className="bg-white py-12 px-6 md:px-12">
            <div className="max-w-[1500px] mx-auto">
                <h2 className="text-2xl font-bold mb-6">More Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {productsData.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
                {loading && (
                    <div className="flex justify-center mt-8">
                        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
                    </div>
                )}
                <div ref={ref} className="h-10" />
            </div>
        </section>
    )
}