import React from 'react'
import PropTypes from 'prop-types'
import Layout from './Layout.jsx'
import PostList from './PostList.jsx'

const Posts = ({ posts, title }) => (
  <Layout title={`「${title}」の検索結果`}>
    <PostList posts={posts} title={`「${title}」の検索結果`} />
  </Layout>
)

Posts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
}

Posts.defaultProps = {
  posts: [],
  title: '',
}
export default Posts
