import React from 'react'
import Errors from './Errors.jsx'
import Layout from './Layout.jsx'
import Link from './Link.jsx'
import { sendPatch } from '../libs/client-methods.js'

export default class SettingsProfile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      errors: [],
    }
  }

  handleSubmit(event) {
    event.preventDefault()

    const description = event.target.description.value
    const website_url = event.target.website_url.value

    sendPatch('/settings/profile', {
      user: { description, website_url },
    }).then(() => {
      location.href = '/settings/profile'
    }).catch((error) => {
      this.setState({ errors: error.response.data })
    })
  }
  render() {
    const { description, website_url } = this.props.currentUser

    return (
      <Layout>
        <div className="container-small">
          <h1>プロフィール設定</h1>
          <ul style={{ listStyle: 'none' }}>
            <li style={{ display: 'inline-block' }}>
              <Link href="/settings/account">
                アカウント設定　
              </Link>
            </li>
            <li style={{ display: 'inline-block' }}>
              <Link href="/settings/password">
                パスワード設定　
              </Link>
            </li>
            <li style={{ display: 'inline-block' }}>
              <p>プロフィール設定</p>
            </li>
          </ul>
          <Errors errors={this.state.errors} />
          <br />
          <form onSubmit={this.handleSubmit.bind(this)}>
            <label htmlFor="website_url">サイト・ブログ</label>
            <br />
            <input
              type="url"
              name="website_url"
              placeholder="URL"
              defaultValue={website_url}
              />
            <br />
            <br />
            <label htmlFor="description">自己紹介</label>
            <br />
            <textarea
              type="text"
              name="description"
              maxLength="100"
              placeholder="自己紹介（100文字以内）"
              defaultValue={description}
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
