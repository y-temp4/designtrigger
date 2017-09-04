import React from 'react'
import PropTypes from 'prop-types'
import gravatar from 'gravatar'
import Layout from './Layout.jsx'
import Link from './Link.jsx'
import MarkdownRenderer from './MarkdownRenderer.jsx'
import CommentCreate from './CommentCreate.jsx'
import { sendDelete } from '../libs/client-methods.js'

export default class Post extends React.Component {
  static defaultProps = {
    currentUser: null,
    comments: [],
  }

  static propTypes = {
    post: PropTypes.shape({
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
    }).isRequired,
    currentUser: PropTypes.shape({
      username: PropTypes.string,
    }),
    author: PropTypes.string.isRequired,
    comments: PropTypes.arrayOf(
      PropTypes.shape,
    ),
    fullPath: PropTypes.string.isRequired,
  }

  handleDeletePost(event) {
    const { post, currentUser } = this.props

    event.stopPropagation()
    event.nativeEvent.stopImmediatePropagation()

    if (window.confirm('削除してもよろしいですか？')) {
      sendDelete(`/@${currentUser.username}/posts/${post.uuid}`).then(() => {
        location.href = '/'
      })
    }
  }

  handleDeleteComment(event, commentId) {
    const { fullPath } = this.props

    event.stopPropagation()
    event.nativeEvent.stopImmediatePropagation()

    if (window.confirm('削除してもよろしいですか？')) {
      sendDelete(`/comments/${commentId}`).then(() => {
        location.href = fullPath
      })
    }
  }

  render() {
    const { post, author, comments, currentUser, fullPath } = this.props
    return (
      <Layout title={post.title}>
        <div className="container-small">
          {
            currentUser !== null && post.user_id === currentUser.id ?
              <div>
                <Link
                  href={`/@${currentUser.username}/posts/${post.uuid}/edit`}
                >
                  編集する
                </Link>
                <br />
                <Link
                  href={`/@${currentUser.username}/posts/${post.uuid}`}
                  onClick={e => this.handleDeletePost(e)}
                >
                  記事を削除する
                </Link>
              </div>
              :
              null
          }
          <h1>{post.title}</h1>
          <p>by <Link href={`/@${author}`}>{author}</Link></p>
          <MarkdownRenderer body={post.body} />
          {post.tag_list.map(tag => <span key={tag} className="tag">{tag}</span>)}
          <br />
          <br />
          {currentUser === null ?
            <span>
              <Link href="/login">Sign in</Link> to DesignTrigger to response to this post.
            </span>
            :
            <CommentCreate {...this.props} />
          }
          <h2>Comments</h2>
          <div className="comment">
            {comments.map((comment) => {
              const deleteComment = currentUser !== null && comment.user_id === currentUser.id ?
                (<Link
                  href={fullPath}
                  onClick={e => this.handleDeleteComment(e, comment.id)}
                >
                  コメントを削除
                </Link>)
                :
                null

              return (
                <div className="comment-box" key={comment.id}>
                  <div className="container-max">
                    <div className="row">
                      <div className="column-extra-small-1" style={{ padding: 0, width: '25px' }}>
                        <Link href={`/@${comment.user.username}`}>
                          <img
                            className="user-avatar"
                            src={gravatar.url(comment.user.email, { s: '25' })}
                            alt={comment.user.username}
                          />
                        </Link>
                      </div>
                      <div className="column-extra-small-11" style={{ paddingLeft: '8px' }}>
                        <Link href={`/@${comment.user.username}`}>
                          {comment.user.username}
                        </Link>
                      </div>
                      <div className="column-extra-small-12">
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
      </Layout>
    )
  }
}
