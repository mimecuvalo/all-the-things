import { NextRequest, NextResponse } from 'next/server';

export default async function hello(request: NextRequest) {
  if (request.method !== 'GET') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }

  return NextResponse.json({ name: 'John Doe' });
}
