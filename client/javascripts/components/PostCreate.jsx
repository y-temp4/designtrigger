import React from 'react'
import Layout from './Layout.jsx'
import { sendPost } from '../libs/client-methods.js'

export default class PostCreate extends React.Component {

  handleSubmit(event) {
    event.preventDefault()
    const title = event.target.title.value
    const body = event.target.body.value
    const user_id = this.props.currentUser.id

    sendPost('/posts', {
      post: { title, body, user_id },
    }).then((data) => {
      location.href = `/@${this.props.currentUser.username}/${data.id}`
    })
  }

  render() {
    return (
      <Layout>
        <div className="post">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <h2>記事投稿</h2>
            <input type="text" name="title" required autoFocus placeholder="タイトル" />
            <br />
            <textarea type="text" name="body" required placeholder="本文" />
            <br />
            <br />
            <button className="button">送信</button>
          </form>
        </div>
      </Layout>
    )
  }
}
