import React from 'react'
import PropTypes from 'prop-types'
import Layout from './Layout.jsx'
import UserInfo from './UserInfo.jsx'
import UserComment from './UserComment.jsx'

const UserComments = (props) => {
  const { user, comments } = props
  const title = `${user.username}'s comments`

  return (
    <Layout title={title}>
      <div className="user">
        <div className="container-small">
          <UserInfo {...props} />
          <div className="row user-comments-box">
            <div className="column-small-12">
              <h2>{title}</h2>
              <div className="user-comments-box">
                {comments.map(comment => (
                  <UserComment key={comment.id} {...props} comment={comment} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

UserComments.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape,
  ),
}

UserComments.defaultProps = {
  comments: [],
}

export default UserComments
