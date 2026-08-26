import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export function proxy(request: NextRequest) {
    const path = request.nextUrl.pathname

    const isPublic = path === '/login' || path === '/signup' || path === '/verifyemail' || path === '/resetpassword'
        || path === '/changepassword'

    const token = request.cookies.get('token')
    console.log('proxy')

    if(isPublic && token){
      return NextResponse.redirect(new URL('/profile', request.url))
    }

     if(!isPublic && !token){
      return NextResponse.redirect(new URL('/signup', request.url))
    }
    return NextResponse.next()

}


export const config = {
    matcher: [
        '/',
        '/login',
        '/signup',
        '/verifyemail',
        '/resetpassword',
        '/changepassword',
        '/profile'
    ]
}