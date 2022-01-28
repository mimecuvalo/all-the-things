// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let clientExceptionsRaw = '',
    serverExceptionsRaw = '';
  try {
    clientExceptionsRaw = fs.readFileSync(
      path.resolve(process.cwd(), 'logs', `clientside-exceptions-${new Date().toISOString().slice(0, 10)}.log`),
      'utf8'
    );
    serverExceptionsRaw = fs.readFileSync(
      path.resolve(process.cwd(), 'logs', `serverside-exceptions-${new Date().toISOString().slice(0, 10)}.log`),
      'utf8'
    );
  } catch (ex) {
    // silently fail.
    console.log(ex);
  }

  const individualClientExceptions = clientExceptionsRaw
    .split('\n')
    .map((e) => e && JSON.parse(e))
    .filter((e) => e);
  const clientExceptions = _.groupBy(individualClientExceptions, 'message');
  const individualServerExceptions = serverExceptionsRaw
    .split('\n')
    .map((e) => e && JSON.parse(e))
    .filter((e) => e);
  const serverExceptions = _.groupBy(individualServerExceptions, 'message');

  res.json({ clientExceptions, serverExceptions });
}
