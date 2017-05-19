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
    sendPost('/users', {
      user: {
        username: event.target.username.value,
        email: event.target.email.value,
        password: event.target.password.value,
      },
    }).catch((error) => {
      console.log(error.response.data)
      this.setState({ errors: error.response.data })
    })
  }

  render() {
    return (
      <Layout>
        <div className="form">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <h2>ユーザー作成</h2>
            { this.state.errors.length > 1 ?
              this.state.errors.map((error) => {
                return <span>{error}<br /></span>
              }) : <div /> }
            <input type="text" name="username" required autoFocus placeholder="ユーザーID (半角英数)" />
            <br />
            <input type="email" name="email" required placeholder="メールアドレス" />
            <br />
            <input type="password" name="password" required minLength='8' placeholder="パスワード (8文字以上)" />
            <br />
            <br />
            <button className="button">送信</button>
          </form>
        </div>
      </Layout>
    )
  }
}
