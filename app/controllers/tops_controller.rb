class TopsController < ApplicationController
  def show
    posts_with_username = Post.includes(:user).order(created_at: :desc).map do |post|
      post_with_username = post.attributes
      post_with_username[:username] = post.user.username
      post_with_username
    end
    render_for_react(
      props: {
        posts: posts_with_username,
      }
    )
  end
end
