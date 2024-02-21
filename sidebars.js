// @ts-check

// https://docusaurus.io/docs/sidebar

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  cli: [
    'cli/git',
    'cli/github-pr',
    'cli/github',
    'cli/commands',
    'cli/filesystem-permissions-acl',
    'cli/brew',
    'cli/ohmyzsh',
    'cli/npm',
    'cli/yarn',
    'cli/nvm',
    'cli/gradle',
    'cli/curl',
  ],
  dev: [
    'dev/tools-and-resources',
    'dev/testing',
    'dev/node',
    'dev/express',
    'dev/react',
    'dev/nextjs',
    'dev/astro',
    'dev/docusaurus',
    'dev/strapi',
    'dev/prettier',
    'dev/git-hooks',
    'dev/postman',
    'dev/jetbrains',
    'dev/vscode',
    'dev/emacs',
    'dev/python',
    'dev/go',
    'dev/php',
    'dev/cryptography',
    'dev/email',
    'dev/date-time',
    'dev/functional-programming',
    'dev/wordpress',
    'dev/nx',
  ],
  js: [
    'javascript/javascript',
    'javascript/array',
    'javascript/promise',
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
    'cloud/system-design',
    'cloud/service-discovery',
    'cloud/observability',
    'cloud/grpc',
    'cloud/kafka',
    'cloud/argocd',
    'cloud/gcp',
  ],
  aws: [
    'aws/aws',
    'aws/billing-pricing',
    'aws/cli',
    'aws/iam',
    'aws/vpc',
    'aws/ec2',
    'aws/eks',
    'aws/ecs',
    'aws/fargate',
    'aws/app-runner',
    'aws/lambda',
    'aws/s3',
    'aws/cloudfront',
    'aws/route53',
    'aws/cloudformation',
    'aws/cloud-development-kit',
    'aws/codepipeline',
    'aws/codebuild',
    'aws/well-architected-framework',
    'aws/sns',
    'aws/sqs',
    // https://docusaurus.io/docs/sidebar/items#category-shorthand
    {
      Certifications: [
        'aws/certifications/cloud-practitioner'
      ]
    },
    // Alternatively, we could have a Generated index page:
    // https://docusaurus.io/docs/sidebar/items#generated-index-page
    // {
    //   type: 'category',
    //   label: 'Certifications',
    //   collapsed: false,
    //   link: {
    //     type: 'generated-index',
    //     title: 'AWS Certifications',
    //     // description: 'Some description',
    //     slug: '/aws/certifications',
    //     // keywords: ['aws'],
    //     // image: '/img/logo.svg',
    //   },
    //   items: ['aws/certifications/cloud-practitioner'],
    // },
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
    'web/images',
    'web/cloudinary',
    'web/favicon',
    'web/performance',
    'web/accessibility',
    'web/chrome-devtools',
    'web/xss',
    'web/csrf',
    'web/view-transitions',
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
    'css/units',
    'css/custom-properties',
    'css/media-queries',
    'css/container-queries',
    'css/reset',
    'css/layout',
    'css/flexbox',
    'css/grid',
    'css/text',
    'css/fonts',
    'css/animations',
    'css/misc',
    'css/divider',
    'css/gradient',
  ],
  databases: [
    'databases/databases',
    'databases/sql',
    'databases/postgresql',
    'databases/mysql',
    'databases/mongodb',
    'databases/redis',
    'databases/dynamodb',
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
    'misc/wikis',
  ],
  disseny: [
    'disseny/ui',
    'disseny/color',
    'disseny/tipografia',
    'disseny/animations',
    'disseny/social-media',
    'disseny/image-formats',
    'disseny/gimp',
  ],
  ux: [
    'ux/ux',
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
