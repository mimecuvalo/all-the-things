import { NextResponse } from 'next/server';
import { REGISTERED_EXPERIMENTS } from '@/application/experiments';
import authenticate from '@/application/authentication';

export const GET = authenticate(async () => {
  return NextResponse.json({ experiments: REGISTERED_EXPERIMENTS });
});
