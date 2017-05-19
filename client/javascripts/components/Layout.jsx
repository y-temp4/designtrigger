import React from 'react'
import PropTypes from 'prop-types'
import Header from './Header.jsx'

export default class Layout extends React.Component {
  static contextTypes = {
    rootProps: PropTypes.any,
  }

  render() {
    return (
      <div>
        <Header {...this.context.rootProps} />
        <div className="container">
          {this.props.children}
        </div>
      </div>
    )
  }
}
