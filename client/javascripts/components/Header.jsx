import React from 'react'
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
              <ul>
                <li>
                  <Link href="/login">
                    Sign in
                  </Link>
                </li>
                /
                <li>
                  <Link href="/users/new">
                    Sign up
                  </Link>
                </li>
              </ul>
            :
              <ul>
                <li>
                  <Link href="/posts/new">
                    Write a post
                  </Link>
                </li>
                /
                <li>
                  <a href="/user_sessions" onClick={this.handleLogout.bind(this)}>
                    Logout
                  </a>
                </li>
              </ul>
          })()}
        </div>
      </header>
    )
  }
}
