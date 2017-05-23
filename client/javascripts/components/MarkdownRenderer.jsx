import React from 'react'
import PropTypes from 'prop-types'
import remark from 'remark'
import emoji from 'remark-emoji'
import reactRenderer from 'remark-react'

const processor = remark().use(reactRenderer).use(emoji)

const MarkdownRenderer = ({ body }) => <div>{processor.processSync(body).contents}</div>

MarkdownRenderer.propTypes = {
  body: PropTypes.string.isRequired,
}

export default MarkdownRenderer
