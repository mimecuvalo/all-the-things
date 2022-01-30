const CircularDependencyPlugin = require('circular-dependency-plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  webpack: (config, options) => {
    config.plugins.push(
      new CircularDependencyPlugin({
        // exclude detection of files based on a RegExp
        exclude: /node_modules/,
        // include specific files based on a RegExp
        //include: /client|server|shared/,
        // add errors to webpack instead of warnings
        failOnError: true,
        // allow import cycles that include an asyncronous import,
        // e.g. via import(/* webpackMode: "weak" */ './file.js')
        allowAsyncCycles: false,
        // set the current working directory for displaying module paths
        cwd: process.cwd(),
      })
    );

    return config;
  },

  async headers() {
    const isDevelopment = process.env.NODE_ENV === 'development';
    const cspDirectives = {
      'connect-src': [isDevelopment ? '*' : "'self'"],
      'default-src': ["'none'"],
      'font-src': ["'self'", 'https:'],
      'frame-ancestors': ["'self'"],
      'frame-src': ["'self'", 'http:', 'https:'],
      'img-src': ['data:', 'http:', 'https:'],
      'manifest-src': ["'self'"],
      'media-src': ["'self'", 'blob:'],
      'object-src': ["'self'"],
      'report-uri': ['/api/report-csp-violation'],
      'script-src': ["'self'", 'https://cdn.auth0.com', 'https://storage.googleapis.com'].concat(
        isDevelopment ? ["'unsafe-inline'", "'unsafe-eval'"] : []
      ),
      'upgrade-insecure-requests': [],

      // XXX(mime): we have inline styles around - can we pass nonce around the app properly?
      'style-src': ["'self'", 'https:', "'unsafe-inline'"], //(req, res) => `'nonce-${res.locals.nonce}'`],
    };
    const cspValues = Object.keys(cspDirectives)
      .map((directive) => `${directive} ${cspDirectives[directive].join(' ')}`)
      .join('; ');

    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'no-referrer-when-downgrade',
          },
          {
            key: isDevelopment ? 'Content-Security-Policy-Report-Only' : 'Content-Security-Policy',
            value: cspValues,
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
