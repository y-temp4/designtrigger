import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import Header from './Header.jsx'
import Footer from './Footer.jsx'

const Layout = (props, context) => {
  const { title, children } = props

  return (
    <div>
      <Helmet>
        <title>
          {
            title === 'DesignTrigger' ? 'DesignTrigger'
              : `${title} - DesignTrigger`
          }
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>
      <Header {...context.rootProps} />
      {children}
      <Footer />
    </div>
  )
}

Layout.contextTypes = {
  rootProps: PropTypes.any,
}

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default Layout
