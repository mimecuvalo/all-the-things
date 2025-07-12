import { NextRequest, NextResponse } from 'next/server';

export default async function analytics(request: NextRequest) {
  if (request.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }

  const body = await request.json();

  // Hook up a analytics service here on the backend if desired. (e.g. Amplitude)
  console.debug('Analytics:', { eventName: body.eventName, data: body.data });

  return new NextResponse(null, { status: 204 });
}
