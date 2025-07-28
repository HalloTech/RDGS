import { getAllCarts } from "@/actions/cart"
import ProductCard from "../functional/ProductCard"
import { getUserData } from "@/actions/auth"
import { cartsData } from "@/types/cart"

interface cartpageProps{
    
}

export default async function CartPage({}:cartpageProps ){
    const user=await getUserData()
    
    const cartProducts:cartsData=await getAllCarts({userId:user.id})

    return(
        <section className="bg-muted py-12 px-6 md:px-12">
            <div className="max-w-[1500px] mx-auto">
                {/* <h2 className="text-2xl font-bold mb-6">Category: {category}</h2> */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {
                    cartProducts.items?.map((item,ind)=>{
                    return(
                        <ProductCard key={item.product._id} product={item.product}/>
                    )
                    })
                }
                </div>
            </div>
        </section>
    )
}