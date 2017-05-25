class TopsController < ApplicationController
  def show
    posts_with_username = Post.includes(:user).order(created_at: :desc).map do |post|
      post.as_json.merge(user: post.user.as_json)
    end
    render_for_react(
      props: {
        posts: posts_with_username,
      }
    )
  end
end
