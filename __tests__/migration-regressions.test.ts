import { afterEach, describe, expect, it, vi } from 'vitest';
import messages from 'i18n/compiled/en.json';
import frenchMessages from 'i18n/compiled/fr.json';
import { getMessages } from 'lib/messages';
import { buildContentSecurityPolicy } from 'lib/security';
import { miscRoutes } from 'server/routes/misc';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('migration regression coverage', () => {
  it('ships a populated English message catalog', () => {
    expect(Object.keys(messages).length).toBeGreaterThan(10);
  });

  it('keeps translated catalog keys aligned with English', () => {
    expect(Object.keys(frenchMessages).sort()).toEqual(Object.keys(messages).sort());
  });

  it('does not dehydrate a catalog for the default locale', () => {
    // en renders off the inline `defaultMessage` ASTs instead; handing react-intl the
    // catalog as well put the whole thing into the SSR payload of every page.
    expect(getMessages('en')).toBeUndefined();
    expect(getMessages('xx-LS')).toBeUndefined();
    expect(getMessages('fr')).toBeDefined();
  });

  it('uses a nonce instead of unsafe-inline scripts in production CSP', () => {
    const policy = buildContentSecurityPolicy({
      isDevelopment: false,
      nonce: 'request-nonce',
    });

    expect(policy).toContain("script-src 'self' 'nonce-request-nonce' 'strict-dynamic'");
    expect(policy).not.toContain("script-src 'self' 'unsafe-inline'");
  });

  it('accepts client error reports over POST', async () => {
    const log = vi.spyOn(console, 'debug').mockImplementation(() => {});
    const response = await miscRoutes.request('/report-error', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: { message: 'boom' } }),
    });

    expect(response.status).toBe(204);
    expect(log).toHaveBeenCalledWith('Error:', { message: 'boom' });
  });

  it('uses the request origin in the OpenSearch descriptor', async () => {
    const response = await miscRoutes.request('http://localhost:3000/opensearch');
    const xml = await response.text();

    expect(xml).toContain('template="http://localhost:3000?q={searchTerms}"');
  });
});
