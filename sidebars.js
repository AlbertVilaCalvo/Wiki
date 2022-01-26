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
    'dev/javascript',
    'dev/typescript',
    'dev/react',
    'dev/react-native',
    'dev/expo',
    'dev/prettier',
    'dev/eslint',
    'dev/git-hooks',
    'dev/http',
    'dev/cors',
    'dev/rest-api',
    'dev/jetbrains',
    'dev/android',
    'dev/ios',
    'dev/python',
    'dev/postgresql',
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
      ],
    },
  ],
  css: [
    'css/reset',
    'css/flexbox',
    'css/misc',
    'css/text'
  ],
  html: [
    'html/misc',
    'html/elements',
    'html/forms',
    'html/dom-api',
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
    ]
  },
};
