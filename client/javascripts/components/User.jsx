import React from 'react'
import PropTypes from 'prop-types'
import Layout from './Layout.jsx'
import Link from './Link.jsx'
import UserInfo from './UserInfo.jsx'
import { sendDelete } from '../libs/client-methods.js'

export default class User extends React.Component {
  static defaultProps = {
    posts: [],
    currentUser: null,
  }

  static propTypes = {
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }).isRequired,
    posts: PropTypes.arrayOf(
      PropTypes.object,
    ),
    currentUser: PropTypes.shape({
      username: PropTypes.string,
    }),
  }

  handleDeletePost(event, post) {
    const { currentUser } = this.props

    event.stopPropagation()
    event.nativeEvent.stopImmediatePropagation()

    if (window.confirm('削除してもよろしいですか？')) {
      sendDelete(`/@${currentUser.username}/posts/${post.uuid}`).then(() => {
        location.href = `/@${currentUser.username}`
      })
    }
  }

  render() {
    const { user, posts, currentUser } = this.props

    return (
      <Layout title={user.username}>
        <div className="user">
          <div className="container-small">
            <UserInfo {...this.props} />
            <div className="row user-posts-box">
              <div className="column-small-12">
                <h2>{user.username}{"'"}s posts</h2>
                { posts.length !== 0 ?
                  posts.map(post => (
                    <div key={post.id} className="user-post-box">
                      <Link href={`/@${user.username}/posts/${post.uuid}`}>
                        <h2 className="post-title">
                          {post.title}
                        </h2>
                      </Link>
                      <span className="post-body">
                        {new Date(post.created_at).toDateString()}
                        {
                          currentUser !== null && post.user_id === currentUser.id &&
                          <span>
                            <Link
                              href={`/@${currentUser.username}/posts/${post.uuid}/edit`}
                            > 編集する</Link>
                            <Link
                              href={`/@${currentUser.username}/posts/${post.uuid}`}
                              onClick={e => this.handleDeletePost(e, post)}
                            > 記事を削除する</Link>
                          </span>
                        }
                      </span>
                    </div>),
                  ) : <p>No posts yet.</p>}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
