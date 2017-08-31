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
            <div className="row user-posts-box">
              <div className="column-small-12">
                <h2>{title}</h2>
                <ul>
                  {comments.map((comment) => {
                    const hasSession = currentUser !== null
                    const isCommentedUser = comment.user_id === currentUser.id
                    const deleteComment = hasSession && isCommentedUser ?
                      (<Link
                        href={fullPath}
                        onClick={e => this.handleDeleteComment(e, comment.id)}
                      >
                        <span> コメントを削除</span>
                      </Link>)
                      :
                      null

                    return (
                      <li key={comment.id}>
                        {comment.body} <span>to </span>
                        <Link
                          href={`/@${comment.post.user.username}/posts/${comment.post.uuid}`}
                        >
                          {comment.post.title}
                        </Link>
                        {deleteComment}
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
