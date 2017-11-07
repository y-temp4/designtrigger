class FollowsController < ApplicationController
  def create
    @followee = User.find(follow_params['user_id'])
    current_user.follow @followee
    render json: { follower_count: @followee.followers.length }
  end

  def destroy
    @followee = User.find(params['userId'])
    current_user.unfollow @followee
    render json: { follower_count: @followee.followers.length }
  end

  private

  def follow_params
    params.require(:follow).permit(:user_id)
  end
end
