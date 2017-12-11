require 'matrix'

class TopsController < ApplicationController
  def show
    if current_user
      posts_with_username = Post.order(created_at: :desc).with_user
      render_for_react(
        props: {
          posts: posts_with_username,
        }
      )
    else
      render_for_react
    end
  end
end
