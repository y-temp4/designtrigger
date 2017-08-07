import React from 'react'
import PropTypes from 'prop-types'
import Link from './Link.jsx'

const UserList = ({ title, userList }) => (
  <div className="row user-posts-box">
    <div className="column-small-12">
      <h2>{title}</h2>
      {userList.map(user => (
        <Link key={user.id} href={`/@${user.username}`}>
          <div className="user-post-box">
            {user.username}
          </div>
        </Link>),
      )}
    </div>
  </div>
)

UserList.propTypes = {
  title: PropTypes.string.isRequired,
  userList: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
}

export default UserList
