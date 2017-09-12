import React from 'react'
import PropTypes from 'prop-types'
import emoji from 'remark-emoji'
import unified from 'unified'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import highlight from 'remark-highlight.js'
import rehype2react from 'rehype-react'
import row from 'rehype-raw'

const processor = unified()
  .use(markdown)
  .use(highlight)
  .use(emoji)
  .use(remark2rehype, { allowDangerousHTML: true })
  .use(row)
  .use(rehype2react, {
    createElement: React.createElement,
  })


const MarkdownRenderer = ({ body }) => <div>{processor.processSync(body).contents}</div>

MarkdownRenderer.propTypes = {
  body: PropTypes.string.isRequired,
}

export default MarkdownRenderer
