'use server'

// Generate guest session ID
export const generateGuestSessionId = async () => {
    try {
        const res = await fetch(`http://localhost:5000/api/guest-cart/session`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (res.status > 201) {
            throw new Error('Failed to generate session ID');
        }

        const result = await res.json();
        return result.sessionId;
    } catch (error: any) {
        console.error('Error generating guest session ID:', error);
        throw error;
    }
}

// Add product to cart (guest or user)
export const addProductToCart = async ({
    userId, 
    sessionId, 
    quantity, 
    productId, 
    size
}: {
    userId?: string, 
    sessionId?: string, 
    quantity: number, 
    productId: string, 
    size?: string
}) => {
    try {
        let url: string;
        
        if (userId) {
            // User cart
            url = `http://localhost:5000/api/cart/${userId}/add`;
        } else if (sessionId) {
            // Guest cart
            url = `http://localhost:5000/api/guest-cart/${sessionId}/add`;
        } else {
            throw new Error('Either userId or sessionId is required');
        }

        const res = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                product: productId,
                quantity: quantity,
                size: size
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
            return { success: true, data: result };
        }
    } catch (error: any) {
        console.error('Error adding product to cart:', error);
        return { success: false, error: error.message };
    }
}

// Get cart (user or guest)
export const getAllCarts = async ({userId, sessionId}: {userId?: string, sessionId?: string}) => {
    try {
        let url: string;
        
        if (userId) {
            // User cart
            url = `http://localhost:5000/api/cart/${userId}`;
        } else if (sessionId) {
            // Guest cart
            url = `http://localhost:5000/api/guest-cart/${sessionId}`;
        } else {
            throw new Error('Either userId or sessionId is required');
        }

        const res = await fetch(url, {
            method: "GET",
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (res.status > 201) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || res.statusText || 'Failed to fetch cart');
        } else {
            const result = await res.json();
            return result;
        }
    } catch (error: any) {
        console.error('Error fetching cart:', error);
        // Return empty cart structure instead of error for better UX
        return {
            _id: '',
            user: userId,
            sessionId: sessionId,
            products: [],
            createdAt: new Date(),
            updatedAt: new Date()
        };
    }
}

// Update cart item (user or guest)
export const updateCartItem = async ({
    userId, 
    sessionId, 
    productId, 
    quantity
}: {
    userId?: string, 
    sessionId?: string, 
    productId: string, 
    quantity: number
}) => {
    try {
        let url: string;
        
        if (userId) {
            url = `http://localhost:5000/api/cart/${userId}/update`;
        } else if (sessionId) {
            url = `http://localhost:5000/api/guest-cart/${sessionId}/update`;
        } else {
            throw new Error('Either userId or sessionId is required');
        }

        const res = await fetch(url, {
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
            return { success: true, data: result };
        }
    } catch (error: any) {
        console.error('Error updating cart item:', error);
        return { success: false, error: error.message };
    }
}

// Remove from cart (user or guest)
export const removeFromCart = async ({
    userId, 
    sessionId, 
    productId
}: {
    userId?: string, 
    sessionId?: string, 
    productId: string
}) => {
    try {
        let url: string;
        
        if (userId) {
            url = `http://localhost:5000/api/cart/${userId}/remove/${productId}`;
        } else if (sessionId) {
            url = `http://localhost:5000/api/guest-cart/${sessionId}/remove/${productId}`;
        } else {
            throw new Error('Either userId or sessionId is required');
        }

        const res = await fetch(url, {
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
            return { success: true, data: result };
        }
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// Clear cart (user or guest)
export const clearCart = async ({
    userId, 
    sessionId
}: {
    userId?: string, 
    sessionId?: string
}) => {
    try {
        let url: string;
        
        if (userId) {
            url = `http://localhost:5000/api/cart/${userId}/clear`;
        } else if (sessionId) {
            url = `http://localhost:5000/api/guest-cart/${sessionId}/clear`;
        } else {
            throw new Error('Either userId or sessionId is required');
        }

        const res = await fetch(url, {
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
            return { success: true, data: result };
        }
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// Transfer guest cart to user cart after login
export const transferGuestCartToUser = async (sessionId: string, userId: string) => {
    try {
        const res = await fetch(`http://localhost:5000/api/guest-cart/${sessionId}/transfer`, {
            method: "POST",
            body: JSON.stringify({
                userId: userId
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (res.status > 201) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || res.statusText || 'Failed to transfer cart');
        } else {
            const result = await res.json();
            return { success: true, data: result };
        }
    } catch (error: any) {
        console.error('Error transferring guest cart:', error);
        return { success: false, error: error.message };
    }
}
