import React from 'react'
import PropTypes from 'prop-types'
import Layout from './Layout.jsx'
import PostList from './PostList.jsx'

const TagLikedPosts = ({ posts, tag }) => {
  const title = `タグ「${tag}」の記事一覧`

  return (
    <Layout title={title}>
      <PostList posts={posts} title={title} />
    </Layout>
  )
}

TagLikedPosts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
  tag: PropTypes.string.isRequired,
}

TagLikedPosts.defaultProps = {
  posts: [],
}
export default TagLikedPosts
