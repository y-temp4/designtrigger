import React from 'react'
import Layout from './Layout.jsx'
import UserInfo from './UserInfo.jsx'
import UserList from './UserList.jsx'

export default class UserFollowers extends React.Component {
  render() {
    const { user, followers } = this.props
    const title = `${user.username}'s followers`

    return (
      <Layout title={title}>
        <div className="user">
          <div className="container-small">
            <UserInfo {...this.props} />
            <UserList title={title} user={user} userList={followers} />
          </div>
        </div>
      </Layout>
    )
  }
}
