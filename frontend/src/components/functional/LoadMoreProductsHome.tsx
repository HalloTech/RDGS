'use client'

import { getProducts } from "@/actions/product"
import { productData, productDataGetting } from "@/types/product"
import { useEffect, useState } from "react"
import ProductCard from "./ProductCard"
import { useInView } from "react-intersection-observer"
import { Loader, Loader2 } from "lucide-react"

interface LoadMoreProductsHomeProps{
    
}

let page=2
let hasNextPage=true

export default function LoadMoreProductsHome({}:LoadMoreProductsHomeProps ){
    const [productsData,setProductsData]=useState<productData[]>([])
    const {ref,inView}=useInView()
    console.log(inView)



    const fetchAllProducts=async()=>{
        try {
            const res:productDataGetting=await getProducts({limit:10,page:page})

            console.log(res)
            setProductsData([...res.products,...productsData])
            hasNextPage=res.hasNextPage
            
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(()=>{
        if(inView && hasNextPage){
            fetchAllProducts()
            page++
        }
    },[inView])
    return(
        <>
            <section className="bg-muted py-12 px-6 md:px-12">
            <div className="max-w-[1500px] mx-auto">
                <h2 className="text-2xl font-bold mb-6">Explore More</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {
                    productsData?.map((product,ind)=>{
                    return(
                        <ProductCard key={product.name} product={product}/>
                    )
                    })
                }
                </div>
            </div>
            </section>
            
            <div ref={ref} className=" w-full py-4 justify-center items-center flex">
                {
                    hasNextPage?<Loader size={25} className=" animate-spin"/>: 

                    <p>You reacch the end...</p>

                }
            </div>
        </>
    )
}