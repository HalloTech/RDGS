'use server'

export const addProductToCart = async ({userId, quantity, productId}: {userId: string, quantity: number, productId: string}) => {
    try {
        const res = await fetch(`http://localhost:5000/api/cart/${userId}/add`, {
            method: "POST",
            body: JSON.stringify({
                product: productId, // Changed from productId to product to match backend
                quantity: quantity
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (res.status > 201) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || res.statusText || 'Failed to add product to cart');
        } else {
            const result = await res.json();
            console.log('Product added to cart successfully:', result);
            return { success: true, data: result };
        }
    } catch (error: any) {
        console.error('Error adding product to cart:', error);
        return { success: false, error: error.message };
    }
}

export const getAllCarts = async ({userId}: {userId: string}) => {
    try {
        const res = await fetch(`http://localhost:5000/api/cart/${userId}`, {
            method: "GET",
            cache: 'no-store', // Changed from force-cache to no-store for real-time data
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (res.status > 201) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || res.statusText || 'Failed to fetch cart');
        } else {
            const result = await res.json();
            console.log('Cart data fetched successfully:', result);
            return result;
        }
    } catch (error: any) {
        console.error('Error fetching cart:', error);
        // Return empty cart structure instead of error for better UX
        return {
            user: userId,
            products: [],
            createdAt: new Date(),
            updatedAt: new Date()
        };
    }
}

export const updateCartItem = async ({userId, productId, quantity}: {userId: string, productId: string, quantity: number}) => {
    try {
        const res = await fetch(`http://localhost:5000/api/cart/${userId}/update`, {
            method: "PUT",
            body: JSON.stringify({
                productId: productId,
                quantity: quantity
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (res.status > 201) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || res.statusText || 'Failed to update cart item');
        } else {
            const result = await res.json();
            console.log('Cart item updated successfully:', result);
            return { success: true, data: result };
        }
    } catch (error: any) {
        console.error('Error updating cart item:', error);
        return { success: false, error: error.message };
    }
}

export const removeFromCart = async ({userId, productId}: {userId: string, productId: string}) => {
    try {
        const res = await fetch(`http://localhost:5000/api/cart/${userId}/remove/${productId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (res.status > 201) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || res.statusText || 'Failed to remove item from cart');
        } else {
            const result = await res.json();
            console.log('Item removed from cart successfully:', result);
            return { success: true, data: result };
        }
    } catch (error: any) {
        console.error('Error removing item from cart:', error);
        return { success: false, error: error.message };
    }
}

export const clearCart = async ({userId}: {userId: string}) => {
    try {
        const res = await fetch(`http://localhost:5000/api/cart/${userId}/clear`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (res.status > 201) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || res.statusText || 'Failed to clear cart');
        } else {
            const result = await res.json();
            console.log('Cart cleared successfully:', result);
            return { success: true, data: result };
        }
    } catch (error: any) {
        console.error('Error clearing cart:', error);
        return { success: false, error: error.message };
    }
}