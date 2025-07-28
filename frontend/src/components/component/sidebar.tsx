'use client'

import { Package2Icon, HomeIcon, ShoppingCartIcon, Badge, PackageIcon, UsersIcon, LineChartIcon, List, X, Menu, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface sidebarProps{
    
}

export default function Sidebar({}:sidebarProps ){
    const [showSidebar,setShowSidebar]=useState<boolean>(false)
    const pathname=usePathname()
    return(
        <>
            <div className="hidden border-r bg-muted/40 lg:block min-h-[100dvh] min-w-[250px] sticky left-0 top-0 bottom-0 w-[25vw] max-w-sm">
            <div className="flex flex-col gap-2">
                <div className="flex h-[60px] items-center px-6">
                    <Link href="#" className="flex items-center gap-2 font-semibold" prefetch={false}>
                    <Package2Icon className="h-6 w-6" />
                    <span className="">Acme Inc</span>
                    </Link>
                </div>
                <div className="flex-1">
                    <nav className="grid items-start px-4 text-sm font-medium">
                    <Link
                        href="/dashboard"
                        className={`flex items-center text-muted-foreground gap-3 rounded-lg px-3 py-2  transition-all ${pathname.includes('/dashboard')?'bg-primary text-primary-foreground hover:text-muted-foreground':'hover:text-primary'}`}
                        prefetch={false}
                    >
                        <HomeIcon className="h-4 w-4" />
                        Dashboard
                    </Link>
                    <Link
                        href="/orders"
                        className={`flex items-center text-muted-foreground gap-3 rounded-lg px-3 py-2  transition-all ${pathname.includes('/orders')?'bg-primary text-primary-foreground hover:text-muted-foreground':'hover:text-primary'}`}
                        prefetch={false}
                    >
                        <ShoppingCartIcon className="h-4 w-4" />
                        Orders
                        {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">12</Badge> */}
                    </Link>
                    <Link
                        href="/products"
                        className={`flex items-center text-muted-foreground gap-3 rounded-lg px-3 py-2  transition-all ${pathname.includes('/products')?'bg-primary text-primary-foreground hover:text-muted-foreground':'hover:text-primary'}`}
                        prefetch={false}
                    >
                        <PackageIcon className="h-4 w-4" />
                        Products
                    </Link>
                    <Link
                        href="/customers"
                        className={`flex items-center text-muted-foreground gap-3 rounded-lg px-3 py-2  transition-all ${pathname.includes('/customers')?'bg-primary text-primary-foreground hover:text-muted-foreground':'hover:text-primary'}`}
                        prefetch={false}
                    >
                        <UsersIcon className="h-4 w-4" />
                        Customers
                    </Link>
                    {/* <Link
                        href="#"
                        className={`flex items-center text-muted-foreground gap-3 rounded-lg px-3 py-2  transition-all ${pathname.includes('/analytics')?'bg-primary text-primary-foreground hover:text-muted-foreground':'hover:text-primary'}`}
                        prefetch={false}
                    >
                        <LineChartIcon className="h-4 w-4" />
                        Analytics
                    </Link> */}
                    </nav>
                </div>
            </div>
            </div>

            {/* Small Devices Sidebar */}
            <div className={`flex justify-center items-start border-r bg-muted/40 lg:hidden min-h-[100dvh] min-w-[230px] fixed left-0 top-0 bottom-0 w-[30vw] max-w-sm  bg-white z-10 transition-all
                ${!showSidebar?' -translate-x-[clamp(230px,30vw,24rem)] opacity-0':'translate-x-0'} opacity-100`}>
                <div className="flex flex-col gap-2 w-full">
                <div className="flex h-[60px] items-center px-6">
                    <Link href="#" className="flex items-center gap-2 font-semibold" prefetch={false}>
                    <Package2Icon className="h-6 w-6" />
                    <span className="">Acme Inc</span>
                    </Link>
                </div>
                <div className="flex-1">
                    <nav className="grid items-start px-4 text-sm font-medium">
                    <Link
                        href="/dashboard"
                        className={`flex items-center text-muted-foreground gap-3 rounded-lg px-3 py-2  transition-all ${pathname.includes('/dashboard')?'bg-primary text-primary-foreground hover:text-muted-foreground':'hover:text-primary'}`}
                        prefetch={false}
                    >
                        <HomeIcon className="h-4 w-4" />
                        Dashboard
                    </Link>
                    <Link
                        href="/orders"
                        className={`flex items-center text-muted-foreground gap-3 rounded-lg px-3 py-2  transition-all ${pathname.includes('/orders')?'bg-primary text-primary-foreground hover:text-muted-foreground':'hover:text-primary'}`}
                        prefetch={false}
                    >
                        <ShoppingCartIcon className="h-4 w-4" />
                        Orders
                        {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">12</Badge> */}
                    </Link>
                    <Link
                        href="/products"
                        className={`flex items-center text-muted-foreground gap-3 rounded-lg px-3 py-2  transition-all ${pathname.includes('/products')?'bg-primary text-primary-foreground hover:text-muted-foreground':'hover:text-primary'}`}
                        prefetch={false}
                    >
                        <PackageIcon className="h-4 w-4" />
                        Products
                    </Link>
                    <Link
                        href="/customers"
                        className={`flex items-center text-muted-foreground gap-3 rounded-lg px-3 py-2  transition-all ${pathname.includes('/customers')?'bg-primary text-primary-foreground hover:text-muted-foreground':'hover:text-primary'}`}
                        prefetch={false}
                    >
                        <UsersIcon className="h-4 w-4" />
                        Customers
                    </Link>
                    {/* <Link
                        href="#"
                        className={`flex items-center text-muted-foreground gap-3 rounded-lg px-3 py-2  transition-all ${pathname.includes('/analytics')?'bg-primary text-primary-foreground hover:text-muted-foreground':'hover:text-primary'}`}
                        prefetch={false}
                    >
                        <LineChartIcon className="h-4 w-4" />
                        Analytics
                    </Link> */}
                    </nav>
                </div>
                </div>

                <div className={`  bg-black bottom-5 fixed -right-10 rounded-full shadow-sm 
                    ${showSidebar?'-translate-x-12':'translate-x-0'} `}>
                    {
                    !showSidebar?
                    <ArrowRight onClick={()=>setShowSidebar(!showSidebar)} size={30} className={` p-1 bg-black text-white rounded-full `}/>:
                    <ArrowLeft onClick={()=>setShowSidebar(!showSidebar)} size={30} className={` p-1 bg-black text-white rounded-full `}/>
                    }
                </div>
            </div>
        </>
    )
}