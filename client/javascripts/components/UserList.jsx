import React from 'react'
import PropTypes from 'prop-types'
import Link from './Link.jsx'

const UserList = ({ title, userList }) => (
  <div className="row user-list-box">
    <div className="column-small-12">
      <h2>{title}</h2>
      {userList.map(user => (
        <Link key={user.id} href={`/@${user.username}`}>
          <div className="user-box">
            <div className="container-max">
              <div className="column-extra-small-1" style={{ height: '30px', paddingRight: '1.5rem' }}>
                <img
                  className="header-avatar"
                  src={user.profile_image_url}
                  alt={user.username}
                  style={{ width: '30px' }}
                />
              </div>
              <div className="column-extra-small-10" style={{ marginTop: '2px' }}>
                {user.username}
              </div>
            </div>
          </div>
        </Link>),
      )}
    </div>
  </div>
)

UserList.propTypes = {
  title: PropTypes.string.isRequired,
  userList: PropTypes.arrayOf(
    PropTypes.object,
  ),
}

UserList.defaultProps = {
  userList: [],
}

export default UserList
