import { MountainIcon, SearchIcon, ShoppingCart, User, Menu } from "lucide-react";
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
        try {
            carts=await getAllCarts({userId:user.id})
        } catch (error) {
            console.error('Error fetching cart:', error)
            // Set empty cart structure if there's an error
            carts = {
                user: user.id,
                products: [],
                createdAt: new Date(),
                updatedAt: new Date()
            }
        }
    }

    // Calculate total items in cart safely
    const cartItemCount = carts?.products?.reduce((total, item) => {
        const quantity = item?.quantity || 1
        return total + quantity
    }, 0) || 0

    const categories=['Sarees', 'Lehenga', 'Suite', 'Gowns', 'Laungery & Garments', 'Thaan kapda', 'Froks', 'electronics', 'jewelery', "men's clothing", "women's clothing"]
    return(
        <header className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
            {/* Top Bar */}
            <div className="bg-gray-900 text-white py-2 px-6">
                <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
                    <div className="flex items-center space-x-4">
                        <span>📞 +1 (555) 123-4567</span>
                        <span>📧 support@royalretail.com</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span>🚚 Free Shipping on Orders Over $50</span>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group" prefetch={false}>
                        <div className="bg-gradient-to-r from-gray-900 to-gray-700 p-2 rounded-lg group-hover:from-gray-800 group-hover:to-gray-600 transition-all duration-300">
                            <MountainIcon className="h-8 w-8 text-white" />
                        </div>
                        <div>
                            <span className="text-2xl font-bold text-gray-900">Royal Retail</span>
                            <div className="text-xs text-gray-500 -mt-1">Premium Shopping Experience</div>
                        </div>
                    </Link>

                    {/* Search Bar - Desktop */}
                    <div className="hidden lg:block flex-1 max-w-2xl mx-8">
                        <div className="relative">
                            <SearchBar/>
                        </div>
                    </div>

                    {/* Navigation Items */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {/* Categories Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium">
                                    Categories
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="center" className="w-64 p-2">
                                <div className="grid grid-cols-1 gap-1">
                                    {categories.map((category)=>(
                                        <DropdownMenuItem key={category} className="p-2 hover:bg-gray-50 rounded-md">
                                            <CategorySelector name={category}/>
                                        </DropdownMenuItem>
                                    ))}
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* About Link */}
                        <Link href="/about" className="text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-4 py-2 rounded-lg transition-all duration-200 font-medium" prefetch={false}>
                            About
                        </Link>

                        {/* Contact Link */}
                        <Link href="/contact" className="text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-4 py-2 rounded-lg transition-all duration-200 font-medium" prefetch={false}>
                            Contact
                        </Link>

                        {/* Cart */}
                        {user && (
                            <Link href="/cart" className="relative flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium" prefetch={false}>
                                <ShoppingCart className="h-5 w-5" />
                                <span>Cart</span>
                                {cartItemCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                                        {cartItemCount > 99 ? '99+' : cartItemCount}
                                    </span>
                                )}
                            </Link>
                        )}

                        {/* User Profile */}
                        {user ? (
                            <Link href="/profile" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200" prefetch={false}>
                                <Avatar className="h-8 w-8 border-2 border-gray-200">
                                    <AvatarImage src="/placeholder-user.jpg" />
                                    <AvatarFallback className="bg-gray-100 text-gray-700 font-semibold">
                                        {user?.username?.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <span className="font-medium hidden lg:block">{user.username}</span>
                            </Link>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link href="/auth" className="text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-4 py-2 rounded-lg transition-all duration-200 font-medium" prefetch={false}>
                                    Login
                                </Link>
                                <Link href="/auth" className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-all duration-200 font-medium" prefetch={false}>
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <ToggleMenuBtn user={user}/>
                    </div>
                </div>

                {/* Search Bar - Mobile */}
                <div className="lg:hidden mt-4">
                    <div className="relative">
                        <SearchBar/>
                    </div>
                </div>
            </div>
        </header>
    )
}