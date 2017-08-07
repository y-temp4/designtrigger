import React from 'react'
import PropTypes from 'prop-types'
import Layout from './Layout.jsx'
import UserInfo from './UserInfo.jsx'
import UserList from './UserList.jsx'

const UserFollowers = (props) => {
  const { user, followers } = props
  const title = `${user.username}'s followers`

  return (
    <Layout title={title}>
      <div className="user">
        <div className="container-small">
          <UserInfo {...props} />
          <UserList title={title} user={user} userList={followers} />
        </div>
      </div>
    </Layout>
  )
}

UserFollowers.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
  followers: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
}

export default UserFollowers
