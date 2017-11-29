import React from 'react'
import PropTypes from 'prop-types'
import PostForm from './PostForm.jsx'
import { sendPost } from '../libs/client-methods.js'

export default class PostCreate extends React.Component {
  static propTypes = {
    currentUser: PropTypes.shape({
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
      uploaded_image_size: PropTypes.number.isRequired,
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
    const user_id = this.props.currentUser.id
    const tag_list = tagList.join(',')

    sendPost('/posts', {
      post: { title, body, user_id, tag_list },
    }).then((data) => {
      location.href = `/@${this.props.currentUser.username}/posts/${data.uuid}`
    }).catch((error) => {
      this.setState({ errors: error.response.data })
    })
  }

  render() {
    const { currentUser } = this.props

    return (
      <PostForm
        {...this.state}
        currentUser={currentUser}
        pageTitle={'記事投稿'}
        handleSubmit={(e, tagList) => this.handleSubmit(e, tagList)}
      />
    )
  }
}
