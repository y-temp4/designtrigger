import React from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import loadImage from 'blueimp-load-image'
import Errors from './Errors.jsx'
import Layout from './Layout.jsx'
import SettingsNav from './SettingsNav.jsx'
import { sendPatch } from '../libs/client-methods.js'

export default class SettingsAccount extends React.Component {
  static propTypes = {
    currentUser: PropTypes.shape({
      email: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      profile_image_url: PropTypes.string.isRequired,
    }).isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      image: props.currentUser.profile_image_url,
      errors: [],
    }
  }

  handleOnDrop(files) {
    const file = files[0]

    loadImage.parseMetaData(file, (data) => {
      const options = {
        maxHeight: 100,
        maxWidth: 100,
        canvas: true,
        crop: true,
      }
      if (data.exif) {
        options.orientation = data.exif.get('Orientation')
      }
      loadImage(file, (canvas) => {
        const dataUri = canvas.toDataURL('image/jpg')
        this.setState({ image: dataUri })
      }, options)
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    const username = event.target.username.value
    const email = event.target.email.value
    const profile_image_url = this.state.image.split(',')[1]

    sendPatch('/settings/account', {
      user: { username, email, profile_image_url },
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
                <label htmlFor="icon" style={{ marginBottom: '1em' }}>アイコン</label><br />
                <div className="container-small">
                  <div className="row">
                    <div className="column-small-3">
                      <img
                        className="user-avatar"
                        src={this.state.image}
                        alt={username}
                        style={{ width: '100px' }}
                      />
                    </div>
                    <div className="column-small-9" style={{ textAlign: 'left', marginTop: '0.8em' }}>
                      <Dropzone onDrop={e => this.handleOnDrop(e)} accept="image/*" style={{}}>
                        画像を変更する
                      </Dropzone>
                    </div>
                  </div>
                </div>
                <br />
                <label htmlFor="username">ユーザーID</label>
                <input
                  type="text"
                  name="username"
                  required
                  placeholder="ユーザーID (半角英数)"
                  defaultValue={username}
                  pattern="^[0-9A-Za-z_]+$"
                  maxLength="15"
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
