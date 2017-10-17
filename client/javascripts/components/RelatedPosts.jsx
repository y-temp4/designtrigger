import React from 'react'
import PropTypes from 'prop-types'
import Link from './Link.jsx'

const RelatedPosts = ({ posts }) => (
  posts.map(post => (
    <div className="column-small-4" key={post.id}>
      <div className="user-post-box">
        <div className="container-max">
          <div className="row">
            <div className="column-extra-small-1" style={{ padding: 0, width: '15px' }}>
              <Link href={`/@${post.user.username}`}>
                <img
                  className="header-avatar"
                  src={post.user.profile_image_url}
                  alt={post.user.username}
                  style={{ width: '25px' }}
                />
              </Link>
            </div>
            <div className="column-extra-small-1">
              <Link key={post.id} href={`/@${post.user.username}`}>
                {post.user.username}
              </Link>
            </div>
          </div>
        </div>
        <Link href={`/@${post.user.username}/posts/${post.uuid}`}>
          <h2 className="post-title">
            {post.title}
          </h2>
        </Link>
        <span className="post-body">
          {new Date(post.created_at).toDateString()}
        </span>
      </div>
    </div>
  ))
)

RelatedPosts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
}

RelatedPosts.defaultProps = {
  posts: [],
}

export default RelatedPosts
