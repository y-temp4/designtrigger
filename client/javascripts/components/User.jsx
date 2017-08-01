import React from 'react'
import gravatar from 'gravatar'
import Layout from './Layout.jsx'
import Link from './Link.jsx'
import { sendPost, sendDelete } from '../libs/client-methods.js'

export default class User extends React.Component {

  handleFollow() {
    const user_id = this.props.user.id

    sendPost('/follow', { follow: { user_id } })
  }

  handleUnfollow() {
    const user_id = this.props.user.id

    sendDelete('/unfollow', { params: { userId: user_id } })
  }

  render() {
    const { currentUser, user, posts, is_following } = this.props

    return (
      <Layout title={user.username}>
        <div className="user">
          <div className="container-small">
            <div className="row user-profile-box">
              <div className="column-extra-small-8">
                <h1 className="user-username">{user.username}</h1>
                { currentUser && currentUser.id !== user.id ?
                  is_following ?
                    <Link
                      onClick={this.handleUnfollow.bind(this)}
                      className="button active"
                      href={`/@${user.username}`}
                    >Following</Link> :
                    <Link
                      onClick={this.handleFollow.bind(this)}
                      className="button"
                      href={`/@${user.username}`}
                    >Follow</Link>
                  :
                  null
                }
                <p className="user-description">{user.description}</p>
                <a
                  className="user-website"
                  href={user.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {user.website_url}
                </a>
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
                {posts.map(post => (
                  <Link key={post.id} href={`/@${user.username}/${post.uuid}`}>
                    <div className="user-post-box">
                      <h2 className="post-title">
                        {post.title}
                      </h2>
                      <span className="post-body">
                        {new Date(post.created_at).toDateString()}
                      </span>
                    </div>
                  </Link>),
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
