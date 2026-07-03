export function hello(): string {
  return 'Hono';
}

export type Echo = { exampleField: string };

export function echo(str: string): Echo {
  return { exampleField: str };
}
