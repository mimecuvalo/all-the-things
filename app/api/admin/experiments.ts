import { NextRequest, NextResponse } from 'next/server';
import { REGISTERED_EXPERIMENTS } from '@/application/experiments';
import authenticate from '@/application/authentication';

export default authenticate(async (request: NextRequest) => {
  if (request.method !== 'GET') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }
  return NextResponse.json({ experiments: REGISTERED_EXPERIMENTS });
});
