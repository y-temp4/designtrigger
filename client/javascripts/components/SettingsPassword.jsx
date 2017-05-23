import React from 'react'
import Errors from './Errors.jsx'
import Layout from './Layout.jsx'
import Link from './Link.jsx'
import { sendPatch } from '../libs/client-methods.js'

export default class SettingsPassword extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      errors: [],
    }
  }

  handleSubmit(event) {
    event.preventDefault()

    const password = event.target.password.value
    const passwordConfirmation = event.target.password_confirmation.value

    sendPatch('/settings/password', {
      user: { password, passwordConfirmation },
    }).then(() => {
      // location.href = '/settings/password'
    }).catch((error) => {
      this.setState({ errors: error.response.data })
    })
  }
  render() {
    return (
      <Layout>
        <div className="container-small">
          <h1>パスワード設定</h1>
          <ul style={{ listStyle: 'none' }}>
            <li style={{ display: 'inline-block' }}>
              <Link href="/settings/account">
                アカウント設定　
              </Link>
            </li>
            <li style={{ display: 'inline-block' }}>
              <p>パスワード設定</p>
            </li>
          </ul>
          <Errors errors={this.state.errors} />
          <br />
          <form onSubmit={this.handleSubmit.bind(this)}>
            <label htmlFor="password">パスワード</label>
            <br />
            <input
              type="password"
              name="password"
              required
              minLength="8"
              placeholder="パスワード（8文字以上）"
            />
            <br />
            <br />
            <label htmlFor="password_confirmation">パスワード確認</label>
            <br />
            <input
              type="password"
              name="password_confirmation"
              required
              placeholder="パスワード確認"
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
