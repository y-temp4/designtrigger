import React from 'react'
import Layout from './Layout.jsx'
import { sendPost } from '../libs/client-methods.js'

export default class UserSessionCreate extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      error: '',
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    sendPost('/user_sessions', {
      email: event.target.email.value,
      password: event.target.password.value,
    }).then(() => {
      location.href = '/'
    })
    .catch((error) => {
      this.setState({ error: error.response.data })
    })
  }

  render() {
    return (
      <Layout>
        <div className="container-small">
          <div className="row">
            <div className="column-small-8 offset-small-2">
              <div className="form">
                <form onSubmit={this.handleSubmit.bind(this)}>
                  <h2>ログイン</h2>
                  {this.state.error}
                  <input type="email" name="email" required placeholder="メールアドレス" />
                  <input type="password" name="password" required minLength="8" placeholder="パスワード (8文字以上)" />
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
