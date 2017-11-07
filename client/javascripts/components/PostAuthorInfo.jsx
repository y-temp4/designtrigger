import React from 'react'
import PropTypes from 'prop-types'
import Link from './Link.jsx'
import UserIcon from './UserIcon.jsx'

const PostAuthorInfo = ({ author, post }) => (
  <div className="row">
    <div className="column-extra-small-2" style={{ width: '70px', padding: '5px 0 0 10px' }}>
      <Link href={`/@${author.username}`}>
        <UserIcon user={author} width={'60px'} />
      </Link>
    </div>
    <div className="column-extra-small-9">
      <Link href={`/@${author.username}`} className="post-author-username">{author.username}</Link>
      <p className="post-author-description">
        {author.description}
      </p>
      {
        post !== null && <p className="post-date">{new Date(post.created_at).toDateString()}</p>
      }
    </div>
  </div>
)

PostAuthorInfo.propTypes = {
  author: PropTypes.shape({
    username: PropTypes.string.isRequired,
    description: PropTypes.string,
    profile_image_url: PropTypes.string.isRequired,
  }).isRequired,
  post: PropTypes.shape({
    created_at: PropTypes.string.isRequired,
  }),
}

PostAuthorInfo.defaultProps = {
  post: null,
}

export default PostAuthorInfo
