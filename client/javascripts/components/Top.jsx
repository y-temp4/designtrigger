import React from 'react'
import Layout from './Layout.jsx'
import Link from './Link.jsx'

export default class Top extends React.Component {
  render() {
    return (
      <Layout>
        <div className="container">
          <h1>トップページです</h1>
          <Link href="/posts">
            記事一覧へ
          </Link>
        </div>
      </Layout>
    )
  }
}
