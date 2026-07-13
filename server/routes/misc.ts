import { Hono } from 'hono';

export const miscRoutes = new Hono()
  .post('/report-error', async (c) => {
    let data: unknown;
    try {
      data = ((await c.req.json()) as { data?: unknown })?.data;
    } catch {
      data = undefined;
    }
    // Hook up a backend error logging service here if desired (e.g. Sentry).
    console.debug('Error:', data);
    return c.body(null, 204);
  })
  // OpenSearch description so browsers can offer tab-to-search. http://www.opensearch.org/Home
  .get('/opensearch', (c) => {
    const appName = 'All The Things';
    const requestUrl = new URL(c.req.url);
    const host = c.req.header('x-forwarded-host') || c.req.header('host') || requestUrl.host;
    const protocol = c.req.header('x-forwarded-proto') || requestUrl.protocol.replace(':', '');
    const url = `${protocol}://${host}`;
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/">
      <ShortName>${appName}</ShortName>
      <Description>Search ${appName}</Description>
      <Url type="text/html" method="get" template="${url}?q={searchTerms}"/>
      <Image height="16" width="16" type="image/jpeg">${url}/favicon.jpg</Image>
    </OpenSearchDescription>
  `;
    return c.body(xml, 200, { 'Content-Type': 'application/xml' });
  });
