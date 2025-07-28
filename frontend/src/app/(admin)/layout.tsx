// import { useAuth } from "@/context/AuthContext"
import { getUserData } from "@/actions/auth"
import AdminNavbar from "@/components/component/adminnavbar"
import Sidebar from "@/components/component/sidebar"
import { redirect } from "next/navigation"
import { ReactNode } from "react"

interface layoutProps{
    children:ReactNode
}

export default async function layout({children}:layoutProps ){
    const session=await getUserData()

    
    if(session.role=='customer'){
        redirect('/')
    }
    
    return(
        <div className=' w-full lg:flex justify-center items-start gap-1 relative'>
            <Sidebar/>
            <div className="w-full">
                <AdminNavbar/>
                {children}
            </div>
        </div>
    )
}