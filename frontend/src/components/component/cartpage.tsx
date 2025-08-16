'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAllCarts, removeFromCart } from "@/actions/cart"
import { getUserData } from "@/actions/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "react-hot-toast"
import Image from "next/image"
import { Cart, CartItem } from "@/types/cart"
import { getCartIdentifier, getCartItemCount, hasCartItems } from "@/lib/cart-utils"

export default function CartPage() {
  const [cartData, setCartData] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [isGuest, setIsGuest] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserData();
        setUser(userData);
        
        // Get cart identifier based on user status
        const cartIdentifier = await getCartIdentifier(userData);
        setIsGuest(cartIdentifier.isGuest);
        
        const cart: Cart = await getAllCarts(cartIdentifier);
        setCartData(cart);
      } catch (error) {
        console.error("Error fetching cart data:", error);
        toast.error("Failed to load cart data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRemoveItem = async (productId: string) => {
    try {
      const cartIdentifier = await getCartIdentifier(user);
      const result = await removeFromCart({ ...cartIdentifier, productId });
      
      if (result.success) {
        // Update cart data after removal
        const updatedCart = await getAllCarts(cartIdentifier);
        setCartData(updatedCart);
        toast.success("Item removed from cart");
        // Dispatch a custom event to notify navbar to update cart count
        window.dispatchEvent(new CustomEvent('cartUpdated'));
      } else {
        toast.error(result.error || "Failed to remove item from cart");
      }
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Failed to remove item from cart");
    }
  };

  const handleProceedToCheckout = () => {
    if (isGuest) {
      // For guest users, redirect to auth page with checkout return URL
      router.push('/auth?redirect=checkout&message=login-required');
    } else {
      // For authenticated users, go directly to checkout
      router.push('/checkout');
    }
  };

  const calculateGrandTotal = () => {
    if (!cartData?.products) return 0;
    return cartData.products.reduce((total: number, item: CartItem) => total + item.totalPrice, 0);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!cartData?.products || cartData.products.length === 0) {
    return (
      <section className="bg-muted py-12 px-6 md:px-12">
        <div className="max-w-[1500px] mx-auto">
          <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">Your cart is empty</p>
            <p className="mt-2">Add some products to your cart to see them here</p>
          </div>
        </div>
      </section>
    );
  }

  const grandTotal = calculateGrandTotal();

  return (
    <section className="bg-muted py-12 px-6 md:px-12">
      <div className="max-w-[1500px] mx-auto">
        <h2 className="text-2xl font-bold mb-6">Your Cart ({cartData.products.length} items)</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {cartData.products.map((item: CartItem) => (
                <Card key={`${item.product._id}-${item.size}`} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <div className="relative w-32 h-32 rounded-md overflow-hidden">
                          <Image
                            src={item.product.images[0] || "/placeholder.svg"}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      
                      <div className="flex-grow">
                        <h3 className="text-lg font-semibold">{item.product.name}</h3>
                        {item.size && (
                          <p className="text-sm text-muted-foreground mt-1">Size: {item.size}</p>
                        )}
                        <p className="text-lg font-bold mt-2">₹{item.purchasePrice.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground mt-1">Quantity: {item.quantity}</p>
                        <p className="text-lg font-bold mt-2">Total: ₹{item.totalPrice.toFixed(2)}</p>
                      </div>
                      
                      <div className="flex-shrink-0">
                        <Button 
                          variant="destructive" 
                          onClick={() => handleRemoveItem(item.product._id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{grandTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>₹{(grandTotal * 0.18).toFixed(2)}</span>
                </div>
                <div className="border-t pt-4 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{(grandTotal * 1.18).toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleProceedToCheckout}
                >
                  {isGuest ? 'Login to Checkout' : 'Proceed to Checkout'}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}