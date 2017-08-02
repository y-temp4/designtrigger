class UserFollowersController < ApplicationController
  def index
    @user = User.find_by(username: params[:username])
    @is_following = current_user ? current_user.following?(@user) : false
    @followers = @user.followers
    @following_count = @user.following.length
    @follower_count = @followers.length

    render_for_react(
      props: {
        user: @user,
        posts: Post.where(user_id: @user.id).order(created_at: :desc),
        is_following: @is_following,
        following_count: @following_count,
        follower_count: @follower_count,
        followers: @followers
      }
    )
  end
end
