import { MountainIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { Input } from "../ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { getUserData } from "@/actions/auth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import ToggleMenuBtn from "../functional/ToggleMenuBtn";
import SearchBar from "../functional/SearchBar";
import CategorySelector from "../functional/CategorySelector";
import { getAllCarts } from "@/actions/cart";
import { cartsData } from "@/types/cart";

interface navbarProps{
    
}

export default async function Navbar({}:navbarProps ){
    const user=await getUserData()
    let carts:cartsData | null=null

    if(user){
        carts=await getAllCarts({userId:user.id})
    }

    const categories=['Sarees', 'Lehenga', 'Suite', 'Gowns', 'Laungery & Garments', 'Thaan kapda', 'Froks']
    return(
        <header className="bg-primary text-primary-foreground py-4 px-6 flex flex-col justify-center items-center gap-4 w-full ">
            <div className="flex items-center justify-between w-full">
                <Link href="/" className="flex items-center gap-2" prefetch={false}>
                    <MountainIcon className="h-6 w-6" />
                    <span className="text-lg font-bold">VastrWare</span>
                </Link>

                <div className="relative md:block flex-1 max-w-lg mx-6 w-full hidden">
                    <SearchBar/>
                </div>
                
                <nav className="hidden md:flex justify-end  items-center gap-6">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Link href="#" className="hover:underline" prefetch={false}>
                            <p>
                                Categories
                            </p>
                        </Link>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="center">
                            {
                                categories.map((category)=>(
                                <DropdownMenuItem key={category}>
                                    <CategorySelector name={category}/>
                                </DropdownMenuItem>
                                ))
                            }
                            {/* <DropdownMenuItem>
                                <CategorySelector name='Category-1'/>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <CategorySelector name='Category-2'/>
                            </DropdownMenuItem> */}
                            {/* <DropdownMenuSeparator /> */}
                            {/* <DropdownMenuItem>
                                <CategorySelector name='Category-3'/>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <CategorySelector name='Category-4'/>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <CategorySelector name='Category-5'/>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <CategorySelector name='Category-6'/>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <CategorySelector name='Category-7'/>
                            </DropdownMenuItem> */}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Link href="/about" className="hover:underline" prefetch={false}>
                    About
                    </Link>
                    <Link href="/contact" className="hover:underline" prefetch={false}>
                    Contact
                    </Link>
                    {user &&<Link href="/cart" className="flex items-center gap-2 hover:underline" prefetch={false}>
                    {/* <ShoppingCartIcon className="h-5 w-5" /> */}
                    <p >
                        Cart
                    </p>
                    <p className=" bg-red-500 p-1 rounded-full text-[10px]">0{carts?.items?.length}</p>
                    </Link>}
                    {user ? (
                    <Link href="/profile" className="flex items-center gap-2 hover:underline" prefetch={false}>
                        {/* <ShoppingCartIcon className="h-5 w-5" /> */}
                        <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder-user.jpg" />
                            <AvatarFallback>{user?.username?.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span className="sr-only">Toggle user menu</span>
                    </Link>
                    ) : (
                    <div className="flex gap-2">
                        <Link href="/auth" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                        Login
                        </Link>
                        {/* <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                        Register
                        </Link> */}
                    </div>
                    )}
                </nav>

                <div className=" md:hidden block">
                    <ToggleMenuBtn user={user}/>
                </div>
            </div>

            <div className="relative flex-1  mx-6 w-full md:hidden">
            <SearchBar/>
            </div>
            
        </header>
    )
}