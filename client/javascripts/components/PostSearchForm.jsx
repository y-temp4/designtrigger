import React from 'react'

export default class PostSearchForm extends React.Component {
  static handleSubmit(event) {
    event.preventDefault()
    const search = event.target.search.value

    location.href = `/search?q=${search.replace(/ /g, '+')}`
  }

  render() {
    return (
      <form onSubmit={e => PostSearchForm.handleSubmit(e)}>
        <input
          className="input"
          type="text"
          name="search"
          placeholder="キーワードを入力"
        />
      </form>
    )
  }
}
