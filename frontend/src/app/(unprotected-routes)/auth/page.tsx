'use client'

import Auth from "@/components/component/auth";

interface pageProps{
    
}

export default function page({}:pageProps ){
    // const {userData}=useAuth()

    // if(userData){
    //     redirect('/')
    // }
    return(
        <Auth/>
    )
}