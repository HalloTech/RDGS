'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface CategorySelectorProps{
    name:string
}

export default function CategorySelector({name}:CategorySelectorProps ){
    const searchParams=useSearchParams()
    const {replace}=useRouter()
    const pathname=usePathname()
    
    return(
        <>
            <button 
            onClick={(e)=>{
                const params = new URLSearchParams(searchParams);
                params.set('category', name);
                params.set('page','1')
                if(!pathname.includes('search')){
                    replace(`/search?${params.toString()}`);
                }else if(pathname.includes('search')){
                    replace(`${pathname}?${params.toString()}`);
                }
            }} type="button">
                {name}
            </button>
        </>
    )
}