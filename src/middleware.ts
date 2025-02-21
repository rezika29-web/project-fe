// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const landingPagePath = '/adminhome/sso';

  const token = await getToken({ req: request });
  const authCookie = request.cookies.get('next-auth.session-token');
  // const isAuthPage = request.nextUrl.pathname.startsWith('/(unauthenticated)');
  const isPublicPage = ['/user/home','/login', '/register', '/forgot-password','/adminhome/sso','/dashboard/management/pengguna/daftar','/dashboard/management/pengguna/edit','/dashboard/management/pengguna/tambah','/dashboard/management/role/daftar','/dashboard/management/role/tambah','/dashboard/management/role/edit','/dashboard/setting/acount/daftar','/dashboard/setting/acount/edit','/dashboard/setting/acount/tambah'].includes(request.nextUrl.pathname);
  const isAuthPage = ['/user/home','/login', '/register', '/forgot-password','/adminhome','/dashboard'].includes(request.nextUrl.pathname);

  if (isPublicPage) {
    if (token || authCookie) {
      // Only redirect if it's not the form-penilaian-360 page
      if (!request.nextUrl.pathname.startsWith('/user/home')) {
        return NextResponse.redirect(new URL(landingPagePath, request.url));
      }
    }
    return NextResponse.next();
  }

  if (!token && !authCookie && !isPublicPage) {
    return NextResponse.redirect(new URL('/user/home', request.url));
  }
  if (token && authCookie && isAuthPage) {
    return NextResponse.redirect(new URL('/adminhome/sso', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|biro-images|biro-images/Sumatera_Barat.png).*)'],
};