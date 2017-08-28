import React from 'react'
import PropTypes from 'prop-types'
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
  }

  handleDelete(event) {
    const { post, currentUser } = this.props

    event.stopPropagation()
    event.nativeEvent.stopImmediatePropagation()

    if (window.confirm('削除してもよろしいですか？')) {
      sendDelete(`/@${currentUser.username}/posts/${post.uuid}`).then(() => {
        location.href = '/'
      })
    }
  }

  render() {
    const { post, author, comments, currentUser } = this.props
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
                  onClick={e => this.handleDelete(e)}
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
          <ul>
            {comments.map(comment => (
              <li key={comment.id}>{comment.body} by {comment.user.username}</li>
            ))}
          </ul>
        </div>
      </Layout>
    )
  }
}
