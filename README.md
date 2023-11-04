<h1 align="center">
  🔮 Next.js, ✨ ALL THE THINGS ✨ edition
</h1>

<p align="center">
  <a href="https://github.com/mimecuvalo/all-the-things/actions"><img src="https://github.com/mimecuvalo/all-the-things/actions/workflows/ci.yml/badge.svg" alt="CI status" /></a>
  <a href="https://github.com/prettier/prettier"><img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg" alt="prettier status" /></a>
  <a href="https://github.com/mimecuvalo/all-the-things/docs/license.md"><img src="https://img.shields.io/badge/license-MIT-brightgreen.svg" alt="license" /></a>
</p>

<strong>NOTE: still under active development and I'm not currently providing backwards compatibility until things stabilize.</strong>

## 📯 Description

This template includes scripts and configuration used by [Next.js](https://nextjs.org/) but with LOTS more bells 🔔 and whistles 😗.

## ⚡ Features

- ♿ **accessibility (a11y) analyzer**: via [axe](https://www.google.com/search?q=axe-core&oq=axe-core&aqs=chrome..69i57.1485j0j7&sourceid=chrome&ie=UTF-8). in the bottom corner of CRA you’ll see a menu that will give you a list of items your site is violating in terms of a11y.
- 🔐 **authentication**: via [Auth0](https://auth0.com/). gives you the ability to login using Google/Facebook.
- 🔎 **bundle size analyzer**: via [source-map-explorer](https://www.npmjs.com/package/source-map-explorer). do `yarn analyze` after creating a build.
- 🛠️ **component Libary (UI)**: via [Material-UI](https://mui.com/).
- 🔐 **CSP nonce**
- 📚 **documentation**: adds some standard and GitHub-specific Markdown files using best practices. files include:
  - [changelog](https://keepachangelog.com)
  - [code of conduct](https://www.contributor-covenant.org)
  - [code owners](https://help.github.com/articles/about-code-owners/) (GitHub-specific)
  - contributing: based off of [Atom’s](https://github.com/atom/atom/blob/master/CONTRIBUTING.md).
  - contributors
  - [issue template](https://help.github.com/articles/about-issue-and-pull-request-templates/) (GitHub-specific)
  - license
  - [pull request template](https://help.github.com/articles/about-issue-and-pull-request-templates/) (GitHub-specific)
  - [readme](https://www.makeareadme.com/)
  - [support](https://help.github.com/articles/adding-support-resources-to-your-project/) (GitHub-specific)
  - [alex](https://alexjs.com/) for more inclusive, equitable docs.
- 🚫 **error boundary**: adds a top-level one to the app. (see [doc](https://reactjs.org/docs/error-boundaries.html)).
- ❌ **error pages**: [401](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401), [404](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404), [500](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500).
- 🆘 **error reporting**: listens to `window.onerror` and reports JS errors to the server for debugging.
- 🧑‍🔬 **experiments framework**: allows you to add experiments quickly via a React component and hooks.
- 🧑‍🚀 **GraphQL/Apollo**: adds [GraphQL](https://graphql.org) and [Apollo](https://apollographql.com).
  - for GraphQL adds [GraphQL code gen](https://www.graphql-code-generator.com/).
- 🫶 [**humans.txt**](http://humanstxt.org/) **/** [**robots.txt**](http://www.robotstxt.org/): adds stubs of these files.
- ✅ **health checks**: runs a client health check every 5 minutes to see if the client is still valid.
- 🌐 **i18n**: via [react-intl](https://github.com/yahoo/react-intl/wiki#getting-started) and extraction tools.
- 🗜️ **imports**: absolute imports are turned on.
- 💽 **ORM**: via [prisma](https://www.prisma.io/).
- 📏 **perf indicator**: in the bottom corner of the app, it will display render times. (also has [web vitals](https://web.dev/vitals/) built in.)
- ✨ [**Prettier**](https://prettier.io): adds linting upon commit. also sorts imports via [prettier-plugin-import-sort](https://www.npmjs.com/package/prettier-plugin-import-sort).
- 🪩 [**React Spring**](https://www.react-spring.io/): for great animation using a React hook.
- 🆘 [**Sentry**](https://sentry.io/): exception collection and analysis.
- 💅 **styleguide**: via [Storybook](https://storybook.js.org).

## 💾 Install

```sh
yarn create next-app --typescript --example https://github.com/mimecuvalo/all-the-things
```

or, Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fmimecuvalo%2Fall-the-things)

Then, to run your newly created server locally:

```sh
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 👉 See main [readme.md](https://github.com/mimecuvalo/all-the-things/blob/main/docs/readme.md) for more details on running! 👈

## 📜 License

[MIT](license.md)

(The format is based on [Make a README](https://www.makeareadme.com/))
