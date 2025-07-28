'use client'

import { Package2Icon, SearchIcon } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface adminnavbarProps{
    
}

export default function AdminNavbar({}:adminnavbarProps ){
    const pathname=usePathname()
    const newPathname=pathname.split('/').slice(1).map((item)=>item.charAt(0).toUpperCase()+item.slice(1)).join(' > ')
    return(
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6">
          <Link href="#" className="lg:hidden" prefetch={false}>
            <Package2Icon className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </Link>
          <div className="flex-1">
            <h1 className="font-semibold text-lg">{newPathname}</h1>
          </div>
          
        </header>
    )
}