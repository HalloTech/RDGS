'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, User, CreditCard } from 'lucide-react';
import { getUserData } from '@/actions/auth';
import { getAllCarts, transferGuestCartToUser } from '@/actions/cart';
import { getCartIdentifier, getCartTotal, hasCartItems, clearGuestSession, getCurrentGuestSession } from '@/lib/cart-utils';
import Image from 'next/image';

interface CheckoutProps {
  // Optional props can be added here
}

interface CartItem {
  _id: string;
  product: {
    _id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
  };
  quantity: number;
  size: string | null;
  purchasePrice: number;
  totalPrice: number;
}

interface Cart {
  _id: string;
  user?: string;
  sessionId?: string;
  products: CartItem[];
  createdAt: string;
  updatedAt: string;
}

export default function Checkout({}: CheckoutProps) {
  const [user, setUser] = useState<any>(null);
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const initializeCheckout = async () => {
      try {
        setLoading(true);
        
        // Get user data
        const userData = await getUserData();
        
        if (!userData) {
          // User not authenticated - redirect to auth with return URL
          router.push('/auth?redirect=checkout');
          return;
        }
        
        setUser(userData);
        
        // Handle guest cart transfer if exists
        const guestSessionId = getCurrentGuestSession();
        if (guestSessionId) {
          try {
            await transferGuestCartToUser(guestSessionId, userData.id);
            clearGuestSession();
          } catch (transferError) {
            console.error('Failed to transfer guest cart:', transferError);
            // Continue even if transfer fails
          }
        }
        
        // Get user's cart
        const cartIdentifier = await getCartIdentifier(userData);
        const cartData = await getAllCarts(cartIdentifier);
        
        if (!hasCartItems(cartData)) {
          setError('Your cart is empty. Please add items before checkout.');
          return;
        }
        
        setCart(cartData);
      } catch (err: any) {
        console.error('Error initializing checkout:', err);
        setError('Failed to load checkout information. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    initializeCheckout();
  }, [router]);

  const handleProceedToPayment = () => {
    // This would typically integrate with a payment processor
    // For now, just show a success message or redirect to order confirmation
    console.log('Proceeding to payment...');
    // Implement payment integration here (Stripe, Razorpay, etc.)
  };

  const handleBackToCart = () => {
    router.push('/cart');
  };

  const calculateSubtotal = () => {
    if (!cart) return 0;
    return cart.products.reduce((total, item) => total + item.totalPrice, 0);
  };

  const calculateTax = (subtotal: number) => {
    // Simple 5% tax calculation - should be based on your tax configuration
    return subtotal * 0.05;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax(subtotal);
    return subtotal + tax;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Checkout Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">{error}</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.push('/')} className="w-full">
              Continue Shopping
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const subtotal = calculateSubtotal();
  const tax = calculateTax(subtotal);
  const total = calculateTotal();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-2">Review your order and complete your purchase</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Order Summary
                </CardTitle>
                <CardDescription>
                  {cart?.products.length} item(s) in your cart
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cart?.products.map((item) => (
                    <div key={`${item._id}-${item.size}`} className="flex items-center space-x-4">
                      <div className="relative w-16 h-16 bg-gray-200 rounded-md overflow-hidden">
                        {item.product.images?.[0] && (
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {item.product.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            Qty: {item.quantity}
                          </Badge>
                          {item.size && (
                            <Badge variant="outline" className="text-xs">
                              Size: {item.size}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        ₹{item.totalPrice.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-6" />
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Customer Info & Payment */}
          <div className="space-y-6">
            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p><span className="font-medium">Name:</span> {user?.username}</p>
                  <p><span className="font-medium">Email:</span> {user?.email}</p>
                </div>
              </CardContent>
            </Card>

            {/* Payment Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment
                </CardTitle>
                <CardDescription>
                  Complete your order securely
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Payment integration will be implemented here. This could include:
                  </p>
                  <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                    <li>Credit/Debit Card payments</li>
                    <li>UPI payments</li>
                    <li>Net Banking</li>
                    <li>Digital Wallets</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex gap-4">
                <Button variant="outline" onClick={handleBackToCart} className="flex-1">
                  Back to Cart
                </Button>
                <Button onClick={handleProceedToPayment} className="flex-1">
                  Proceed to Payment
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
