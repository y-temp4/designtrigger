import React from 'react'
import PropTypes from 'prop-types'
import Layout from './Layout.jsx'
import Link from './Link.jsx'
import { sendDelete } from '../libs/client-methods.js'

export default class Post extends React.Component {

  static propTypes = {
    post: PropTypes.shape({
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
    }).isRequired,
    currentUser: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }).isRequired,
  }

  handleDelete(event) {
    const { post, currentUser } = this.props

    event.stopPropagation()
    event.nativeEvent.stopImmediatePropagation()

    if (window.confirm('削除してもよろしいですか？')) {
      sendDelete(`/@${currentUser.username}/${post.id}`).then(() => {
        location.href = '/'
      })
    }
  }

  render() {
    const { post, currentUser } = this.props
    return (
      <Layout>
        <div className="post">
          {
            post.user_id === currentUser.id ?
              <div>
                <Link href={`/@${currentUser.username}/${post.id}/edit`}>
                  編集する
                </Link>
                <br />
                <Link href={`/@${currentUser.username}/${post.id}`} onClick={this.handleDelete.bind(this)}>
                  記事を削除する
                </Link>
              </div>
            :
            null
          }
          <h2>{this.props.post.title}</h2>
          <p>{this.props.post.body}</p>
        </div>
      </Layout>
    )
  }
}
