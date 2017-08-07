import React from 'react'
import PropTypes from 'prop-types'
import Layout from './Layout.jsx'
import UserInfo from './UserInfo.jsx'
import UserList from './UserList.jsx'

const UserFollowees = (props) => {
  const { user, following_users } = props
  const title = `${user.username}'s following users`

  return (
    <Layout title={title}>
      <div className="user">
        <div className="container-small">
          <UserInfo {...props} />
          <UserList title={title} user={user} userList={following_users} />
        </div>
      </div>
    </Layout>
  )
}

UserFollowees.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
  following_users: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
}

export default UserFollowees
