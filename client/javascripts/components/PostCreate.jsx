import React from 'react'
import PropTypes from 'prop-types'
import TagsInput from 'react-tagsinput'
import Layout from './Layout.jsx'
import MarkdownRenderer from './MarkdownRenderer.jsx'
import { sendPost } from '../libs/client-methods.js'

export default class PostCreate extends React.Component {
  static propTypes = {
    currentUser: PropTypes.shape({
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
    }).isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      title: '',
      body: '',
      tag_list: [],
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
    const tag_list = this.state.tag_list.join(',')

    sendPost('/posts', {
      post: { title, body, user_id, tag_list },
    }).then((data) => {
      location.href = `/@${this.props.currentUser.username}/posts/${data.uuid}`
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
      <Layout title="記事投稿">
        <div className="container-max markdown">
          <div className="row">
            <div className="column-small-12">
              <h2>記事投稿</h2>
            </div>
            <div className="column-small-6">
              <form onSubmit={e => this.handleSubmit(e)}>
                <input
                  className="markdown-title"
                  type="text"
                  name="title"
                  required
                  autoFocus
                  placeholder="タイトル"
                  onChange={e => this.handleChangeTitle(e)}
                />
                <TagsInput
                  value={this.state.tag_list}
                  onChange={e => this.handleChangeTag(e)}
                />
                <textarea
                  style={{ height: `${this.state.height - 250}px` }}
                  className="markdown-textarea"
                  type="text"
                  name="body"
                  required
                  placeholder="本文"
                  value={this.state.body}
                  onChange={e => this.handleChangeBody(e)}
                />
                <button className="button">送信</button>
              </form>
            </div>
            <div className="column-small-6">
              <h2 className="markdown-preview-title">
                {
                  this.state.title !== '' ?
                    this.state.title
                    :
                    'タイトル'
                }
              </h2>
              <div
                style={{ height: `${this.state.height - 250}px` }}
                className="markdown-preview-body"
              >
                {
                  this.state.body !== '' ?
                    <MarkdownRenderer body={this.state.body} />
                    :
                    <p>本文</p>
                }
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
