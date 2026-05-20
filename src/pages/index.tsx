import React from 'react'
import clsx from 'clsx'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import useBaseUrl from '@docusaurus/useBaseUrl'
import styles from './index.module.css'
import sidebars from '../../sidebars'

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
                {Array.isArray(sidebars[sidebarName]) ? (
                  // @ts-ignore
                  sidebars[sidebarName].map((sidebarItem) =>
                    typeof sidebarItem === 'string' ? (
                      <DocLink key={sidebarItem} to={sidebarItem} />
                    ) : typeof sidebarItem === 'object' &&
                      sidebarItem.type === 'category' ? (
                      // https://docusaurus.io/docs/sidebar/items#generated-index-page
                      <div key={sidebarItem.label}>
                        <h3>{sidebarItem.label}</h3>
                        {sidebarItem.items.map((subItem: string) => (
                          <DocLink key={subItem} to={subItem} />
                        ))}
                      </div>
                    ) : typeof sidebarItem === 'object' &&
                      sidebarItem.type === undefined ? (
                      // https://docusaurus.io/docs/sidebar/items#category-shorthand
                      <div key={Object.keys(sidebarItem)[0]}>
                        <h3>{Object.keys(sidebarItem)[0]}</h3>
                        {sidebarItem[Object.keys(sidebarItem)[0]].map(
                          (subItem: string) => (
                            <DocLink key={subItem} to={subItem} />
                          )
                        )}
                      </div>
                    ) : (
                      <p>Warning: unexpected item type</p>
                    )
                  )
                ) : (
                  <p>{`Warning sidebars[${sidebars[sidebarName]}] is not an array`}</p>
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
        {/* <HomepageFeatures /> */}
      </main>
    </Layout>
  )
}
