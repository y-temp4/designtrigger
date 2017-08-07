import React from 'react'
import Layout from './Layout.jsx'
import UserInfo from './UserInfo.jsx'
import UserList from './UserList.jsx'

export default class UserFollowees extends React.Component {
  render() {
    const { user, following_users } = this.props
    const title = `${user.username}'s following users`

    return (
      <Layout title={title}>
        <div className="user">
          <div className="container-small">
            <UserInfo {...this.props} />
            <UserList title={title} user={user} userList={following_users} />
          </div>
        </div>
      </Layout>
    )
  }
}
