'use client'

import { getProducts, getProductsByCategory, getProductsByQuery } from "@/actions/product"
import { productData, productDataGetting } from "@/types/product"
import { useEffect, useState } from "react"
import ProductCard from "./ProductCard"
import { useInView } from "react-intersection-observer"
import { Loader, Loader2 } from "lucide-react"

interface LoadMoreRelatedProductsProps{
    category:string
}

let page=2
let hasNextPage=true
let totalPages=0

export default function LoadMoreRelatedProducts({category}:LoadMoreRelatedProductsProps ){
    const [productsData,setProductsData]=useState<productData[]>([])
    const {ref,inView}=useInView()
    console.log(inView)



    const fetchAllProducts=async()=>{
        try {
            const res:productDataGetting=await getProductsByCategory({limit:10,page:page,category})

            console.log(res)
            setProductsData([...res.products,...productsData])
            hasNextPage=res.hasNextPage
            totalPages=res.totalPages

        } catch (error:any) {
            console.log(error)
            alert(error.message)
        }
    }


    useEffect(()=>{
        console.log(page)
        if(inView && hasNextPage){
            fetchAllProducts()
            page++
        }
    },[inView])
    return(
        <>
            
            {
                productsData?.map((product,ind)=>{
                return(
                    <ProductCard key={product._id} product={product}/>
                )
                })
            }
            
            <div ref={ref} className=" w-full py-4 justify-center items-center flex">
                {
                    (hasNextPage)?<Loader size={25} className=" animate-spin"/>: 

                    <p>You reacch the end...</p>

                }
            </div>
        </>
    )
}