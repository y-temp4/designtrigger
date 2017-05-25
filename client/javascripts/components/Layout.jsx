import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from "react-helmet"
import Header from './Header.jsx'

export default class Layout extends React.Component {
  static contextTypes = {
    rootProps: PropTypes.any,
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>
            {
              this.props.title === 'DesignTrigger' ? 'DesignTrigger'
              : `${this.props.title} - DesignTrigger`
            }
          </title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Helmet>
        <Header {...this.context.rootProps} />
        {this.props.children}
      </div>
    )
  }
}
