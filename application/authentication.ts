import { NextRequest, NextResponse } from 'next/server';
import auth0 from 'vendor/auth0';
import prisma from 'data/prisma';

const authenticate = (handler: (req: NextRequest) => Promise<NextResponse>) => async (req: NextRequest) => {
  const session = await auth0.getSession();

  if (!session?.user) {
    return NextResponse.json({ msg: 'Not logged in.' }, { status: 401 });
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
    return NextResponse.json({ msg: 'I call shenanigans.' }, { status: 403 });
  }

  return handler(req);
};

export default authenticate;
