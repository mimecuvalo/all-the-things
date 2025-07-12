import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define supported locales
const locales = ['en', 'fr'];
const defaultLocale = 'en';

function getLocale(request: NextRequest): string {
  // Get the Accept-Language header
  const acceptLanguage = request.headers.get('Accept-Language') || '';

  // Simple locale matching based on Accept-Language header
  // Look for exact matches first, then partial matches
  for (const locale of locales) {
    if (acceptLanguage.includes(locale)) {
      return locale;
    }
  }

  // Return default locale if no match found
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for:
  // - API routes
  // - Static files (_next/static)
  // - Images and other assets
  // - Favicon
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.includes('/public/') ||
    /\.(png|jpg|jpeg|json|gif|svg|ico|css|js|woff|woff2|ttf|eot)$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Check if pathname already has a supported locale
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);

  // If pathname already has a locale, continue
  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Redirect to locale-prefixed path
  const locale = getLocale(request);
  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, favicon, etc.)
    '/((?!_next|api|favicon.ico).*)',
  ],
};
