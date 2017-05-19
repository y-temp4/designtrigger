import React from 'react'
import Link from './Link.jsx'

export default class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <div className="container">
          <h1 className="header-title">
            <Link href="/">
              DesignTrigger
            </Link>
          </h1>
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
        </div>
      </header>
    )
  }
}
