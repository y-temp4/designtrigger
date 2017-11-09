import React from 'react'
import PropTypes from 'prop-types'
import Layout from './Layout.jsx'
import UserInfo from './UserInfo.jsx'
import PostList from './PostList.jsx'

const UserLikes = (props) => {
  const { user, posts } = props
  const title = `${user.username}'s likes`

  return (
    <Layout title={title}>
      <div className="user">
        <div className="container-small">
          <UserInfo {...props} />
          { posts.length !== 0 ?
            <PostList posts={posts} title={title} />
            : <p>No likes yet.</p>
          }
        </div>
      </div>
    </Layout>
  )
}

UserLikes.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape,
  ),
}

UserLikes.defaultProps = {
  posts: [],
}

export default UserLikes
