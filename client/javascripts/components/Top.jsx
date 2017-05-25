import React from 'react'
import Errors from './Errors.jsx'
import Layout from './Layout.jsx'
import Link from './Link.jsx'
import { sendPost } from '../libs/client-methods.js'

export default class Top extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      isChecked: false,
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

  handleInputChange() {
    this.setState({ isChecked: !this.state.isChecked })
  }

  render() {
    return (
      <Layout>
        { this.props.currentUser === null ?
          <div className="top">
            <div className="container-max">
              <div className="container-big">
                <div className="row top-hero">
                  <div className="column-small-7">
                    <h1>Express your Design</h1>
                    <p className="top-hero-description">
                      DesignTriggerは、デザインに関する知識を記録・共有するためのサービスです。
                    </p>
                    <Link href="/posts">記事一覧へ</Link>
                  </div>
                  <div className="column-small-5">
                    <div className="form top-content-for-pc">
                      <form onSubmit={this.handleSubmit.bind(this)}>
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
                          type={this.state.isChecked ? 'text' : 'password'}
                          name="password"
                          required
                          minLength="8"
                          placeholder="パスワード (8文字以上)"
                        />
                        <label
                          htmlFor="toggle_password"
                          className="toggle-password"
                        >
                          <input
                            checked={this.state.isChecked}
                            type="checkbox"
                            onChange={this.handleInputChange.bind(this)}
                          />
                          パスワードを表示する
                        </label>
                        <button className="button">
                          {'Sign up for DesignTrigger'}
                        </button>
                        <p className="form-notice">
                          {'"Sign up for DesignTrigger" を押すことにより、利用規約とプライバシーポリシーに同意したものとします。'}
                        </p>
                      </form>
                    </div>
                    <div className="top-content-for-mobile">
                      <button className="button">
                        <Link href="/users/new">
                          {'Sign up for DesignTrigger'}
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        :
          <div className="container">
            <ul>
              {this.props.posts.map(post => (
                <li key={post.id}>
                  <Link href={`/@${post.username}/${post.id}`}>
                    {post.title}
                  </Link>
                  <span> by <Link href={`/@${post.username}`}>{post.username}</Link></span>
                </li>),
              )}
            </ul>
          </div>}
      </Layout>
    )
  }
}
