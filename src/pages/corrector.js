import React from 'react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'

export default function Corrector() {
  const context = useDocusaurusContext()
  const { siteConfig = {} } = context

  // TODO change title and description, I've copied it from index.js
  return (
    <Layout
      title={`Corrector`}
      description={siteConfig.customFields.description}
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
