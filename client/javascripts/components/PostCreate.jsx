import React from 'react'
import remark from 'remark'
import reactRenderer from 'remark-react'
import Layout from './Layout.jsx'
import { sendPost } from '../libs/client-methods.js'

const processor = remark().use(reactRenderer)

export default class PostCreate extends React.Component {

  constructor(props) {
    super(props)
    this.state = { body: '' }
  }

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

  handleChange(event) {
    this.setState({ body: event.target.value })
  }

  render() {
    return (
      <Layout>
        <div className="post">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <h2>記事投稿</h2>
            <input type="text" name="title" required autoFocus placeholder="タイトル" />
            <br />
            <textarea
              type="text"
              name="body"
              required
              placeholder="本文"
              value={this.state.body}
              onChange={this.handleChange.bind(this)} />
            <br />
            {processor.processSync(this.state.body).contents}
            <br />
            <button className="button">送信</button>
          </form>
        </div>
      </Layout>
    )
  }
}
