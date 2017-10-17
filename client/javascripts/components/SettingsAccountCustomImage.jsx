import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Dropzone from 'react-dropzone'
import loadImage from 'blueimp-load-image'
import Errors from './Errors.jsx'
import Layout from './Layout.jsx'
import SettingsNav from './SettingsNav.jsx'

export default class SettingsAccountCustomImage extends React.Component {
  static propTypes = {
    currentUser: PropTypes.shape({
      email: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      profile_image_url: PropTypes.string.isRequired,
      uploaded_image_size: PropTypes.number.isRequired,
    }).isRequired,
  }

  static dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1])
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    const ab = new ArrayBuffer(byteString.length)
    const ia = new Uint8Array(ab)
    for (let i = 0; i < byteString.length; i += 1) {
      ia[i] = byteString.charCodeAt(i)
    }

    return new Blob([ab], { type: mimeString })
  }

  constructor(props) {
    super(props);

    this.state = {
      upload_image: null,
      image: props.currentUser.profile_image_url,
      errors: [],
    }
  }

  handleOnDrop(files) {
    const file = files[0]

    this.setState({ file })

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
        this.setState({ upload_image: dataUri })
      }, options)
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    const { upload_image } = this.state

    if (upload_image === null) {
      this.setState({ errors: ['画像をアップロードしてください'] })
      return
    }

    const data = new FormData()
    const blob = SettingsAccountCustomImage.dataURItoBlob(upload_image)
    const file = new File([blob], 'aaa')
    const { uploaded_image_size } = this.props.currentUser
    const limit = 10000000 - uploaded_image_size

    if (limit < file.size) {
      this.setState({ errors: ['上限を超えているため、画像がアップロードできません'] })
      return
    }

    data.append('image', file)
    data.append('image_size', file.size)

    const options = {
      headers: {
        'Content-Type': file.type,
      },
    }

    axios
      .patch('/settings/account/custom_image', data, options)
      .then(() => {
        location.href = '/settings/account'
      })
      .catch((error) => {
        this.setState({ errors: error.response.data })
      })
  }

  render() {
    const { username } = this.props.currentUser
    const { upload_image, image } = this.state

    return (
      <Layout title="ユーザー画像アップロード">
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
                        src={upload_image || image}
                        alt={username}
                        style={{ width: '100px' }}
                      />
                    </div>
                    <div className="column-small-9" style={{ textAlign: 'left', marginTop: '0.8em' }}>
                      <Dropzone onDrop={e => this.handleOnDrop(e)} accept="image/*" style={{}}>
                        ドラッグまたはクリックして画像をアップロード
                      </Dropzone>
                    </div>
                  </div>
                </div>
                <button className="button" disabled={upload_image === null}>更新</button>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
