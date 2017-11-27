import React from 'react'
import PropTypes from 'prop-types'
import TagsInput from 'react-tagsinput'
import Errors from './Errors.jsx'
import Layout from './Layout.jsx'
import MarkdownRenderer from './MarkdownRenderer.jsx'
import { sendPatch } from '../libs/client-methods.js'

export default class PostEdit extends React.Component {
  static propTypes = {
    post: PropTypes.shape({
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      tag_list: PropTypes.array.isRequired,
      uuid: PropTypes.string.isRequired,
    }).isRequired,
    currentUser: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }).isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      title: props.post.title,
      body: props.post.body,
      tag_list: props.post.tag_list,
      height: document.documentElement.clientHeight,
      errors: [],
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
      location.href = `/@${this.props.currentUser.username}/posts/${data.uuid}`
    }).catch((error) => {
      this.setState({ errors: error.response.data })
    })
  }

  handleChangeTitle(event) {
    this.setState({ title: event.target.value })
  }

  handleChangeBody(event) {
    this.setState({ body: event.target.value })
  }

  handleChangeTag(tag_list) {
    const containsSlash = tag_list.filter(tag => tag.match(/\//)).length !== 0
    if (containsSlash) {
      this.setState({ errors: ['タグにスラッシュを含めることはできません'] })
    } else {
      this.setState({ errors: [] })
      this.setState({ tag_list })
    }
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
              <Errors errors={this.state.errors} />
              <form onSubmit={e => this.handleSubmit(e)}>
                <input
                  className="markdown-title"
                  type="text"
                  name="title"
                  required
                  autoFocus
                  placeholder="タイトル"
                  defaultValue={this.props.post.title}
                  onChange={e => this.handleChangeTitle(e)}
                />
                <TagsInput
                  value={this.state.tag_list}
                  onChange={e => this.handleChangeTag(e)}
                  onlyUnique
                  maxTags={5}
                  inputProps={{ placeholder: 'タグを追加' }}
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
