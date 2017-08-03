import React from 'react'
import gravatar from 'gravatar'
import Layout from './Layout.jsx'
import Link from './Link.jsx'
import UserInfo from './UserInfo.jsx'

export default class UserFollowers extends React.Component {

  render() {
    const { user, followers } = this.props

    return (
      <Layout title={`${user.username}'s followers`}>
        <div className="user">
          <div className="container-small">
            <UserInfo {...this.props} />
            <div className="row user-posts-box">
              <div className="column-small-12">
                <h2>{user.username}{"'"}s followers</h2>
                {followers.map(follower => (
                  <Link key={follower.id} href={`/@${follower.username}`}>
                    <div className="user-post-box">
                      {follower.username}
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
