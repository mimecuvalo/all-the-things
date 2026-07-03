import type { Context } from '../context';

export function listUsers(ctx: Context) {
  return ctx.prisma.user.findMany();
}

export type CreateUserInput = { username: string; email: string };

export async function createUser(_ctx: Context, _input: CreateUserInput) {
  // Your code here...
  return null;
}
