import React from 'react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'

export default function Corrector(): JSX.Element {
  const context = useDocusaurusContext()
  const siteConfig = context.siteConfig

  const copyToClipboard = React.useCallback(() => {
    navigator.clipboard.writeText('→')
  }, [])

  return (
    <Layout
      title={`Corrector`}
      description={siteConfig.customFields.description as string}
    >
      <main>
        <div className="container">
          <h1 className="hero__title">Corrector</h1>
          <a href="https://www.softcatala.org/corrector/">
            Corrector de Softcatalà
          </a>
          <textarea
            style={{ marginTop: '20px', width: '100%', height: '58vh' }}
          />
          <h2>Caràcters</h2>
          <button
            onClick={copyToClipboard}
            style={{ margin: '10px', padding: '5px 10px', cursor: 'pointer' }}
          >
            →
          </button>
        </div>
      </main>
    </Layout>
  )
}
