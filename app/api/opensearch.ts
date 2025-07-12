import { NextRequest, NextResponse } from 'next/server';

// OpenSearch is a way to tell your browser to let a user hit <tab> and search your site.
// See http://www.opensearch.org/Home
export default async function opensearch(request: NextRequest) {
  if (request.method !== 'GET') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }

  const appName = 'Next.js: All The Things';
  const url = `https://${request.headers.get('host')}`;

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/">
      <ShortName>${appName}</ShortName>
      <Description>Search ${appName}</Description>
      <Url type="text/html" method="get" template="${url}?q={searchTerms}"/>
      <Image height="16" width="16" type="image/jpeg">${url}/favicon.jpg</Image>
    </OpenSearchDescription>
  `;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
