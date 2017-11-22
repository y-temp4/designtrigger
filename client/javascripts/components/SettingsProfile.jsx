import React from 'react'
import PropTypes from 'prop-types'
import Errors from './Errors.jsx'
import Layout from './Layout.jsx'
import SettingsNav from './SettingsNav.jsx'
import { sendPatch } from '../libs/client-methods.js'

const max_chars = 100

export default class SettingsProfile extends React.Component {
  static propTypes = {
    currentUser: PropTypes.shape({
      description: PropTypes.string.isRequired,
      website_url: PropTypes.string.isRequired,
    }).isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      chars_left: max_chars - props.currentUser.description.length,
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

  handleChange(event) {
    const input = event.target.value
    console.log(event)
    this.setState({ chars_left: max_chars - input.length })
  }

  render() {
    const { description, website_url } = this.props.currentUser

    return (
      <Layout title="プロフィール設定">
        <div className="container-small form">
          <div className="row">
            <div className="column-small-8 offset-small-2">
              <SettingsNav path="/settings/profile" />
              <Errors errors={this.state.errors} />
              <form onSubmit={e => this.handleSubmit(e)}>
                <label htmlFor="website_url">サイト・ブログ</label>
                <input
                  type="url"
                  name="website_url"
                  placeholder="URL"
                  defaultValue={website_url}
                />
                <label htmlFor="description">自己紹介</label>
                <textarea
                  type="text"
                  name="description"
                  maxLength="100"
                  placeholder="自己紹介（100文字以内）"
                  defaultValue={description}
                  onChange={e => this.handleChange(e)}
                  className="profile"
                />
                <div style={{ float: 'right', marginTop: '-3em' }}>
                  {this.state.chars_left} / 100
                </div>
                <button className="button">更新</button>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
