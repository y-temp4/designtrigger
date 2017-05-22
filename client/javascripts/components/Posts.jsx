import React from 'react'
import Layout from './Layout.jsx'
import Link from './Link.jsx'

export default class Posts extends React.Component {

  render() {
    return (
      <Layout>
        <div className="container">
          <ul>
            {this.props.posts.map((post) => {
              return (
                <li key={post.id}>
                  <Link href={`/@${post.username}/${post.id}`}>
                    {post.title}
                  </Link>
                  <span> by <Link href={`/@${post.username}`}>{post.username}</Link></span>
                </li>
              )
            })}
          </ul>
        </div>
      </Layout>
    )
  }
}
