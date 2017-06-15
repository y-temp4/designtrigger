import React from 'react'
import PropTypes from 'prop-types'
import TagsInput from 'react-tagsinput'
import Layout from './Layout.jsx'
import MarkdownRenderer from './MarkdownRenderer.jsx'
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

  constructor(props) {
    super(props)
    this.state = {
      title: this.props.post.title,
      body: this.props.post.body,
      tag_list: this.props.post.tag_list,
      height: document.documentElement.clientHeight,
    }

    this.handleResize = this.handleResize.bind(this)
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize() {
    this.setState({ height: document.documentElement.clientHeight })
  }

  handleSubmit(event) {
    event.preventDefault()
    const title = event.target.title.value
    const body = event.target.body.value
    const tag_list = this.state.tag_list.join(',')

    sendPatch(`/posts/${this.props.post.uuid}`, {
      post: { title, body, tag_list },
    }).then((data) => {
      location.href = `/@${this.props.currentUser.username}/${data.uuid}`
    })
  }

  handleChangeTitle(event) {
    this.setState({ title: event.target.value })
  }

  handleChangeBody(event) {
    this.setState({ body: event.target.value })
  }

  handleChangeTag(tag_list) {
    this.setState({ tag_list })
  }

  render() {
    return (
      <Layout title="記事編集">
        <div className="container-max markdown">
          <div className="row">
            <div className="column-small-12">
              <h2>記事編集</h2>
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
                  defaultValue={this.props.post.title}
                  onChange={this.handleChangeTitle.bind(this)}
                />
                <TagsInput
                  value={this.state.tag_list}
                  onChange={this.handleChangeTag.bind(this)}
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
                <MarkdownRenderer body={this.state.body} />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
