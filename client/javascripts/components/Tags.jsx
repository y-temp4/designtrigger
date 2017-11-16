import React from 'react'
import PropTypes from 'prop-types'
import Layout from './Layout.jsx'
import Link from './Link.jsx'

const Tags = ({ tags }) => (
  <Layout title="タグ一覧">
    <div className="container">
      <h2>タグ一覧</h2>
      {tags.map(tag => (
        <Link href={`/tags/${tag.name}`}>
          <span
            key={tag.id}
            className="tag tag-with-count"
            data-count={tag.taggings_count}
          >
            {tag.name}
          </span>
        </Link>
      ))}
    </div>
  </Layout>
)

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.object),
}

Tags.defaultProps = {
  tags: [],
}

export default Tags
