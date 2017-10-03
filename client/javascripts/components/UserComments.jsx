import React from 'react'
import PropTypes from 'prop-types'
import Layout from './Layout.jsx'
import Link from './Link.jsx'
import UserInfo from './UserInfo.jsx'
import { sendDelete } from '../libs/client-methods.js'

export default class UserComments extends React.Component {
  static defaultProps = {
    currentUser: null,
    comments: [],
  }

  static propTypes = {
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }).isRequired,
    currentUser: PropTypes.shape({
      username: PropTypes.string,
    }),
    comments: PropTypes.arrayOf(
      PropTypes.shape,
    ),
    fullPath: PropTypes.string.isRequired,
  }

  handleDeleteComment(event, commentId) {
    const { currentUser } = this.props

    event.stopPropagation()
    event.nativeEvent.stopImmediatePropagation()

    if (window.confirm('削除してもよろしいですか？')) {
      sendDelete(`/comments/${commentId}`).then(() => {
        location.href = `/@${currentUser.username}/comments`
      })
    }
  }

  render() {
    const { user, comments, currentUser, fullPath } = this.props
    const title = `${user.username}'s comments`

    return (
      <Layout title={title}>
        <div className="user">
          <div className="container-small">
            <UserInfo {...this.props} />
            <div className="row user-comments-box">
              <div className="column-small-12">
                <h2>{title}</h2>
                <div className="user-comments-box">
                  {comments.map((comment) => {
                    const deleteComment = currentUser !== null && comment.user_id === currentUser.id ?
                      (<Link
                        href={fullPath}
                        onClick={e => this.handleDeleteComment(e, comment.id)}
                      >
                        <span> コメントを削除</span>
                      </Link>)
                      :
                      null

                    return (
                      <div className="comment-box" key={comment.id}>
                        <div className="container-max">
                          <div className="row">
                            <div className="column-extra-small-1" style={{ padding: 0, width: '25px' }}>
                              <Link href={`/@${user.username}`}>
                                <img
                                  className="user-avatar"
                                  src={user.profile_image_url}
                                  alt={user.username}
                                  style={{ width: '25px' }}
                                />
                              </Link>
                            </div>
                            <div className="column-extra-small-11" style={{ paddingLeft: '8px' }}>
                              <Link href={`/@${user.username}`}>
                                {user.username}
                              </Link>
                            </div>
                            <div className="column-extra-small-12" style={{ padding: '0' }}>
                              <div className="user-commented-post-box">
                                <Link
                                  href={`/@${comment.post.user.username}/posts/${comment.post.uuid}`}
                                >
                                  {comment.post.title}
                                </Link>
                                <span> by </span>
                                <Link
                                  href={`/@${comment.post.user.username}`}
                                >
                                  {comment.post.user.username}
                                </Link>
                              </div>
                              <div className="comment-body">
                                {comment.body} {deleteComment}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
