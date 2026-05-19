---
title: pnpm
---

:::tip
Use https://github.com/nodejs/corepack to use Yarn, npm, and pnpm without having to install them. It comes with Node.js.

For example, `corepack enable pnpm`.
:::

## Security

https://pnpm.io/supply-chain-security

https://docusaurus.io/blog/releases/3.10#secure-your-site

> Here's a pnpm config example that should work well with Docusaurus:

```yaml title="pnpm-workspace.yaml"
minimumReleaseAge: 10080

blockExoticSubdeps: true

strictDepBuilds: true
allowBuilds:
  '@swc/core': true
  core-js-pure: true
  core-js: true

trustPolicy: no-downgrade
trustPolicyExclude:
  - 'detect-port@1.6.1'
  - 'semver@6.3.1'
```

How We're Protecting Our Newsroom from npm Supply Chain Attacks - https://pnpm.io/blog/2025/12/05/newsroom-npm-supply-chain-security

- Block lifecycle scripts
- minimumReleaseAge
- trustPolicy

Minimum Release Age is an Underrated Supply Chain Defense - https://daniakash.com/posts/simplest-supply-chain-defense/

> a 7-day release-age gate would likely have blocked installs in 11 short-lived malicious publish cases

> It’s not a substitute for:
>
> - Lockfiles and `npm ci` / `pnpm install --frozen-lockfile`
> - `--ignore-scripts` in CI/CD to block postinstall hooks
> - SHA-pinned GitHub Actions
> - Provenance verification and artifact attestations
> - Behavioral analysis tools like Socket.dev
