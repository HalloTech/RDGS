'use client';

import { generateGuestSessionId } from "@/actions/cart";

const GUEST_SESSION_KEY = 'guest_cart_session';

/**
 * Get or create guest session ID from localStorage
 */
export const getOrCreateGuestSession = async (): Promise<string> => {
  // Check if we're in browser environment
  if (typeof window === 'undefined') {
    return '';
  }

  // Try to get existing session from localStorage
  let sessionId = localStorage.getItem(GUEST_SESSION_KEY);
  
  if (!sessionId) {
    try {
      // Generate new session ID from server
      sessionId = await generateGuestSessionId();
      localStorage.setItem(GUEST_SESSION_KEY, sessionId);
    } catch (error) {
      console.error('Failed to generate guest session:', error);
      // Fallback: generate a simple UUID client-side
      sessionId = crypto.randomUUID();
      localStorage.setItem(GUEST_SESSION_KEY, sessionId);
    }
  }
  
  return sessionId;
};

/**
 * Clear guest session from localStorage
 */
export const clearGuestSession = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(GUEST_SESSION_KEY);
  }
};

/**
 * Get current guest session ID without creating a new one
 */
export const getCurrentGuestSession = (): string | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  return localStorage.getItem(GUEST_SESSION_KEY);
};

/**
 * Check if user is guest (no authentication)
 */
export const isGuestUser = (user: any): boolean => {
  return !user || !user.id;
};

/**
 * Get cart identifier based on user status
 */
export const getCartIdentifier = async (user: any): Promise<{
  userId?: string;
  sessionId?: string;
  isGuest: boolean;
}> => {
  if (user && user.id) {
    // Authenticated user
    return {
      userId: user.id,
      isGuest: false
    };
  } else {
    // Guest user
    const sessionId = await getOrCreateGuestSession();
    return {
      sessionId,
      isGuest: true
    };
  }
};

/**
 * Format cart count for display
 */
export const getCartItemCount = (cart: any): number => {
  if (!cart || !cart.products) return 0;
  
  return cart.products.reduce((total: number, item: any) => {
    return total + (item.quantity || 0);
  }, 0);
};

/**
 * Calculate cart total
 */
export const getCartTotal = (cart: any): number => {
  if (!cart || !cart.products) return 0;
  
  return cart.products.reduce((total: number, item: any) => {
    return total + (item.totalPrice || 0);
  }, 0);
};

/**
 * Check if cart has items
 */
export const hasCartItems = (cart: any): boolean => {
  return cart && cart.products && cart.products.length > 0;
};
