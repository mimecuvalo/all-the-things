import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import auth0 from 'vendor/auth0';

const locales = ['en', 'fr'];
const defaultLocale = 'en';

function getLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get('accept-language');

  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(',')
      .map((lang) => lang.trim().split(';')[0])
      .find((lang) => locales.includes(lang));

    if (preferredLocale) return preferredLocale;
  }

  return defaultLocale;
}

function generateCsp(nonce: string) {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const cspDirectives: { [key: string]: string[] } = {
    'connect-src': isDevelopment
      ? ['*']
      : ["'self'", 'https://*.ingest.sentry.io', 'https://vitals.vercel-insights.com'],
    'default-src': ["'self'"],
    'font-src': ["'self'", 'https:'],
    // TODO(mime)
    //'frame-ancestors': ["'self'"],
    'frame-src': ["'self'", 'http:', 'https:'],
    'img-src': ['data:', 'http:', 'https:'],
    'manifest-src': ["'self'"],
    'media-src': ["'self'", 'blob:'],
    'object-src': ["'self'"],
    // 'prefetch-src': ["'self'"],
    // TODO(mime)
    //'report-uri': ['/api/report-csp-violation'],
    'script-src': [
      "'self'",
      'https://cdn.auth0.com',
      'https://cdn.vercel-insights.com',
      'https://va.vercel-scripts.com',
    ].concat(isDevelopment ? ["'unsafe-inline'", "'unsafe-eval'"] : [`'nonce-${nonce}'`]),

    // XXX(mime): we have inline styles around - can we pass nonce around the app properly?
    'style-src': ["'self'", 'https:', "'unsafe-inline'"], //(req, res) => `'nonce-${nonce}'`],
  };

  if (!isDevelopment) {
    cspDirectives['upgrade-insecure-requests'] = [];
  }

  const csp = Object.keys(cspDirectives)
    .map((directive) => `${directive} ${cspDirectives[directive].join(' ')}`)
    .join('; ');

  return csp;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle Auth0 authentication routes first
  if (pathname.startsWith('/auth/')) {
    return await auth0.middleware(request);
  }

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

  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);

  const contentSecurityPolicyHeaderValue = generateCsp(nonce);
  requestHeaders.set('Content-Security-Policy', contentSecurityPolicyHeaderValue);

  // Check if pathname already has a supported locale
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);

  // If pathname already has a locale, continue
  if (pathnameHasLocale) {
    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
    response.headers.set('Content-Security-Policy', contentSecurityPolicyHeaderValue);

    return response;
  }

  // Redirect to locale-prefixed path
  const locale = getLocale(request);
  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
