// @ts-check

// https://docusaurus.io/docs/sidebar

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  cli: [
    'cli/git',
    'cli/github-pr',
    'cli/github',
    'cli/commands',
    'cli/brew',
    'cli/ohmyzsh',
    'cli/npm',
    'cli/yarn',
    'cli/nvm',
    'cli/gradle',
    'cli/curl',
  ],
  dev: [
    'dev/dev',
    'dev/testing',
    'dev/node',
    'dev/express',
    'dev/react',
    'dev/nextjs',
    'dev/docusaurus',
    'dev/prettier',
    'dev/git-hooks',
    'dev/jetbrains',
    'dev/vscode',
    'dev/python',
    'dev/go',
    'dev/php',
    'dev/cryptography',
    'dev/email',
    'dev/functional-programming',
    'dev/wordpress',
  ],
  js: [
    'javascript/javascript',
    'javascript/array',
    'javascript/modules',
    'javascript/typescript',
    'javascript/eslint',
    'javascript/jest',
  ],
  app: [
    'app/app',
    'app/android',
    'app/ios',
    'app/react-native',
    'app/expo',
    'app/mobx',
  ],
  cloud: [
    'cloud/cloud',
    'cloud/docker',
    'cloud/kubernetes',
    'cloud/terraform',
    'cloud/heroku',
    'cloud/github-actions',
  ],
  aws: [
    'aws/aws',
    'aws/cli',
    'aws/iam',
    'aws/ec2',
    'aws/eks',
    'aws/ecs',
    'aws/s3',
    'aws/cloudfront',
    'aws/route53',
    'aws/cloudformation',
    'aws/codepipeline',
    'aws/codebuild',
    'aws/well-architected-framework',
  ],
  http: [
    'http/http',
    'http/https',
    'http/headers',
    'http/cookies',
    'http/dns',
    'http/rest-api',
    'http/graphql',
    'http/cors',
    'http/csp',
  ],
  web: [
    'web/chrome-devtools',
    'web/xss',
    'web/csrf',
  ],
  html: [
    'html/html',
    'html/elements',
    'html/forms',
    'html/dom-api',
  ],
  css: [
    'css/css',
    'css/selectors',
    'css/media-queries',
    'css/container-queries',
    'css/reset',
    'css/layout',
    'css/flexbox',
    'css/grid',
    'css/text',
    'css/misc'
  ],
  databases: [
    'databases/databases',
    'databases/sql',
    'databases/postgresql',
    'databases/mongodb',
  ],
  auth: [
    'auth/authentication',
    'auth/authorization',
    'auth/passwords',
    'auth/jwt',
    'auth/oauth',
  ],
  misc: [
    'misc/battery',
    'misc/macos',
    'misc/hosts',
    'misc/youtube-dl',
    'misc/markdown',
  ],
  disseny: [
    'disseny/ui',
    'disseny/color',
    'disseny/tipografia',
  ],
  log: [
    'log/talks',
    'log/articles',
    'log/courses',
  ],
  docs: {
    Docusaurus: ['docs/doc1', 'docs/doc2', 'docs/doc3'],
    Features: ['docs/mdx'],
    'Docusaurus Tutorial': [
      'docs/create-a-page',
      'docs/create-a-document',
      'docs/markdown-features',
    ],
  },
}

module.exports = sidebars;
