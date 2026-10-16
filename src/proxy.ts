import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const BYPASS_COOKIE_NAME = 'maintenance_bypass';

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // 1. Never intercept static assets, images, Next.js internal files, Payload admin, or API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/images') ||
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    /\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff2?|ttf|eot)$/i.test(pathname)
  ) {
    return NextResponse.next();
  }

  const maintenanceParam = searchParams.get('maintenance');

  // 2. Query param handling: ?maintenance=false (bypass) or ?maintenance=true (re-lock)
  if (maintenanceParam !== null) {
    const val = maintenanceParam.trim().toLowerCase();
    const isBypassRequest = val === 'false' || val === '0' || val === 'off' || val === 'no';
    const isLockRequest = val === 'true' || val === '1' || val === 'on' || val === 'yes';

    if (isBypassRequest) {
      const targetUrl = request.nextUrl.clone();
      targetUrl.searchParams.delete('maintenance');

      // If bypassing while on /maintenance, direct to homepage
      if (targetUrl.pathname === '/maintenance') {
        targetUrl.pathname = '/';
      }

      const response = NextResponse.redirect(targetUrl, 307);
      response.cookies.set({
        name: BYPASS_COOKIE_NAME,
        value: 'true',
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // Persist for 30 days
        sameSite: 'lax',
        httpOnly: false, // Accessible to client-side scripts to sync sessionStorage
      });
      return response;
    }

    if (isLockRequest) {
      const targetUrl = request.nextUrl.clone();
      targetUrl.searchParams.delete('maintenance');
      const response = NextResponse.redirect(targetUrl, 307);
      response.cookies.set({
        name: BYPASS_COOKIE_NAME,
        value: '',
        path: '/',
        maxAge: 0,
        sameSite: 'lax',
        httpOnly: false,
      });
      return response;
    }
  }

  // 3. Check if user already has an active bypass cookie
  const bypassCookie = request.cookies.get(BYPASS_COOKIE_NAME)?.value;
  const isBypassed = bypassCookie === 'true';

  // 4. If environment variable explicitly forces maintenance mode (emergency hard lock)
  const isEnvHardLocked = process.env.MAINTENANCE_MODE === 'true';
  if (isEnvHardLocked && !isBypassed) {
    if (pathname === '/maintenance') {
      return NextResponse.next();
    }
    const rewriteUrl = new URL('/maintenance', request.url);
    return NextResponse.rewrite(rewriteUrl);
  }

  // 5. Otherwise allow through; RootLayout handles CMS SiteSettings.maintenanceMode dynamically
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api routes
     * - admin routes
     * - _next/static, _next/image
     * - favicon.ico, robots.txt, sitemap.xml
     * - static file extensions (.png, .jpg, .svg, etc.)
     */
    '/((?!api|admin|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff2?|ttf|eot)$).*)',
  ],
};
