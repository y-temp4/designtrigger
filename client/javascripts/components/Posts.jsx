import React from 'react'
import PropTypes from 'prop-types'
import Layout from './Layout.jsx'
import PostList from './PostList.jsx'

const Posts = ({ posts }) => (
  <Layout title="記事一覧">
    <PostList posts={posts} />
  </Layout>
)

Posts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
}

Posts.defaultProps = {
  posts: [],
}
export default Posts
