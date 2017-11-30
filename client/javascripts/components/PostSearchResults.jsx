import React from 'react'
import PropTypes from 'prop-types'
import Layout from './Layout.jsx'
import PostList from './PostList.jsx'
import PostSearchForm from './PostSearchForm.jsx'

const Posts = ({ posts, title }) => {
  if (posts && title) {
    return (
      <Layout title={`「${title}」の検索結果`}>
        <PostList posts={posts} title={`「${title}」の検索結果`} />
      </Layout>
    )
  }
  return (
    <Layout title="検索">
      <div className="container">
        <div className="row">
          <div className="column-small-12 search search-box">
            <PostSearchForm focus />
          </div>
        </div>
      </div>
    </Layout>
  )
}

Posts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
}

Posts.defaultProps = {
  posts: [],
  title: '',
}
export default Posts
