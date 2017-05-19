import React from 'react'
import Layout from './Layout.jsx'

export default class Post extends React.Component {

  render() {
    return (
      <Layout>
        <div className="post">
          <h2>{this.props.post.title}</h2>
          <p>{this.props.post.body}</p>
        </div>
      </Layout>
    )
  }
}
