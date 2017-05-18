import React from 'react'
import Layout from './Layout.jsx'
import { sendPost } from '../libs/client-methods.js'

export default class UserCreate extends React.Component {

  constructor(props) {
    super(props);
  }

  handleSubmit(event) {
    event.preventDefault()
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
      <Layout>
        <div className="form">
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
        </div>
      </Layout>
    )
  }
}
