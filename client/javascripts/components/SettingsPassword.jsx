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
        <div className="container-small form">
          <div className="row">
            <div className="column-small-8 offset-small-2">
              <SettingsNav path="/settings/password" />
              <Errors errors={this.state.errors} />
              <form onSubmit={e => this.handleSubmit(e)}>
                <label htmlFor="password">パスワード</label>
                <input
                  type="password"
                  name="password"
                  required
                  minLength="8"
                  placeholder="パスワード（8文字以上）"
                />
                <label htmlFor="password_confirmation">パスワード確認</label>
                <input
                  type="password"
                  name="password_confirmation"
                  required
                  placeholder="パスワード確認"
                />
                <button className="button">更新</button>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
