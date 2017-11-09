import React from 'react'
import PropTypes from 'prop-types'
import Link from './Link.jsx'

const UserNav = ({ user, fullPath }) => {
  const { username } = user
  let postsLink = <Link href={`/@${username}`}>Posts</Link>
  let commentsLink = <Link href={`/@${username}/comments`}>Comments</Link>
  let likesLink = <Link href={`/@${username}/likes`}>Likes</Link>

  switch (fullPath) {
    case `/@${username}`:
      postsLink = <span>Posts</span>
      break;
    case `/@${username}/comments`:
      commentsLink = <span>Comments</span>
      break;
    case `/@${username}/likes`:
      likesLink = <span>Likes</span>
      break;
    default:
      break;
  }

  return (
    <div>
      <ul style={{ listStyle: 'none', margin: '0', padding: '0' }}>
        <li style={{ display: 'inline-block', marginRight: '.5em' }}>
          {postsLink}
        </li>
        <li style={{ display: 'inline-block', marginRight: '.5em' }}>
          {commentsLink}
        </li>
        <li style={{ display: 'inline-block' }}>
          {likesLink}
        </li>
      </ul>
    </div>
  )
}

UserNav.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
  fullPath: PropTypes.string.isRequired,
}

export default UserNav
