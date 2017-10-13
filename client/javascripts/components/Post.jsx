import React from 'react'
import PropTypes from 'prop-types'
import Layout from './Layout.jsx'
import Link from './Link.jsx'
import MarkdownRenderer from './MarkdownRenderer.jsx'
import PostAuthorInfo from './PostAuthorInfo.jsx'
import CommentCreate from './CommentCreate.jsx'
import UserIcon from './UserIcon.jsx'
import { sendPost, sendDelete } from '../libs/client-methods.js'

export default class Post extends React.Component {
  static defaultProps = {
    currentUser: null,
    comments: [],
    liked: false,
    likes_count: 0,
    related_posts: [],
  }

  static propTypes = {
    post: PropTypes.shape({
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
    }).isRequired,
    currentUser: PropTypes.shape({
      username: PropTypes.string,
    }),
    author: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }).isRequired,
    comments: PropTypes.arrayOf(
      PropTypes.shape,
    ),
    fullPath: PropTypes.string.isRequired,
    liked: PropTypes.bool.isRequired,
    likes_count: PropTypes.number.isRequired,
    related_posts: PropTypes.arrayOf(PropTypes.object),
  }

  constructor(props) {
    super(props)

    const { liked, likes_count } = props

    this.state = { liked, likes_count }
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

  handleLikePost(event) {
    const { post, currentUser } = this.props
    const { liked } = this.state

    if (!currentUser) {
      location.href = '/login'
      return
    }

    event.target.blur()

    if (liked) {
      sendDelete(`/posts/${post.uuid}/unlike`).then((res) => {
        this.setState({ liked: !liked, likes_count: res.likes_count })
      })
    } else {
      sendPost(`/posts/${post.uuid}/like`).then((res) => {
        this.setState({ liked: !liked, likes_count: res.likes_count })
      })
    }
  }

  render() {
    const { post, author, comments, currentUser, fullPath, related_posts } = this.props
    const { liked, likes_count } = this.state
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
          <div style={{ marginTop: '35px' }}>
            <PostAuthorInfo author={author} post={post} />
          </div>
          <h1 style={{ wordWrap: 'break-word' }}>{post.title}</h1>
          <p>by <Link href={`/@${author.username}`}>{author.username}</Link></p>
          <MarkdownRenderer body={post.body} />
          {post.tag_list.map(tag => <span key={tag} className="tag">{tag}</span>)}
          <hr />
          <button className={liked ? 'button active' : 'button'} onClick={e => this.handleLikePost(e)}>いいね！</button>
          <span> {likes_count}</span>
          <hr />
          <PostAuthorInfo author={author} post={post} />
        </div>
        <div style={{ background: '#f8f9fa', padding: '1em 0', marginTop: '1em' }}>
          <div className="container">
            <div className="row">
              {related_posts.map(related_post => (
                <div className="column-small-4" key={related_post.id}>
                  <div className="user-post-box">
                    <div className="container-max">
                      <div className="row">
                        <div className="column-extra-small-1" style={{ padding: 0, width: '15px' }}>
                          <Link href={`/@${related_post.user.username}`}>
                            <img
                              className="header-avatar"
                              src={related_post.user.profile_image_url}
                              alt={related_post.user.username}
                              style={{ width: '25px' }}
                            />
                          </Link>
                        </div>
                        <div className="column-extra-small-1">
                          <Link key={related_post.id} href={`/@${related_post.user.username}`}>
                            {related_post.user.username}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <Link key={post.id} href={`/@${related_post.user.username}/posts/${related_post.uuid}`}>
                      <h2 className="post-title">
                        {related_post.title}
                      </h2>
                    </Link>
                    <span className="post-body">
                      {new Date(related_post.created_at).toDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="container-small">
            {currentUser === null ?
              <span>
                <Link href="/login">Sign in</Link> to DesignTrigger to response to this post.
              </span>
              :
              <CommentCreate {...this.props} />
            }
            {comments.length !== 0 ? <h2>Comments</h2> : null}
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
                            <UserIcon user={comment.user} width={'25px'} />
                          </Link>
                        </div>
                        <div className="column-extra-small-11" style={{ paddingLeft: '8px' }}>
                          <Link href={`/@${comment.user.username}`}>
                            {comment.user.username}
                          </Link>
                        </div>
                        <div className="column-extra-small-12" style={{ padding: '0' }}>
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
      </Layout>
    )
  }
}
