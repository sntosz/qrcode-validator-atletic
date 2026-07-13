import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const secretKey = process.env.JWT_SECRET
const JWT_SECRET = new TextEncoder().encode(secretKey)

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('session_token')?.value
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/admin')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    try {
      await jwtVerify(token, JWT_SECRET)
      return NextResponse.next()
    } catch (err) {
      const response = NextResponse.redirect(new URL('/login', request.url))
      response.cookies.delete('session_token')
      return response
    }
  }

  if (pathname === '/login') {
    if (token) {
      try {
        await jwtVerify(token, JWT_SECRET)
        return NextResponse.redirect(new URL('/admin/dashboard', request.url))
      } catch (err) {
        return NextResponse.next()
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
}