import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  // console.log(request.nextUrl.pathname)
  const currentUser = request.cookies.get('token')?.value
  const pathname = request.nextUrl.pathname
  
  // Define routes that don't require authentication
  const unprotectedRoutes = ['/auth', '/', '/about', '/contact', '/cart', '/search', '/saree']
  
  // Check if the pathname starts with any unprotected route pattern
  const isUnprotectedRoute = unprotectedRoutes.some(route => {
    if (route === '/') {
      return pathname === '/' || pathname === ''
    }
    return pathname.startsWith(route)
  })
  
  // Also allow product view pages and other public routes
  const isPublicRoute = pathname.startsWith('/product-view/') || 
                       pathname.startsWith('/saree') ||
                       pathname.match(/^\/(unprotected-routes)/)

  // console.log(currentUser, pathname, isUnprotectedRoute, isPublicRoute)
 
  // If user is logged in and tries to access auth, redirect to home
  if (currentUser && pathname.startsWith('/auth')) {
    return Response.redirect(new URL('/', request.url))
  }

  // If no user and not an unprotected/public route, redirect to auth
  // Only require auth for admin and customer-specific routes
  if (!currentUser && !isUnprotectedRoute && !isPublicRoute) {
    // Check if it's an admin or customer-specific route
    if (pathname.match(/^\/(dashboard|customers|orders|profile)/)) {
      return Response.redirect(new URL('/auth', request.url))
    }
  }
}
 
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|.*\\.png$).*)', //In this regex the regex itself saying it exclode certain routes. It is called negative lookahead assertion. So, that means anything other than this will be included in the matcher, thats why even when we are not including the following routes it is reading them.
    // '/auth','/','/dashboard','/customers','/products','/orders'
  ],
}