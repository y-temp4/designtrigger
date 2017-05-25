import React from 'react'
import gravatar from 'gravatar'
import Layout from './Layout.jsx'
import Link from './Link.jsx'

export default class Posts extends React.Component {

  render() {
    return (
      <Layout title="記事一覧">
        <div className="container-small">
          <div className="row">
            <div className="column-small-10 offset-small-1">
              <h1>Posts</h1>
              {this.props.posts.map(post => (
                <div key={post.id} className="user-post-box">
                  <div className="container-max">
                    <div className="row">
                      <div className="column-extra-small-1" style={{ padding: 0, width: '15px' }}>
                        <Link href={`/@${post.user.username}`}>
                          <img
                            className="header-avatar"
                            src={gravatar.url(post.user.email, { s: '25' })}
                            alt={post.user.username}
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
