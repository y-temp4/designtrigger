import React from 'react'
import PropTypes from 'prop-types'

const Errors = ({ errors }) => (
  <div>
    {errors.map(error => <span key={error}>{error}<br /></span>)}
  </div>
)

Errors.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string),
}

Errors.defaultProps = {
  errors: [],
}

export default Errors
