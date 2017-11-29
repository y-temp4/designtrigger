import React from 'react'
import PropTypes from 'prop-types'
import TagsInput from 'react-tagsinput'
import Dropzone from 'react-dropzone'
import Tooltip from 'rc-tooltip'
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
  }

  static defaultProps = {
    post: {
      title: '',
      body: '',
      tag_list: [],
      uuid: '',
    },
    errors: [],
  }

  constructor(props) {
    super(props)
    this.state = {
      title: props.post.title,
      body: props.post.body,
      tag_list: props.post.tag_list,
      top_image_url: '',
      height: document.documentElement.clientHeight,
      isUploading: false,
      images: [],
      visible: false,
      errors: [],
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this))
  }

  onVisibleChange() {
    this.setState({ visible: !this.state.visible })
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

    this.setState({ isUploading: true })
    axios
      .post('/upload', data, options)
      .then((res) => {
        const { image_new_name, image_original_filename } = res.data
        this.setState({
          body: `${body}\n\n![${image_original_filename}](${s3_url}${image_new_name})`,
          isUploading: false,
        })
      })
  }

  handleOnDropTopImage(files) {
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
    const s3_url = 'https://designtrigger-image.s3.amazonaws.com/'

    this.setState({ isUploading: true })
    axios
      .post('/upload', data, options)
      .then((res) => {
        const { image_new_name } = res.data
        this.setState({
          top_image_url: `${s3_url}${image_new_name}`,
          isUploading: false,
        })
      })
  }

  render() {
    const { handleSubmit, pageTitle, errors, post } = this.props
    const { title, height, tag_list, body, visible, isUploading, top_image_url } = this.state

    const dropzone = process.env.NODE_ENV === 'development' &&
      (<Tooltip
        className="tooltip"
        placement="top"
        visible={visible}
        onVisibleChange={() => this.onVisibleChange()}
        trigger="hover"
        arrowContent={<div className="rc-tooltip-arrow-inner" />}
        overlay={
          <span>画像をアップロード</span>
        }
      >
        <Dropzone onDrop={e => this.handleOnDrop(e)} accept="image/*" style={{}} className="img-upload">
          { isUploading ?
            <span>アップロード中...</span>
            :
            <img src="https://designtrigger-assets.s3.amazonaws.com/picture-o.png" alt="画像アップロード" />
          }
        </Dropzone>
      </Tooltip>
      )


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
              {process.env.NODE_ENV === 'development' &&
              <Dropzone onDrop={e => this.handleOnDropTopImage(e)} accept="image/*" style={{}} >
                トップ画像を追加
              </Dropzone>}
              {dropzone}
              <form onSubmit={e => handleSubmit(e, tag_list)}>
                <input
                  type="hidden"
                  name="top_image_url"
                  value={top_image_url || post.top_image_url}
                />
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
                  style={{ height: `${height - 280}px` }}
                  className="markdown-textarea"
                  type="text"
                  name="body"
                  required
                  placeholder="本文"
                  value={body}
                  onChange={e => this.handleChangeBody(e)}
                />
                <button className="button" name="submit">送信</button>
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
              <img src={top_image_url || post.top_image_url} alt="" style={{ maxWidth: '100%' }} />
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
