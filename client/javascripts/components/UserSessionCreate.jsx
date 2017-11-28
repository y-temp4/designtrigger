import React from 'react'
import PropTypes from 'prop-types'
import Layout from './Layout.jsx'
import { sendPost } from '../libs/client-methods.js'

export default class UserSessionCreate extends React.Component {
  static defaultProps = {
    referer: null,
  }

  static propTypes = {
    referer: PropTypes.string,
  }

  constructor(props) {
    super(props)

    this.state = {
      error: '',
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    const { referer } = this.props
    sendPost('/user_sessions', {
      email: event.target.email.value,
      password: event.target.password.value,
    }).then(() => {
      location.href = referer !== null ? referer : '/'
    }).catch((error) => {
      this.setState({ error: error.response.data })
    })
  }

  render() {
    return (
      <Layout title="ログイン">
        <div className="container-small">
          <div className="row">
            <div className="column-small-8 offset-small-2">
              <div className="form">
                <form onSubmit={e => this.handleSubmit(e)}>
                  <h2>ログイン</h2>
                  {this.state.error}
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="メールアドレス"
                  />
                  <input
                    type="password"
                    name="password"
                    required
                    placeholder="パスワード (8文字以上)"
                    minLength="8"
                  />
                  <button className="button">送信</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
