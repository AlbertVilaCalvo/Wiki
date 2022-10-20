import React from 'react'
import clsx from 'clsx'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import useBaseUrl from '@docusaurus/useBaseUrl'
import styles from './index.module.css'
import sidebars from '../../sidebars'

const features = [
  {
    title: 'Easy to Use',
    imageUrl: 'img/undraw_docusaurus_mountain.svg',
    description: (
      <>
        Docusaurus was designed from the ground up to be easily installed and
        used to get your website up and running quickly.
      </>
    ),
  },
  {
    title: 'Focus on What Matters',
    imageUrl: 'img/undraw_docusaurus_tree.svg',
    description: (
      <>
        Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
        ahead and move your docs into the <code>docs</code> directory.
      </>
    ),
  },
  {
    title: 'Powered by React',
    imageUrl: 'img/undraw_docusaurus_react.svg',
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header and footer.
      </>
    ),
  },
]

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl)
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        {/* Originally was {siteConfig.title} */}
        <h1 className="hero__title">Welcome to my Wiki</h1>
        <p className="hero__title">👋</p>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        {/*
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--secondary button--lg',
                styles.getStarted
              )}
              to={useBaseUrl('cli/git')}
            >
              Get Started
            </Link>
          </div>
          */}
      </div>
    </header>
  )
}

function DocIndex() {
  return (
    <div className="container">
      <div className={styles.docGridHome}>
        {Object.keys(sidebars)
          .filter((sidebarName) => sidebarName !== 'docs')
          .map((sidebarName) => (
            <div key={sidebarName}>
              <h2>{sidebarName}</h2>
              <div>
                {Array.isArray(sidebars[sidebarName]) &&
                  // @ts-ignore
                  sidebars[sidebarName].map((sidebarItem) =>
                    typeof sidebarItem === 'string' ? (
                      <DocLink key={sidebarItem} to={sidebarItem} />
                    ) : typeof sidebarItem === 'object' ? (
                      <div key={sidebarItem.label}>
                        <h3>{sidebarItem.label}</h3>
                        {sidebarItem.items.map((subItem) => (
                          <DocLink key={subItem} to={subItem} />
                        ))}
                      </div>
                    ) : (
                      <p>Warning: unexpected item type</p>
                    )
                  )}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

function DocLink({ to, ...props }: { to: string }) {
  return (
    <a href={to} {...props} className={styles.docLink}>
      {to}
    </a>
  )
}

export default function Home(): JSX.Element {
  const context = useDocusaurusContext()
  const siteConfig = context.siteConfig

  return (
    <Layout
      // Originally was `Hello from ${siteConfig.title}`
      title={`Welcome to my Wiki`}
      // 'description' will go into a meta tag in <head />
      description={siteConfig.customFields.description as string}
    >
      <HomepageHeader />
      <main>
        <DocIndex />
        {/*
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
        */}
      </main>
    </Layout>
  )
}
