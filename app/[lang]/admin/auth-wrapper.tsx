import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import auth0 from 'vendor/auth0';
import prisma from 'data/prisma';

export default async function AuthWrapper({ children }: { children: ReactNode }) {
  try {
    const cookieStore = await cookies();

    // Create request/response objects for auth0.getSession
    const request = new NextRequest('http://localhost:3000', {
      headers: {
        cookie: cookieStore.toString(),
      },
    });
    const response = new NextResponse();

    const session = await auth0.getSession(request, response);

    if (!session) {
      redirect('/api/auth/login');
    }

    const user = await prisma.user.findUnique({
      select: {
        email: true,
        role: true,
      },
      where: {
        email: session.user.email,
      },
    });

    if (user?.role !== 'ADMIN') {
      redirect('/not-found');
    }

    return <>{children}</>;
  } catch (error) {
    console.error('Auth wrapper error:', error);
    redirect('/api/auth/login');
  }
}
