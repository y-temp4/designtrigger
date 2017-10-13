import React from 'react'
import PropTypes from 'prop-types'

const UserIcon = ({ user, width }) => (
  <img
    className="user-avatar"
    src={user.profile_image_url}
    alt={user.username}
    style={{ width }}
  />
)

UserIcon.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    profile_image_url: PropTypes.string,
  }).isRequired,
  width: PropTypes.string,
}

UserIcon.defaultProps = {
  width: '30px',
}

export default UserIcon
