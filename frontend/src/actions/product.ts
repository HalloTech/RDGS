'use server'

import { productDataPosting } from "@/types/product"
import { revalidatePath } from "next/cache"

export const createProduct=async(formData:FormData)=>{
    try {
        // const parseData=JSON.parse(data) as productDataPosting
        // const formData=new FormData()
        // formData.append('data',JSON.stringify(parseData))
        // for (let file of files) {
        //     formData.append('files[]', file, file.name);
        // }
        const res=await fetch('http://localhost:5000/api/products',{
            method:'POST',
            body:formData,
            // headers:{
            //     'Content-Type':'multipart/form-data'
            // }
        })
        
        if(res.status==201){
            const result=await res.json()
            console.log(result)
            revalidatePath('/')
            revalidatePath('/search')
            return {result:result.message,status:201}
        }else{
            const error=await res.json()
            console.log(error)
            throw new Error(error.message)
        }
    } catch (error:any) {
        console.log(error)
        return {error:error.message,status:500}
    }
    
}

export const getProducts=async({limit=10,page=1}:{limit:number,page:number})=>{
    try {
        const res=await fetch(`http://localhost:5000/api/products?limit=${limit}&page=${page}`,{
            method:"GET",
            cache:'no-store',
            headers:{
                'Content-Type':'application/json'
            }
        })
        console.log('Response status:', res.status);
        
        if(res.status>201){
            throw Error('Unable to fetch products!')
        }else{
            const result=await res.json()
            console.log('API Response:', result)
            return result
        }
    } catch (error:any) {
        console.error('Fetch error:', error)
        return error.message
    }
}

export const getProductById=async({id}:{id:string})=>{
    try {
        const res=await fetch(`http://localhost:5000/api/products/${id}`,{
            method:"GET",
            cache:'no-store',
            headers:{
                'Content-Type':'application/json'
            }
        })

        
        if(res.status>201){
            throw Error('Error Fetching Products!')
        }else{
            const result=await res.json()
            // console.log(result.products)
            return result
        }
    } catch (error:any) {
        return error.message
    }
}

export const getProductsByCategory=async({limit,page,category}:{limit:number,page:number,category:string})=>{
    try {
        console.log('Fetching category:', category, 'page:', page, 'limit:', limit)
        const res=await fetch(`http://localhost:5000/api/products/category/${category}?limit=${limit}&page=${page}`,{
            method:"GET",
            cache:'no-store',
            headers:{
                'Content-Type':'application/json'
            }
        })

        console.log('Category response status:', res.status)
        
        if(res.status>201){
            throw Error('Error Fetching Products!')
        }else{
            const result=await res.json()
            console.log('Category API Response:', result)
            return result
        }
    } catch (error:any) {
        console.error('Category fetch error:', error)
        return error.message
    }
}

export const getProductsByCategoryAndQuery=async(
    {limit=10,page=1,category,query}:
    {limit:number,page:number,category:string,query:string})=>{
        try {
            const res=await fetch(`http://localhost:5000/api/products/search/?page=${page}&limit=${limit}&category=${category}&query=${query}`,{
                method:"GET",
                // cache:'force-cache',
                headers:{
                    'Content-Type':'application/json'
                }
            })
    
            
            if(res.status>201){
                throw Error('Error Fetching Prducts!')
            }else{
                const result=await res.json()
                // console.log(126,result)
                return result
            }
        } catch (error:any) {
            return error.message
        }
}

export const getProductsByQuery=async({limit,page,query}:{limit:number,page:number,query:string})=>{
    try {
        const res=await fetch(`http://localhost:5000/api/products?limit=${limit}&page=${page}&search=${query}`,{
            method:"GET",
            // cache:'force-cache',
            headers:{
                'Content-Type':'application/json'
            }
        })

        
        if(res.status>201){
            throw Error(res.statusText)
        }else{
            const result=await res.json()
            console.log(result.products)
            return result
        }
    } catch (error:any) {
        return error.message
    }
}

export const getAvailableCategories=async()=>{
    try {
        const res=await fetch(`http://localhost:5000/api/products/categories`,{
            method:"GET",
            cache:'no-store',
            headers:{
                'Content-Type':'application/json'
            }
        })
        if(res.status>201){
            throw Error('Error fetching categories!')
        }else{
            const result=await res.json()
            console.log('Available categories:', result)
            return result
        }
    } catch (error:any) {
        console.error('Categories fetch error:', error)
        return error.message
    }
}