import React from 'react'
import Errors from './Errors.jsx'
import Layout from './Layout.jsx'
import Link from './Link.jsx'
import { sendPatch } from '../libs/client-methods.js'

export default class SettingsAccount extends React.Component {

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

    sendPatch('/settings/account', {
      user: { username, email },
    }).then(() => {
      location.href = '/settings/account'
    }).catch((error) => {
      this.setState({ errors: error.response.data })
    })
  }
  render() {
    const { username, email } = this.props.currentUser

    return (
      <Layout>
        <div className="container-small">
          <h1>アカウント設定</h1>
          <ul style={{ listStyle: 'none' }}>
            <li style={{ display: 'inline-block' }}>
              <p>アカウント設定　</p>
            </li>
            <li style={{ display: 'inline-block' }}>
              <Link href="/settings/password">
                パスワード設定
              </Link>
            </li>
          </ul>
          <Errors errors={this.state.errors} />
          <br />
          <form onSubmit={this.handleSubmit.bind(this)}>
            <label htmlFor="username">ユーザーID</label>
            <br />
            <input
              type="text"
              name="username"
              required
              placeholder="ユーザーID (半角英数)"
              defaultValue={username}
              pattern="^[0-9A-Za-z]+$"
            />
            <br />
            <br />
            <label htmlFor="email">メールアドレス</label>
            <br />
            <input
              type="email"
              name="email"
              required
              placeholder="メールアドレス"
              defaultValue={email}
            />
            <br />
            <br />
            <button className="button">更新</button>
          </form>
        </div>
      </Layout>
    )
  }
}
