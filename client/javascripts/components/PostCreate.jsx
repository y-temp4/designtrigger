import React from 'react'
import remark from 'remark'
import reactRenderer from 'remark-react'
import Layout from './Layout.jsx'
import { sendPost } from '../libs/client-methods.js'

const processor = remark().use(reactRenderer)

export default class PostCreate extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      title: '',
      body: '',
      height: document.documentElement.clientHeight,
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this))
  }

  handleResize() {
    this.setState({ height: document.documentElement.clientHeight })
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

  handleChangeTitle(event) {
    this.setState({ title: event.target.value })
  }

  handleChangeBody(event) {
    this.setState({ body: event.target.value })
  }

  render() {
    return (
      <Layout>
        <div className="container-max markdown">
          <div className="row">
            <div className="column-small-12">
              <h2>記事投稿</h2>
            </div>
            <div className="column-small-6">
              <form onSubmit={this.handleSubmit.bind(this)}>
                <input
                  className="markdown-title"
                  type="text"
                  name="title"
                  required
                  autoFocus
                  placeholder="タイトル"
                  onChange={this.handleChangeTitle.bind(this)}
                />
                <textarea
                  style={{ height: `${this.state.height - 250}px` }}
                  className="markdown-textarea"
                  type="text"
                  name="body"
                  required
                  placeholder="本文"
                  value={this.state.body}
                  onChange={this.handleChangeBody.bind(this)}
                />
                <button className="button">送信</button>
              </form>
            </div>
            <div className="column-small-6">
              <h2 className="markdown-preview-title">{this.state.title}</h2>
              <div
                style={{ height: `${this.state.height - 250}px` }}
                className="markdown-preview-body"
              >
                {processor.processSync(this.state.body).contents}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
