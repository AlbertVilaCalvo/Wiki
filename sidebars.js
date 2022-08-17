// https://docusaurus.io/docs/sidebar
module.exports = {
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
    'dev/javascript',
    'dev/typescript',
    'dev/node',
    'dev/express',
    'dev/react',
    'dev/nextjs',
    'dev/docusaurus',
    'dev/prettier',
    'dev/eslint',
    'dev/git-hooks',
    'dev/jetbrains',
    'dev/python',
    'dev/go',
    'dev/cryptography',
    'dev/authentication',
    'dev/authorization',
    'dev/passwords',
    'dev/jwt',
    'dev/oauth',
    'dev/functional-programming',
  ],
  app: [
    'app/app',
    'app/android',
    'app/ios',
    'app/react-native',
    'app/expo',
    'app/mobx',
  ],
  devops: [
    'devops/docker',
    'devops/kubernetes',
    {
      type: 'category',
      label: 'AWS',
      link: {
        type: 'generated-index',
        title: 'AWS',
        description: 'Amazon Web Services',
      },
      collapsed: false,
      items: [
        'devops/aws/aws',
        'devops/aws/cli',
        'devops/aws/iam',
        'devops/aws/ec2',
        'devops/aws/eks',
        'devops/aws/s3',
        'devops/aws/cloudformation',
        'devops/aws/codepipeline',
        'devops/aws/codebuild',
      ],
    },
    'devops/heroku',
    'devops/github-actions',
  ],
  http: [
    'http/http',
    'http/https',
    'http/dns',
    'http/rest-api',
    'http/cors',
    'http/csp',
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
    'css/reset',
    'css/flexbox',
    'css/text',
    'css/misc'
  ],
  databases: [
    'databases/databases',
    'databases/sql',
    'databases/postgresql',
    'databases/mongodb',
  ],
  misc: [
    'misc/battery',
    'misc/macos',
    'misc/hosts',
    'misc/markdown',
  ],
  disseny: [
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
