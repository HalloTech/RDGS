/**
 * v0 by Vercel.
 * @see https://v0.dev/t/pLHy1IEMIu1
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SubmitHandler, useForm } from "react-hook-form"
import { signInType, signUpType } from "@/types/auth"
import  toast, { Toaster }  from "react-hot-toast"
import { signIn,signUp } from "@/actions/auth"
import { useRouter } from "next/navigation"

export default function Auth() {
const [isSignUp, setIsSignUp] = useState(false)
const router=useRouter()
// const {signIn,signUp}=useAuth()


const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signInType>()
  const onSubmitSignin:SubmitHandler<signInType>=async(data)=>{
    try {
        const res=await signIn({email:data.email,password:data.password})
        console.log(res)
        if(res!=='Login successfully!') throw Error(res)
        toast.success(res)
        router.push('/')
    } catch (error:any) {
        toast.error(error.message)
    }
  }

  const {
    register:registerSignup,
    handleSubmit:handleSubmitSignup,
    formState: { errors:errorsSignup },
  } = useForm<signUpType>()
  const onSubmitSignup: SubmitHandler<signUpType> = async(data) =>{
    if(data.confirmPassword!==data.password){
        toast.error(<p className=" text-center">
            Password and confirm password should be same!
        </p>)
        return
    }
    try {
        const res=await signUp({username:data.username,email:data.email,password:data.password})
        console.log(res)
        if(!res) throw Error('Unable to signup!')
        toast.success(res)
        router.push('/')
    } catch (error:any) {
        toast.error(error)
    }
  }


    return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-md space-y-8">
        <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
            {isSignUp ? "Create an account" : "Sign in to your account"}
            </h2>
            <p className="mt-2 text-center text-sm text-muted-foreground">
            {isSignUp ? (
                <>
                Already have an account?{" "}
                <button
                    type="button"
                    className="font-medium text-primary hover:text-primary/90"
                    onClick={() => setIsSignUp(false)}
                >
                    Sign in
                </button>
                </>
            ) : (
                <>
                Don't have an account?{" "}
                <button
                    type="button"
                    className="font-medium text-primary hover:text-primary/90"
                    onClick={() => setIsSignUp(true)}
                >
                    Sign up
                </button>
                </>
            )}
            </p>
        </div>
        {isSignUp ? (
        <form className="space-y-6" onSubmit={handleSubmitSignup(onSubmitSignup)} >
            <div>
                <Label htmlFor="name">Name</Label>
                <Input {...registerSignup('username',{required:true})} id="name" name="username" type="text" autoComplete="name" />
                {errorsSignup.username && <p className=" text-[12px] text-center w-full pt-2 text-red-500">This field is required!</p>}
            </div>
            
            <div>
                <Label htmlFor="email">Email address</Label>
                <Input {...registerSignup('email',{required:'This field is required!',
                    pattern:{value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,message:'Provide the valid email!'}})} id="email" name="email" type="text" autoComplete="email"  />
                {errorsSignup.email && <p className=" text-[12px] text-center w-full pt-2 text-red-500">{errorsSignup.email.message}</p>}

            </div>
            <div>
                <Label htmlFor="password">Password</Label>
                <Input
                    {...registerSignup('password',{required:{value:true,message:'This field is required!'},minLength:{value:6,message:'Password should be strong'}})}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete={isSignUp ? "new-password" : "current-password"}
                />
                {errorsSignup.password && <p className=" text-[12px] text-center w-full pt-2 text-red-500">{errorsSignup.password.message}</p>}

            </div>
            <div>
                <Label htmlFor="password">Confirm Password</Label>
                <Input
                    {...registerSignup('confirmPassword',{required:{value:true,message:'This field is required!'},minLength:{value:6,message:'Password should be strong'}})}
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete={isSignUp ? "new-password" : "current-password"}
                />
                {errorsSignup.confirmPassword && <p className=" text-[12px] text-center w-full pt-2 text-red-500">{errorsSignup.confirmPassword.message}</p>}
            </div>
            <div>
            <Button type="submit" className="w-full">
                {isSignUp ? "Sign up" : "Sign in"}
            </Button>
            </div>
        </form>): 
        (<form className="space-y-6" onSubmit={handleSubmit(onSubmitSignin)}>
            <div>
                <Label htmlFor="email">Email address</Label>
                <Input {...register('email',{required:{value:true,message:'This field is required!'},
                pattern:{value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,message:'Provide the valid email!'}})} id="email" name="email" type="email" autoComplete="email"  /> 
                {errors.email && <p className=" text-[12px] text-center w-full pt-2 text-red-500">{errors.email.message}</p>}
            </div>
            <div>
                <Label htmlFor="password">Password</Label>
                <Input
                    {...register('password',{required:{value:true,message:'This field is required!'},minLength:{value:6,message:'Password should be strong'}})}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete={isSignUp ? "new-password" : "current-password"}
                />
                {errors.password && <p className=" text-[12px] text-center w-full pt-2 text-red-500">{errors.password.message}</p>}
            </div>
            <div>
            <Button type="submit" className="w-full">
                {isSignUp ? "Sign up" : "Sign in"}
            </Button>
            </div>
        </form>)
    }

        </div>

        <Toaster/>
    </div>
    )
}