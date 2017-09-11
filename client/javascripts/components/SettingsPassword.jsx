import React from 'react'
import Errors from './Errors.jsx'
import Layout from './Layout.jsx'
import SettingsNav from './SettingsNav.jsx'
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
    const password_confirmation = event.target.password_confirmation.value

    sendPatch('/settings/password', {
      user: { password, password_confirmation },
    }).then(() => {
      location.href = '/settings/password'
    }).catch((error) => {
      this.setState({ errors: error.response.data })
    })
  }
  render() {
    return (
      <Layout title="パスワード設定">
        <div className="container-small">
          <SettingsNav path="/settings/password" />
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
