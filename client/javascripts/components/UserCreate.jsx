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
            <h2>ユーザー作成</h2>
            <input type="email" name="email" required autoFocus placeholder="メールアドレス" />
            <br />
            <input type="password" name="password" required placeholder="パスワード" />
            <br />
            <input type="password" name="password_confirmation" required placeholder="パスワード確認" />
            <br />
            <br />
            <button className="button">送信</button>
          </form>
        </div>
      </Layout>
    )
  }
}
