import React from 'react'
import gravatar from 'gravatar'
import Layout from './Layout.jsx'
import Link from './Link.jsx'
import PostList from './PostList.jsx'

export default class Posts extends React.Component {

  render() {
    return (
      <Layout title="記事一覧">
        <PostList posts={this.props.posts} />
      </Layout>
    )
  }
}
