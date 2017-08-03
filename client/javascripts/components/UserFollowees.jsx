import React from 'react'
import gravatar from 'gravatar'
import Layout from './Layout.jsx'
import Link from './Link.jsx'
import UserInfo from './UserInfo.jsx'

export default class UserFollowees extends React.Component {

  render() {
    const { user, following_users } = this.props

    return (
      <Layout title={`${user.username}'s following users`}>
        <div className="user">
          <div className="container-small">
            <UserInfo {...this.props} />
            <div className="row user-posts-box">
              <div className="column-small-12">
                <h2>{user.username}{"'"}s following users</h2>
                {following_users.map(following_user => (
                  <Link key={following_user.id} href={`/@${following_user.username}`}>
                    <div className="user-post-box">
                      {following_user.username}
                    </div>
                  </Link>),
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
