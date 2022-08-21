import React from 'react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'

export default function Corrector(): JSX.Element {
  const context = useDocusaurusContext()
  const siteConfig = context.siteConfig

  return (
    <Layout
      title={`Corrector`}
      description={siteConfig.customFields.description as string}
    >
      <main>
        <div className="container">
          <h1 className="hero__title">Corrector</h1>
          <textarea style={{ width: '100%', height: '58vh' }} />
        </div>
      </main>
    </Layout>
  )
}
