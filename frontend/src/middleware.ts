import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  // console.log(request.nextUrl.pathname)
  const currentUser = request.cookies.get('token')?.value
  const unprotectedRoutes=['/auth','/','/about','/contact']

  // console.log(currentUser,request.nextUrl.pathname)
 
//   if (currentUser && !request.nextUrl.pathname.startsWith('/dashboard')) {
//     return Response.redirect(new URL('/dashboard', request.url))
//   }
 
  if (currentUser && request.nextUrl.pathname.startsWith('/auth')) {
    return Response.redirect(new URL('/', request.url))
  }

  if(!currentUser && !unprotectedRoutes.includes(request.nextUrl.pathname)){
    return Response.redirect(new URL('/auth',request.url))
  }
}
 
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|.*\\.png$).*)', //In this regex the regex itself saying it exclode certain routes. It is called negative lookahead assertion. So, that means anything other than this will be included in the matcher, thats why even when we are not including the following routes it is reading them.
    // '/auth','/','/dashboard','/customers','/products','/orders'
  ],
}