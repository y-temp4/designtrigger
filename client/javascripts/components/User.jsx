import React from 'react'
import PropTypes from 'prop-types'
import Layout from './Layout.jsx'
import Link from './Link.jsx'
import UserInfo from './UserInfo.jsx'

const User = (props) => {
  const { user, posts } = props

  return (
    <Layout title={user.username}>
      <div className="user">
        <div className="container-small">
          <UserInfo {...props} />
          <div className="row user-posts-box">
            <div className="column-small-12">
              <h2>{user.username}{"'"}s posts</h2>
              { posts.length !== 0 ?
                posts.map(post => (
                  <Link key={post.id} href={`/@${user.username}/posts/${post.uuid}`}>
                    <div className="user-post-box">
                      <h2 className="post-title">
                        {post.title}
                      </h2>
                      <span className="post-body">
                        {new Date(post.created_at).toDateString()}
                      </span>
                    </div>
                  </Link>),
                ) : <p>No posts yet.</p>}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

User.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.object,
  ),
}

User.defaultProps = {
  posts: [],
}

export default User
