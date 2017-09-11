import React from 'react'
import PropTypes from 'prop-types'
import Link from './Link.jsx'

const SettingsNav = ({ path }) => {
  let accountLink = <Link href="/settings/account">アカウント設定</Link>
  let passwordLink = <Link href="/settings/password">パスワード設定</Link>
  let profileLink = <Link href="/settings/profile">プロフィール設定</Link>
  let title = ''
  switch (path) {
    case '/settings/account':
      title = 'アカウント設定'
      accountLink = <p>アカウント設定</p>
      break
    case '/settings/password':
      title = 'パスワード設定'
      passwordLink = <p>パスワード設定</p>
      break
    case '/settings/profile':
      title = 'プロフィール設定'
      profileLink = <p>プロフィール設定</p>
      break
    default:
  }
  return (
    <div>
      <h1>{title}</h1>
      <ul style={{ listStyle: 'none', paddingLeft: '20px' }}>
        <li style={{ display: 'inline-block', marginRight: '1em' }}>
          {accountLink}
        </li>
        <li style={{ display: 'inline-block', marginRight: '1em' }}>
          {passwordLink}
        </li>
        <li style={{ display: 'inline-block' }}>
          {profileLink}
        </li>
      </ul>
    </div>
  )
}

SettingsNav.propTypes = {
  path: PropTypes.string.isRequired,
}

export default SettingsNav
