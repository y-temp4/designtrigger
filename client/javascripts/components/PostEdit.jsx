import React from 'react'
import PropTypes from 'prop-types'
import Layout from './Layout.jsx'
import { sendPatch } from '../libs/client-methods.js'

export default class PostEdit extends React.Component {

  static propTypes = {
    post: PropTypes.shape({
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
    }).isRequired,
    currentUser: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }).isRequired,
  }

  handleSubmit(event) {
    event.preventDefault()
    const title = event.target.title.value
    const body = event.target.body.value

    sendPatch(`/posts/${this.props.post.id}`, {
      post: { title, body },
    }).then((data) => {
      location.href = `/@${this.props.currentUser.username}/${data.id}`
    })
  }

  render() {
    const { title, body } = this.props.post
    return (
      <Layout>
        <div className="post">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <h2>記事編集</h2>
            <input type="text" name="title" required autoFocus placeholder="タイトル" defaultValue={title} />
            <br />
            <textarea type="text" name="body" required placeholder="本文" defaultValue={body} />
            <br />
            <br />
            <button className="button">送信</button>
          </form>
        </div>
      </Layout>
    )
  }
}
