import type { SidebarsConfig } from '@docusaurus/plugin-content-docs'

// https://docusaurus.io/docs/sidebar

const sidebars: SidebarsConfig = {
  // TODO mirar Autogenerated sidebar: https://docusaurus.io/docs/sidebar/autogenerated
  git: ['git/git', 'git/commands', 'git/hooks', 'git/github', 'git/github-pr'],
  cli: [
    'cli/commands',
    'cli/ssh',
    'cli/shell-scripts',
    'cli/tools',
    'cli/filesystem-permissions-acl',
    'cli/ohmyzsh',
    'cli/brew',
    'cli/npm',
    'cli/yarn',
    'cli/nvm',
    'cli/gradle',
    'cli/curl',
    'cli/nano',
  ],
  dev: [
    'dev/tools-and-resources',
    'dev/github-copilot',
    'dev/testing',
    'dev/node',
    'dev/express',
    'dev/react',
    'dev/nextjs',
    'dev/astro',
    'dev/docusaurus',
    'dev/strapi',
    'dev/prettier',
    'dev/postman',
    'dev/jetbrains',
    'dev/vscode',
    'dev/emacs',
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
    'cloud/devops',
    'cloud/docker',
    'cloud/kubernetes',
    'cloud/terraform',
    'cloud/terraform-aws',
    'cloud/heroku',
    'cloud/github-actions',
    'cloud/backend',
    'cloud/microservices',
    'cloud/system-design',
    'cloud/service-discovery',
    'cloud/observability',
    'cloud/grpc',
    'cloud/kafka',
    'cloud/argocd',
    'cloud/gcp',
    'cloud/azure',
  ],
  aws: [
    'aws/aws',
    'aws/billing-pricing',
    'aws/security',
    'aws/cli',
    'aws/iam',
    'aws/root-user',
    'aws/scp',
    'aws/organizations',
    'aws/sts',
    'aws/cloudwatch',
    'aws/vpc',
    'aws/ec2',
    'aws/ec2-auto-scaling',
    'aws/eks',
    'aws/ecs',
    'aws/fargate',
    'aws/app-runner',
    'aws/lambda',
    'aws/s3',
    'aws/cloudfront',
    'aws/route53',
    'aws/rds',
    'aws/aurora',
    'aws/cloudformation',
    'aws/cloud-development-kit',
    'aws/codepipeline',
    'aws/codebuild',
    'aws/well-architected-framework',
    'aws/serverless',
    'aws/eventbridge',
    'aws/sns',
    'aws/sqs',
    // https://docusaurus.io/docs/sidebar/items#category-shorthand
    {
      Certifications: [
        'aws/certifications/cloud-practitioner',
        'aws/certifications/solutions-architect-associate',
        'aws/certifications/developer-associate',
        'aws/certifications/sysops-administrator-associate',
      ],
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
    'web/web',
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
  html: ['html/html', 'html/elements', 'html/forms', 'html/dom-api'],
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
    'css/dark-mode',
  ],
  databases: [
    'databases/databases',
    'databases/sql',
    'databases/relational-db-design',
    'databases/postgresql',
    'databases/mysql',
    'databases/mongodb',
    'databases/redis',
    'databases/dynamodb',
  ],
  python: ['python/python', 'python/tools'],
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
    'disseny/disseny',
    'disseny/ui',
    'disseny/color',
    'disseny/tipografia',
    'disseny/animations',
    'disseny/social-media',
    'disseny/image-formats',
    'disseny/svg',
    'disseny/gimp',
    'disseny/inkscape',
  ],
  ux: ['ux/ux'],
  log: ['log/talks', 'log/articles', 'log/courses'],
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

export default sidebars
