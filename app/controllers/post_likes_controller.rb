class PostLikesController < ApplicationController
  def create
    post = Post.find_by(uuid: params[:uuid])
    current_user.post_like post
    json = {}
    json[:likes_count] = post.post_likers.length
    render json: json
  end

  def destroy
    post = Post.find_by(uuid: params[:uuid])
    current_user.unpost_like post
    json = {}
    json[:likes_count] = post.post_likers.length
    render json: json
  end
end
