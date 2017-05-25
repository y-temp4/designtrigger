import React from 'react'
import gravatar from 'gravatar'
import Layout from './Layout.jsx'
import Link from './Link.jsx'

export default class Posts extends React.Component {

  render() {
    return (
      <Layout>
        <div className="container">
          <ul>
            {this.props.posts.map((post) => {
              return (
                <li key={post.id}>
                  <Link href={`/@${post.username}/${post.id}`}>
                    {post.title}
                  </Link>
                  <span> by <Link href={`/@${post.username}`}>{post.username}</Link></span>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="container-small">
          <div className="row">
            <div className="column-small-10 offset-small-1">
              <h1>Posts</h1>
              {this.props.posts.map(post => (
                <div className="user-post-box">
                  <div className="container-max">
                    <div className="row">
                      <div className="column-small-1" style={{ padding: 0, width: '15px' }}>
                        <Link key={post.id} href={`/@${post.user.username}`}>
                          <img
                            className="header-avatar"
                            src={gravatar.url(post.user.email, { s: '25' })}
                            alt={post.user.username}
                            />
                        </Link>
                      </div>
                      <div className="column-small-1">
                        <Link key={post.id} href={`/@${post.user.username}`}>
                          {post.user.username}
                        </Link>
                      </div>
                    </div>
                  </div>
                  <Link key={post.id} href={`/@${post.username}/${post.id}`}>
                    <h2 className="post-title">
                      {post.title}
                    </h2>
                  </Link>
                  <span className="post-body">
                    {new Date(post.created_at).toDateString()}
                  </span>
                </div>),
              )}
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
