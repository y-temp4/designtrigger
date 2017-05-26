import React from 'react'
import PropTypes from 'prop-types'
import Layout from './Layout.jsx'
import Link from './Link.jsx'
import MarkdownRenderer from './MarkdownRenderer.jsx'
import { sendDelete } from '../libs/client-methods.js'

export default class Post extends React.Component {

  static propTypes = {
    post: PropTypes.shape({
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
    }).isRequired,
    currentUser: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }),
    author: PropTypes.string.isRequired,
  }

  handleDelete(event) {
    const { post, currentUser } = this.props

    event.stopPropagation()
    event.nativeEvent.stopImmediatePropagation()

    if (window.confirm('削除してもよろしいですか？')) {
      sendDelete(`/@${currentUser.username}/${post.uuid}`).then(() => {
        location.href = '/'
      })
    }
  }

  render() {
    const { post, author, currentUser } = this.props
    return (
      <Layout title={post.title}>
        <div className="container-small">
          {
            currentUser !== null && post.user_id === currentUser.id ?
              <div>
                <Link href={`/@${currentUser.username}/${post.uuid}/edit`}>
                  編集する
                </Link>
                <br />
                <Link href={`/@${currentUser.username}/${post.uuid}`} onClick={this.handleDelete.bind(this)}>
                  記事を削除する
                </Link>
              </div>
            :
            null
          }
          <h1>{post.title}</h1>
          <p>by <Link href={`/@${author}`}>{author}</Link></p>
          <MarkdownRenderer body={post.body} />
        </div>
      </Layout>
    )
  }
}
