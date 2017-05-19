import React from 'react'
import PropTypes from 'prop-types'

export default class Link extends React.Component {

  static contextTypes = {
    onLinkClick: PropTypes.func,
  }

  onClick(event) {
    this.context.onLinkClick(event);
  }

  render() {
    return (
      <a onClick={this.onClick.bind(this)} {...this.props}>
        {this.props.children}
      </a>
    );
  }
}
