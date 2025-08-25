'use server'

import { productDataPosting } from "@/types/product"
import { revalidatePath } from "next/cache"

export const createProduct=async(formData:FormData)=>{
    try {
        // Get token from cookie (server-side) or localStorage (client-side)
        let token = '';
        if (typeof window !== 'undefined') {
            token = localStorage.getItem('token') || '';
        } else {
            // For server actions, try to get from cookies (Next.js)
            try {
                const { cookies } = await import('next/headers');
                const cookie = cookies();
                token = cookie.get('token')?.value || '';
            } catch (e) {
                token = '';
            }
        }
        const res = await fetch('http://localhost:5000/api/products', {
            method: 'POST',
            body: formData,
            headers: token ? { 'Authorization': `Bearer ${token}` } : {}
        });
        if (res.status == 201) {
            const result = await res.json();
            revalidatePath('/');
            revalidatePath('/search');
            return { result: result.message, status: 201 };
        } else {
            const error = await res.json();
            throw new Error(error.message);
        }
    } catch (error: any) {
        console.log(error);
        return { error: error.message, status: 500 };
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
        if(res.status>201){
            throw Error('Unable to fetch products!')
        }else{
            const result=await res.json()
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
        const res=await fetch(`http://localhost:5000/api/products/category/${category}?limit=${limit}&page=${page}`,{
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
            return result
        }
    } catch (error:any) {
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
            return result
        }
    } catch (error:any) {
        return error.message
    }
}