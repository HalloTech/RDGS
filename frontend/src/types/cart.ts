import { z } from "zod"
import { productData } from "./product"


const carts= z.object({
    _id:z.string(),
    user:z.string(),
    items:z.array(
        z.object({
            product: z.object(
                {
                    _id:z.string(),
                    name: z.string().min(3),
                    description: z.string().min(5),
                    price: z.number(),
                    category: z.enum(['Sarees', 'Lehenga', 'Suite', 'Gowns', 'Laungery & Garments', 'Thaan kapda', 'Froks']),
                    subCategory: z.string(),
                    images: z.array(z.string()),
                    stockQuantity: z.number().min(0),
                    availableSizesColors: z.array(
                        z.object({
                            size:z.string(),
                            dimensions:z.string(),
                            stockQuantity:z.number(),
                            combination_price:z.number()
                        })
                    ),
                    isAvailable: z.boolean(),
                    discountPercentage: z.number().min(0).max(100),
                    tags: z.array(z.string()),
                    carousel: z.boolean(), // New field
                    most_selling_product: z.boolean() ,
                    createdAt: z.date(),
                    updatedAt: z.date(),
                    product_specification: z.object({
                        material: z.string(),
                        careInstruction: z.string(),
                        dimensions: z.string(),
                        }
                    ),
                }
            )
        })
    )
    
})

export type cartsData=z.infer<typeof carts>