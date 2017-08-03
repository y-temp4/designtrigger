import React from 'react'
import gravatar from 'gravatar'
import Link from './Link.jsx'
import { sendPost, sendDelete } from '../libs/client-methods.js'

export default class UserInfo extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      is_following: this.props.is_following,
    }
  }

  handleFollow() {
    const user_id = this.props.user.id

    this.setState({ is_following: !this.state.is_following })
    sendPost('/follow', { follow: { user_id } })
  }

  handleUnfollow() {
    const user_id = this.props.user.id

    this.setState({ is_following: !this.state.is_following })
    sendDelete('/unfollow', { params: { userId: user_id } })
  }

  render() {
    const { fullPath, currentUser, user, is_following, following_count, follower_count } = this.props

    return (
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
            this.state.is_following ?
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
    )
  }
}
