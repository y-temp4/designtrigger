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
    const { fullPath, currentUser, user, posts, is_following, following_count, follower_count } = this.props

    return (
      <Layout title={user.username}>
        <div className="user">
          <div className="container-small">
            <div className="row user-profile-box">
              <div className="column-extra-small-8">
                <h1 className="user-username">{user.username}</h1>
                <p className="user-description">{user.description}</p>
                <a
                  className="user-website"
                  href={user.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {user.website_url}
                </a>
                <p>
                  <Link href={`/@${user.username}/followees`}>{following_count} Following </Link>
                  |
                  <Link href={`/@${user.username}/followers`}> {follower_count} Followers</Link>
                </p>
                { currentUser && currentUser.id !== user.id ?
                  is_following ?
                    <Link
                      onClick={this.handleUnfollow.bind(this)}
                      className="button active"
                      href={fullPath}
                    >Following</Link> :
                    <Link
                      onClick={this.handleFollow.bind(this)}
                      className="button"
                      href={fullPath}
                    >Follow</Link>
                  :
                  null
                }
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
}
