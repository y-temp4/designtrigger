import React from 'react'
import PropTypes from 'prop-types'

const Errors = ({ errors }) => (
  <div>
    {errors.map(error => <span>{error}<br /></span>)}
  </div>
)

Errors.propTypes = {
  errors: PropTypes.arrayOf,
}

Errors.defaultProps = {
  errors: [],
}

export default Errors
