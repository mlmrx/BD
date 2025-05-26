# BD Monorepo

This monorepo is managed with pnpm and turborepo.

## Packages

- `apps/web`
- `services/etl`
- `packages/ui`
- `infra`

## Scripts

- `pnpm build` – run build pipeline with turbo

## Development

Install dependencies:

```sh
pnpm install
```

Run build:

```sh
pnpm build
```

## Ask Dad

The web app now includes an experimental "Ask Dad" chat assistant powered by OpenAI via LangChain. A sample question "Which coin has lowest inflation?" will return an answer with a citation link.
