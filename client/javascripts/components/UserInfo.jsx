import React from 'react'
import PropTypes from 'prop-types'
import Link from './Link.jsx'
import UserIcon from './UserIcon.jsx'
import { sendPost, sendDelete } from '../libs/client-methods.js'

export default class UserInfo extends React.Component {
  static defaultProps = {
    currentUser: [],
  }

  static propTypes = {
    fullPath: PropTypes.string.isRequired,
    currentUser: PropTypes.shape(),
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
      description: PropTypes.string,
    }).isRequired,
    is_following: PropTypes.bool.isRequired,
    following_count: PropTypes.number.isRequired,
    follower_count: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props)
    const { is_following, follower_count } = props
    this.state = { is_following, follower_count }
  }

  handleFollow() {
    const user_id = this.props.user.id

    this.setState({ is_following: !this.state.is_following })
    sendPost('/follow', { follow: { user_id } })
      .then((res) => {
        const { follower_count } = res
        this.setState({ follower_count })
      })
  }

  handleUnfollow() {
    const user_id = this.props.user.id

    this.setState({ is_following: !this.state.is_following })
    sendDelete('/unfollow', { params: { userId: user_id } })
      .then((res) => {
        const { follower_count } = res
        this.setState({ follower_count })
      })
  }

  render() {
    const { fullPath, currentUser, user, following_count } = this.props
    const { is_following, follower_count } = this.state
    const followOrUnfollowButton = is_following ?
      (<button
        onClick={e => this.handleUnfollow(e)}
        className="button active"
      >Following</button>)
      :
      (<button
        onClick={e => this.handleFollow(e)}
        className="button"
      >Follow</button>)

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
          { currentUser && currentUser.id !== user.id && followOrUnfollowButton }
        </div>
        <div className="column-extra-small-4 user-profile-image-box">
          <UserIcon user={user} width={'100px'} />
        </div>
        <div className="column-extra-small-12">
          <hr />
          {fullPath === `/@${user.username}` ?
            <span>Posts </span>
            :
            <Link href={`/@${user.username}`}>Posts </Link>
          }
          {fullPath === `/@${user.username}/comments` ?
            <span> Comments</span>
            :
            <Link href={`/@${user.username}/comments`}> Comments</Link>
          }
        </div>
      </div>
    )
  }
}
