import React from 'react'
import PropTypes from 'prop-types'
import TagsInput from 'react-tagsinput'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import Errors from './Errors.jsx'
import Layout from './Layout.jsx'
import MarkdownRenderer from './MarkdownRenderer.jsx'

export default class PostForm extends React.Component {
  static propTypes = {
    post: PropTypes.shape({
      title: PropTypes.string,
      body: PropTypes.string,
      tag_list: PropTypes.array,
      uuid: PropTypes.string,
    }),
    currentUser: PropTypes.shape({
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
      uploaded_image_size: PropTypes.number.isRequired,
    }).isRequired,
    handleSubmit: PropTypes.func.isRequired,
    pageTitle: PropTypes.string.isRequired,
    errors: PropTypes.arrayOf(PropTypes.string),
    isPosting: PropTypes.bool,
  }

  static defaultProps = {
    post: {
      title: '',
      body: '',
      tag_list: [],
      uuid: '',
    },
    errors: [],
    isPosting: false,
  }

  constructor(props) {
    super(props)
    this.state = {
      title: props.post.title,
      body: props.post.body,
      tag_list: props.post.tag_list,
      height: document.documentElement.clientHeight,
      isUploading: false,
      images: [],
      errors: [],
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

  handleOnDrop(files) {
    const data = new FormData()
    const file = files[0]
    const { uploaded_image_size } = this.props.currentUser
    const limit = 10000000 - uploaded_image_size

    if (limit < file.size) {
      this.setState({ errors: ['上限を超えているため、画像がアップロードできません'] })
      return
    }

    data.append('image', file)
    data.append('image_size', file.size)

    const options = {
      headers: {
        'Content-Type': file.type,
      },
    }
    const { body } = this.state
    const s3_url = 'https://designtrigger-image.s3.amazonaws.com/'

    axios
      .post('/upload', data, options)
      .then((res) => {
        const { image_new_name, image_original_filename } = res.data
        this.setState({ body: `${body}\n\n![${image_original_filename}](${s3_url}${image_new_name})` })
      })
  }

  render() {
    const dropzone = process.env.NODE_ENV === 'development' &&
      (<Dropzone onDrop={e => this.handleOnDrop(e)} accept="image/*" style={{}}>
        画像をドラックまたはクリック
      </Dropzone>)

    const { handleSubmit, pageTitle, errors, isPosting } = this.props
    const { title, height, tag_list, body } = this.state

    const err = errors.concat(this.state.errors)

    return (
      <Layout title={pageTitle}>
        <div className="container-max markdown">
          <div className="row">
            <div className="column-small-12">
              <h2>{pageTitle}</h2>
            </div>
            <div className="column-small-6">
              <Errors errors={err} />
              {dropzone}
              <form onSubmit={e => handleSubmit(e, tag_list)}>
                <input
                  className="markdown-title"
                  type="text"
                  name="title"
                  required
                  autoFocus
                  placeholder="タイトル"
                  defaultValue={title}
                  onChange={e => this.handleChangeTitle(e)}
                />
                <TagsInput
                  value={tag_list}
                  onChange={e => this.handleChangeTag(e)}
                  onlyUnique
                  maxTags={5}
                  inputProps={{ placeholder: 'タグを追加' }}
                />
                <textarea
                  style={{ height: `${height - 250}px` }}
                  className="markdown-textarea"
                  type="text"
                  name="body"
                  required
                  placeholder="本文"
                  value={body}
                  onChange={e => this.handleChangeBody(e)}
                />
                <button className="button" name="submit" disabled={isPosting}>送信</button>
              </form>
            </div>
            <div className="column-small-6">
              <h2 className="markdown-preview-title">
                {
                  title !== '' ?
                    title
                    :
                    'タイトル'
                }
              </h2>
              <div
                style={{ height: `${height - 250}px` }}
                className="markdown-preview-body"
              >
                {
                  body !== '' ?
                    <MarkdownRenderer body={body} />
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
