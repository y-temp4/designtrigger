import React from 'react'
import PropTypes from 'prop-types'
import Errors from './Errors.jsx'
import Layout from './Layout.jsx'
import SettingsNav from './SettingsNav.jsx'
import { sendPatch } from '../libs/client-methods.js'

export default class SettingsAccount extends React.Component {
  static propTypes = {
    currentUser: PropTypes.shape({
      email: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }).isRequired,
  }

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
      <Layout title="アカウント設定">
        <div className="container-small form">
          <div className="row">
            <div className="column-small-8 offset-small-2">
              <SettingsNav path="/settings/account" />
              <Errors errors={this.state.errors} />
              <form onSubmit={e => this.handleSubmit(e)}>
                <label htmlFor="username">ユーザーID</label>
                <input
                  type="text"
                  name="username"
                  required
                  placeholder="ユーザーID (半角英数)"
                  defaultValue={username}
                  pattern="^[0-9A-Za-z_]+$"
                />
                <label htmlFor="email">メールアドレス</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="メールアドレス"
                  defaultValue={email}
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
