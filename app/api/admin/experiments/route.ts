import { NextRequest, NextResponse } from 'next/server';
import { REGISTERED_EXPERIMENTS } from '@/application/experiments';
import authenticate from '@/application/authentication';

// Convert to app router format but maintain original authentication logic
export async function GET(request: NextRequest) {
  // Convert NextRequest to the format expected by authenticate
  const mockReq = {
    method: request.method,
    headers: Object.fromEntries(request.headers.entries()),
  };

  const mockRes = {
    statusCode: 200,
    status: (code: number) => {
      mockRes.statusCode = code;
      return mockRes;
    },
    send: (data: any) => {
      mockRes.body = data;
    },
    body: null,
  };

  // Use the original authenticate function
  const handler = authenticate(async (req, res) => {
    res.send({ experiments: REGISTERED_EXPERIMENTS });
  });

  await handler(mockReq as any, mockRes as any);

  if (mockRes.statusCode !== 200) {
    return NextResponse.json(mockRes.body, { status: mockRes.statusCode });
  }

  return NextResponse.json({ experiments: REGISTERED_EXPERIMENTS });
}
