import React from 'react'
import PropTypes from 'prop-types'
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap_white.css'
import Link from './Link.jsx'
import PostSearchForm from './PostSearchForm.jsx'
import UserIcon from './UserIcon.jsx'
import { sendDelete } from '../libs/client-methods.js'

export default class Header extends React.Component {
  static defaultProps = {
    currentUser: null,
  }

  static propTypes = {
    currentUser: PropTypes.shape({
      username: PropTypes.string,
    }),
  }

  static handleLogout(event) {
    event.preventDefault()
    event.stopPropagation()
    event.nativeEvent.stopImmediatePropagation()
    sendDelete('/logout').then(() => {
      location.href = '/'
    })
  }

  constructor(props) {
    super(props)

    this.state = {
      visible: false,
    }
  }

  onVisibleChange() {
    this.setState({ visible: !this.state.visible })
  }

  render() {
    const { currentUser } = this.props

    return (
      <header className="header">
        <div className="container">
          <h1 className="header-title">
            <Link href="/">
              DesignTrigger
            </Link>
          </h1>
          {currentUser === null ?
            <div className="header-right-box">
              <div className="header-right-box-search">
                <PostSearchForm />
              </div>
              <div className="header-right-box-text">
                <Link href="/login">
                  Sign in
                </Link>
              </div>
              <div className="header-right-box-text">
                <Link href="/users/new">
                  Sign up
                </Link>
              </div>
            </div>
            :
            <div className="header-right-box">
              <div className="header-right-box-search">
                <div className="header-right-box-search-icon">
                  <Link href="search">
                    <img src="https://designtrigger-assets.s3.amazonaws.com/search-small.png" alt="search" />
                  </Link>
                </div>
                <PostSearchForm />
              </div>
              <div className="header-right-box-text">
                <Link href="/posts/new">
                  Write a post
                </Link>
              </div>
              <div className="header-right-box-img">
                <Tooltip
                  className="tooltip"
                  placement="bottom"
                  visible={this.state.visible}
                  onVisibleChange={() => this.onVisibleChange()}
                  trigger="click"
                  arrowContent={<div className="rc-tooltip-arrow-inner" />}
                  align={{
                    offset: [0, 10],
                  }}
                  overlay={
                    <ul>
                      <li>
                        <Link className="tooltip-link" href={`/@${currentUser.username}`}>
                          Your Profile
                        </Link>
                      </li>
                      <li>
                        <Link className="tooltip-link" href="/settings/account">
                          Settings
                        </Link>
                      </li>
                      <li>
                        <a href="/logout" className="tooltip-link" onClick={e => Header.handleLogout(e)}>
                          Logout
                        </a>
                      </li>
                    </ul>
                  }
                >
                  <a href="" onClick={event => event.preventDefault()}>
                    <UserIcon user={currentUser} width={'30px'} />
                  </a>
                </Tooltip>
              </div>
            </div>}
        </div>
      </header>
    )
  }
}
