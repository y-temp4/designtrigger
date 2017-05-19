import React from 'react'
import PropTypes from 'prop-types'
import Layout from './Layout.jsx'
import Link from './Link.jsx'

export default class Post extends React.Component {

  static propTypes = {
    post: PropTypes.shape({
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
    }).isRequired,
    currentUser: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }).isRequired,
  }

  render() {
    const { post, currentUser } = this.props
    return (
      <Layout>
        <div className="post">
          {
            post.user_id === currentUser.id ?
              <Link href={`/@${currentUser.username}/${post.id}/edit`}>
                編集する
              </Link>
            :
            null
          }
          <h2>{this.props.post.title}</h2>
          <p>{this.props.post.body}</p>
        </div>
      </Layout>
    )
  }
}
