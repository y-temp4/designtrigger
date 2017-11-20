import React from 'react'
import Errors from './Errors.jsx'
import Layout from './Layout.jsx'
import Link from './Link.jsx'
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
    const password_confirmation = event.target.password.value

    sendPost('/users', {
      user: { username, email, password, password_confirmation },
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
      <Layout title="ユーザー作成">
        <div className="container-small">
          <div className="row">
            <div className="column-small-8 offset-small-2">
              <div className="form">
                <form onSubmit={e => this.handleSubmit(e)}>
                  <h2>ユーザー作成</h2>
                  <Errors errors={this.state.errors} />
                  <input
                    type="text"
                    name="username"
                    required
                    autoFocus
                    placeholder="ユーザーID (半角英数)"
                    pattern="^[0-9A-Za-z_]+$"
                  />
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
                    minLength="8"
                    placeholder="パスワード (8文字以上)"
                  />
                  <button className="button">送信</button>
                  <p className="form-notice" style={{ textAlign: 'left' }}>
                    {'"'}送信{'"'} を押すことにより、
                    <Link href="/terms">利用規約</Link>と<Link href="/privacy">プライバシーポリシー</Link>に同意したものとします。
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
