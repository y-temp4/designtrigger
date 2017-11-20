import React from 'react'
import PropTypes from 'prop-types'
import Errors from './Errors.jsx'
import Layout from './Layout.jsx'
import Link from './Link.jsx'
import PostList from './PostList.jsx'
import { sendPost } from '../libs/client-methods.js'

export default class Top extends React.Component {
  static defaultProps = {
    currentUser: null,
  }

  static propTypes = {
    posts: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentUser: PropTypes.shape(),
  }

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
      <Layout title="DesignTrigger">
        { this.props.currentUser === null ?
          <div className="top">
            <div className="container-max top-hero-container">
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
                      <form onSubmit={e => this.handleSubmit(e)}>
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
                            onChange={e => this.handleInputChange(e)}
                          />
                          パスワードを表示する
                        </label>
                        <button className="button button-full">
                          {'Sign up for DesignTrigger'}
                        </button>
                        <p className="form-notice">
                          {'"'}Sign up for DesignTrigger{'"'} を押すことにより、<Link href="/terms">利用規約</Link>とプライバシーポリシーに同意したものとします。
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
            <div className="container-big">
              <div className="row features">
                <h2>豊富な機能</h2>
                <div className="column-small-4">
                  <div className="img-box">
                    <img src="https://designtrigger-assets.s3.amazonaws.com/file-text-o.png" alt="Markdown" />
                  </div>
                  <p>書きやすいMarkdownエディタ</p>
                </div>
                <div className="column-small-4">
                  <div className="img-box">
                    <img src="https://designtrigger-assets.s3.amazonaws.com/search.png" alt="検索" />
                  </div>
                  <p>気になるテーマで記事を検索</p>
                </div>
                <div className="column-small-4">
                  <div className="img-box">
                    <img src="https://designtrigger-assets.s3.amazonaws.com/users.png" alt="ユーザー" />
                  </div>
                  <p>お気に入りのユーザーをフォロー</p>
                </div>
              </div>
            </div>
            <div className="container-max call-to-action-container">
              <div className="container-big">
                <div className="row call-to-action">
                  <h2>今すぐ使ってみる</h2>
                  <button className="button button-action">
                    <Link href="/users/new">
                      登録ページはこちら
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
          :
          <PostList posts={this.props.posts} />}
      </Layout>
    )
  }
}
