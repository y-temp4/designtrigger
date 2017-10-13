import React from 'react'
import PropTypes from 'prop-types'
import Errors from './Errors.jsx'
import { sendPost } from '../libs/client-methods.js'

export default class CommentCreate extends React.Component {
  static propTypes = {
    currentUser: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
    post: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
    fullPath: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      body: '',
      errors: [],
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    const body = event.target.body.value
    const user_id = this.props.currentUser.id
    const post_id = this.props.post.id

    sendPost('/comments', {
      comment: { body, user_id, post_id },
    }).then(() => {
      location.href = this.props.fullPath
    }).catch((error) => {
      this.setState({ errors: error.response.data })
    })
  }

  handleChangeBody(event) {
    this.setState({ body: event.target.value })
  }

  render() {
    return (
      <div>
        <Errors errors={this.state.errors} />
        <form onSubmit={e => this.handleSubmit(e)}>
          <textarea
            className="markdown-textarea"
            type="text"
            name="body"
            required
            placeholder="Write a response..."
            value={this.state.body}
            onChange={e => this.handleChangeBody(e)}
          />
          <button className="button" style={{ background: 'white' }}>
            Add a comment
          </button>
        </form>
      </div>
    )
  }
}
