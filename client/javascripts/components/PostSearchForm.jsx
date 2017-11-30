import React from 'react'
import PropTypes from 'prop-types'

export default class PostSearchForm extends React.Component {
  static propTypes = {
    focus: PropTypes.bool,
  }

  static defaultProps = {
    focus: false,
  }

  static handleSubmit(event) {
    event.preventDefault()
    const search = event.target.search.value

    location.href = `/search?q=${search.replace(/ /g, '+')}`
  }

  render() {
    const { focus } = this.props

    return (
      <form onSubmit={e => PostSearchForm.handleSubmit(e)}>
        <input
          className="input"
          type="text"
          name="search"
          placeholder="キーワードを入力"
          autoFocus={focus}
        />
      </form>
    )
  }
}
