import React from 'react'
import remark from 'remark'
import emoji from 'remark-emoji'
import reactRenderer from 'remark-react'

const processor = remark().use(reactRenderer).use(emoji)

export default class MarkdownRenderer extends React.Component {

  render() {
    return (
      <div>
        {processor.processSync(this.props.body).contents}
      </div>
    )
  }
}
