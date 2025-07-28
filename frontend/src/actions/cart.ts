'use server'

export const addProductToCart=async ({userId,quantity,productId}:{userId:string,quantity:number,productId:string})=>{
    try {
        const res=await fetch(`http://localhost:5000/api/cart/${userId}/add`,{
            method:"POST",
            body:JSON.stringify({productId,quantity}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        if(res.status>201){
            throw Error(res.statusText)
        }else{
            console.log(res)
        }
    } catch (error:any) {
        console.log(error.message)
        return error.message
    }
}

export const getAllCarts=async ({userId}:{userId:string})=>{
    try {
        const res=await fetch(`http://localhost:5000/api/cart/${userId}`,{
            method:"GET",
            cache:'force-cache',
            headers:{
                'Content-Type':'application/json'
            }
        })
        if(res.status>201){
            throw Error(res.statusText)
        }else{
            const result=await res.json()
            console.log(35,result)
            return result
        }
    } catch (error:any) {
        console.log(error.message)
        return error.message
    }
}