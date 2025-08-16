'use server'

import { signInType, signUpType } from "@/types/auth"
import { jwtDecode } from "jwt-decode"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const decodeJWT=(jwt:string)=>{
    const decode:any=jwtDecode(jwt)
    return decode.user
}

export async function signIn({email,password}:signInType){
    try {
        const res=await fetch(`http://localhost:5000/api/users/login`,{
            method:'POST',
            body:JSON.stringify({
                email,password
            }),
            headers:{
                'content-type':'application/json'
            }
        })
        const result=await res.json()
        if(!result.accessToken){
            console.log(result.errors[0].msg)
            throw Error(result.errors[0].msg)
        }
        // localStorage.setItem('token',JSON.stringify(result))
        // const user:any=decodeJWT(result.accessToken)
        // setUserData(user.user)
        const cookie=cookies()
        cookie.set('token',result.accessToken,{httpOnly:true})
        return 'Login successfully!'
    } catch (error:any) {
        console.log(error.message)
        return error.message
    }
}

export async function signUp({username,email,password}:signUpType){
    try {
        const res=await fetch(`http://localhost:5000/api/users/signup`,{
            method:'POST',
            body:JSON.stringify({
                username,email,password
            }),
            headers:{
                'content-type':'application/json'
            }
        })
        const result=await res.json()
        console.log('RESULT',result)
        if(!result){
            throw Error('Unable to signin try again!')
        }
        // setUserData(result)
        // localStorage.setItem('token',JSON.stringify(result))
        const cookie=cookies()
        cookie.set('token',result.accessToken,{httpOnly:true})
        return 'Signup successfully!'
    } catch (error:any) {
        return error.message
    }
}

export async function getUserData() {
    const cookie=cookies()
    const token=cookie.get('token')
    if(token){
        const userData=decodeJWT(token.value)
        console.log('User data from token:', userData)
        return userData
    }else{
        console.log('No token found')
        return null
    }
}

export async function Logout(){
    const cookie=cookies()
    cookie.delete('token')
    redirect('/')
}

