import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();

  console.debug('CSP Violation:', body['csp-report']);

  return new NextResponse(null, { status: 204 });
}
