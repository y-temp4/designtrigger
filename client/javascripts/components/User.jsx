import React from 'react'
import gravatar from 'gravatar'
import Layout from './Layout.jsx'
import Link from './Link.jsx'


export default class User extends React.Component {

  render() {
    return (
      <Layout>
        <div className="user">
          <div className="container-small">
            <div className="row user-profile-box">
              <div className="column-small-9">
                <h1 className="user-username">{this.props.user.username}</h1>
              </div>
              <div className="column-small-3">
                <img
                  className="user-avatar"
                  src={gravatar.url(this.props.currentUser.email, { s: '100' })}
                  alt={this.props.user.username}
                />
              </div>
            </div>
            <div className="row user-posts-box">
              <div className="column-small-12">
                <h2>{this.props.user.username}{"'"}s posts</h2>
                {this.props.posts.map((post) => {
                  return (
                    <Link href={`/@${this.props.user.username}/${post.id}`}>
                      <div className="user-post-box">
                        <h2 className="post-title">
                          {post.title}
                        </h2>
                        <span className="post-body">
                          created at {post.created_at}
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
