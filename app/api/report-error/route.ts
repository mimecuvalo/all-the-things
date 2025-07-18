import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Hook up a error logging service here on the backend if desired (e.g. Sentry).
  console.debug('Error:', body.data);

  return new NextResponse(null, { status: 204 });
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const data = url.searchParams.get('data');

  // Hook up a error logging service here on the backend if desired (e.g. Sentry).
  console.debug('Error:', data ? JSON.parse(data) : 'No data');
}
