import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

export default function Corrector() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;

  // TODO change title and description, I've copied it from index.js
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="The personal Wiki of Albert Vila Calvo">
      <main>
        <div className="container">
          <h1>Corrector</h1>
          <textarea style={{width: '100%', height: '58vh'}} />
        </div>
      </main>
    </Layout>
  );
}
