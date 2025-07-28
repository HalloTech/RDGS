'use client'

import { SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useForm,SubmitHandler } from "react-hook-form";
import { Button } from "../ui/button";
import toast, { Toaster } from "react-hot-toast";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface SearchBarProps{
    
}

type SearchBar={
    query:string
}

export default function SearchBar({}:SearchBarProps ){

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const router=useRouter()

    const {register,handleSubmit,formState: { errors }}=useForm<SearchBar>()

    const onSubmit:SubmitHandler<SearchBar>=async(data)=>{
        // console.log(28,pathname)
        // console.log(!pathname.includes('search'))
        const params = new URLSearchParams(searchParams);
            if (data.query) {
                params.set('query', data.query);
                params.set('page','1')
            }

            if(pathname=='/'){
                replace(`/search?${params.toString()}`)
            }else if(pathname.includes('search')){
                replace(`${pathname}?${params.toString()}`)
            }else {
                params.delete('category')
                replace(`/search?${params.toString()}`)
            }
    }
    return(
    <>
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <div className=" felx w-full justify-center items-center gap-3">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input defaultValue={searchParams.get('query')?.toString()} 
                    {...register('query',{required:{value:true,message:'This field is required!'}})}
                    type="search" name="query" id="query"
                    placeholder="Search products..."
                    className="pl-10 pr-4 py-2 rounded-md bg-primary-foreground text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button type="submit" variant={'outline'} className=" block md:hidden absolute top-0 right-0 text-black">
                    Submit
                </Button>
                {errors.query &&  <ToasterMessage message={errors.query.message || ''}/>}
            </div>
        </form>
        <Toaster  />
    </>
    )
}

function ToasterMessage({message}:{message:string}){
    toast.error(message)
    return(
        <></>
    )
}