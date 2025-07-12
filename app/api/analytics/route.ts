import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Hook up a analytics service here on the backend if desired. (e.g. Amplitude)
  console.debug('Analytics:', { eventName: body.eventName, data: body.data });

  return new NextResponse(null, { status: 204 });
}
