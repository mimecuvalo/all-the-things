import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import auth0 from 'vendor/auth0';

export async function GET(request: NextRequest) {
  try {
    const response = new NextResponse();
    const session = await auth0.getSession(request, response);

    if (!session) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    // Return the user data from the session
    return NextResponse.json({
      user: session.user,
      accessToken: session.accessToken,
      idToken: session.idToken,
    });
  } catch (error: any) {
    console.error('Auth me error:', error);
    return NextResponse.json(
      {
        error: error.message,
        user: null,
      },
      {
        status: 500,
      }
    );
  }
}
