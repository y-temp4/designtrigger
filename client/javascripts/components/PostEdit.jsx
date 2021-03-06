import React from 'react'
import PropTypes from 'prop-types'
import PostForm from './PostForm.jsx'
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
      errors: [],
    }
  }

  handleSubmit(event, tagList) {
    event.preventDefault()
    const title = event.target.title.value
    const body = event.target.body.value
    const top_image_url = event.target.top_image_url.value
    const tag_list = tagList.join(',')

    sendPatch(`/posts/${this.props.post.uuid}`, {
      post: { title, body, tag_list, top_image_url },
    }).then((data) => {
      location.href = `/@${this.props.currentUser.username}/posts/${data.uuid}`
    }).catch((error) => {
      this.setState({ errors: error.response.data })
    })
  }

  render() {
    return (
      <PostForm
        {...this.state}
        {...this.props}
        pageTitle={'記事編集'}
        handleSubmit={(e, tagList) => this.handleSubmit(e, tagList)}
      />
    )
  }
}
