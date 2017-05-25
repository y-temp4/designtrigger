import React from 'react'
import gravatar from 'gravatar'
import Layout from './Layout.jsx'
import Link from './Link.jsx'

export default class User extends React.Component {

  render() {
    const { user, posts } = this.props

    return (
      <Layout>
        <div className="user">
          <div className="container-small">
            <div className="row user-profile-box">
              <div className="column-extra-small-8">
                <h1 className="user-username">{user.username}</h1>
              </div>
              <div className="column-extra-small-4 user-profile-image-box">
                <img
                  className="user-avatar"
                  src={gravatar.url(user.email, { s: '100' })}
                  alt={user.username}
                />
              </div>
            </div>
            <div className="row user-posts-box">
              <div className="column-small-12">
                <h2>{user.username}{"'"}s posts</h2>
                {posts.map((post) => {
                  return (
                    <Link key={post.id} href={`/@${user.username}/${post.id}`}>
                      <div className="user-post-box">
                        <h2 className="post-title">
                          {post.title}
                        </h2>
                        <span className="post-body">
                          {new Date(post.created_at).toDateString()}
                        </span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
