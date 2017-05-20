import React from 'react'
import Layout from './Layout.jsx'
import { sendPost } from '../libs/client-methods.js'

export default class UserCreate extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      errors: [],
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    const username = event.target.username.value
    const email = event.target.email.value
    const password = event.target.password.value

    sendPost('/users', {
      user: { username, email, password },
    })
    .then(() => {
      sendPost('/user_sessions', { email, password })
      .then(() => {
        location.href = '/'
      })
    })
    .catch((error) => {
      this.setState({ errors: error.response.data })
    })
  }

  render() {
    return (
      <Layout>
        <div className="form">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <h2>ユーザー作成</h2>
            { this.state.errors.length > 0 ?
              this.state.errors.map((error) => {
                return <span>{error}<br /></span>
              }) : null }
            <input
              type="text"
              name="username"
              required
              autoFocus
              placeholder="ユーザーID (半角英数)"
              pattern="^[0-9A-Za-z]+$"
            />
            <br />
            <input
              type="email"
              name="email"
              required
              placeholder="メールアドレス"
            />
            <br />
            <input
              type="password"
              name="password"
              required
              minLength="8"
              placeholder="パスワード (8文字以上)"
            />
            <br />
            <br />
            <button className="button">送信</button>
          </form>
        </div>
      </Layout>
    )
  }
}
