import React from 'react'
import gravatar from 'gravatar'
import Link from './Link.jsx'
import { sendDelete } from '../libs/client-methods.js'

export default class Header extends React.Component {

  handleLogout(event) {
    event.stopPropagation()
    event.nativeEvent.stopImmediatePropagation()
    sendDelete('/logout').then(() => {
      location.href = '/'
    })
  }

  render() {
    return (
      <header className="header">
        <div className="container">
          <h1 className="header-title">
            <Link href="/">
              DesignTrigger
            </Link>
          </h1>
          {(() => {
            return this.props.currentUser === null ?
              <div className="header-right-box">
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
                <div className="header-right-box-text">
                  <Link href="/posts/new">
                    Write a post
                  </Link>
                </div>
                <div className="header-right-box-text">
                  <a href="/user_sessions" onClick={this.handleLogout.bind(this)}>
                    Logout
                  </a>
                </div>
                <div className="header-right-box-img">
                  <img
                    className="header-avatar"
                    src={gravatar.url(this.props.currentUser.email, { s: '30' })}
                    alt={this.props.currentUser.username}
                  />
                </div>
              </div>
          })()}
        </div>
      </header>
    )
  }
}
