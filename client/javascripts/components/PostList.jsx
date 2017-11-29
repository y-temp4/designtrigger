import React from 'react'
import PropTypes from 'prop-types'
import Link from './Link.jsx'

const PostList = ({ posts, title }) => (
  <div className="container-small">
    <div className="row">
      <div className="column-small-10 offset-small-1">
        <h2>{title}</h2>
        { posts.length !== 0 ?
          posts.map(post => (
            <div key={post.id} className="user-post-box">
              <div className="container-max">
                {post.top_image_url && (<div className="row" style={{ margin: '-1em -2em 1em -2em' }}>
                  <div className="column-extra-small-12" style={{ padding: 0 }}>
                    <Link key={post.id} href={`/@${post.user.username}/posts/${post.uuid}`}>
                      <img src={post.top_image_url} alt="" style={{ maxWidth: '100%' }} />
                    </Link>
                  </div>
                </div>)}
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
              <Link key={post.id} href={`/@${post.user.username}/posts/${post.uuid}`}>
                <h2 className="post-title">
                  {post.title}
                </h2>
              </Link>
              <span className="post-body">
                {new Date(post.created_at).toDateString()}
              </span>
            </div>),
          ) : <p>記事がありません。</p>}
      </div>
    </div>
  </div>
)

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
}

PostList.defaultProps = {
  posts: [],
  title: 'Posts',
}

export default PostList
