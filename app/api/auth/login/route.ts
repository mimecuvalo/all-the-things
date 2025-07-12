import { NextRequest, NextResponse } from 'next/server';
import auth0 from 'vendor/auth0';

export async function GET(request: NextRequest) {
  try {
    // Convert NextRequest to the format expected by Auth0
    const mockReq = {
      method: request.method,
      url: request.url,
      headers: Object.fromEntries(request.headers.entries()),
      query: Object.fromEntries(request.nextUrl.searchParams.entries()),
    };

    const mockRes = {
      statusCode: 200,
      headers: {} as any,
      setHeader: (key: string, value: string) => {
        mockRes.headers[key] = value;
      },
      end: (data: any) => {
        mockRes.body = data;
      },
      redirect: (url: string) => {
        mockRes.statusCode = 302;
        mockRes.headers['Location'] = url;
      },
      body: '',
    };

    await auth0.handleLogin(mockReq as any, mockRes as any);

    return new NextResponse(mockRes.body, {
      status: mockRes.statusCode,
      headers: mockRes.headers,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: error.status || 500 });
  }
}
