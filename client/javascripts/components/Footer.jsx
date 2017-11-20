import React from 'react'
import Link from './Link.jsx'

const Footer = () => (
  <footer className="footer">
    <div className="container-big footer-container">
      <ul>
        <li>
          <Link href="/">Top</Link>
        </li>
        <li>
          <Link href="/terms">Terms</Link>
        </li>
        <li>
          <Link href="/privacy">Privacy</Link>
        </li>
      </ul>
    </div>
  </footer>
)

export default Footer
