// https://docusaurus.io/docs/sidebar
module.exports = {
  cli: [
    'cli/git',
    'cli/github-pr',
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
    'dev/react',
    'dev/docusaurus',
    'dev/prettier',
    'dev/eslint',
    'dev/git-hooks',
    'dev/jetbrains',
    'dev/python',
    'dev/passwords',
    'dev/jwt',
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
        description: 'Amazon Web Servicess',
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
  ],
  http: [
    'http/http',
    'http/rest-api',
    'http/cors',
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
    'css/reset',
    'css/flexbox',
    'css/text',
    'css/misc'
  ],
  databases: [
    'databases/databases',
    'databases/sql',
    'databases/postgresql',
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
