import React from 'react'
import { sendPost } from '../libs/client-methods.js'

export default class UserCreate extends React.Component {

  constructor(props) {
    super(props);

    // this.state = { name: this.props.name };
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log(event.target)
    sendPost('/users', {
      user: {
        email: event.target.email.value,
        password: event.target.password.value,
        password_confirmation: event.target.password_confirmation.value,
      }
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <h1>ユーザー作成</h1>
        <label htmlFor="email">メール</label>
        <input type="text" name="email" />
        <br />
        <label htmlFor="password">パスワード</label>
        <input type="password" name="password" />
        <br />
        <label htmlFor="email">パスワード確認</label>
        <input type="password" name="password_confirmation" />
        <br />
        <button>送信</button>
      </form>
    )
  }
}
