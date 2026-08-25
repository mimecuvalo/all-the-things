<h1 align="center">
  🔮 Project Name
</h1>
<blockquote align="center">
  Quick blurb.
</blockquote>

<p align="center">
  <a href="https://github.com/mimecuvalo/all-the-things-example/actions"><img src="https://github.com/mimecuvalo/all-the-things-example/actions/workflows/ci.yml/badge.svg" alt="CI status" /></a>
  <a href="https://github.com/githubusername/project/docs/license.md"><img src="https://img.shields.io/badge/license-MIT-brightgreen.svg" alt="license" /></a>
</p>

## 📯 Description

Write your stunning description here.

## 💾 Install

This is a project bootstrapped with [`all-the-things`](https://github.com/mimecuvalo/all-the-things).

```sh
yarn
```

_Prerequisites: Node 14+ if you want proper internationalization (i18n) support (via full-icu)._

## Getting Started

First, run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To run tests:

```sh
bun run test
```

To setup your DB:

```sh
cp prisma/.env.example prisma/.env
```

and set DATABASE_URL=postgresql://postgres:password@databasedomain.com:PORT/postgres

Then, to sync your DB:

```sh
npx prisma db push
```

To view your DB locally:

```sh
npx prisma studio
```

To learn more about Prisma, read the docs [here](https://www.prisma.io/).
Supabase is pretty great to get a good Postgres DB: https://app.supabase.io/

To add your name/email to relevant files:

```sh
bun run config
```

## 📙 Learn More

### [Changelog](changelog.md)

### [Code of Conduct](code_of_conduct.md)

### [Contributing](contributing.md)

### [Contributors](contributors.md)

### [Support](support.md)

## 📜 License

[MIT](license.md)

(The format is based on [Make a README](https://www.makeareadme.com/))
