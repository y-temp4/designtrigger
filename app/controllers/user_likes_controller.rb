class UserLikesController < ApplicationController
  def index
    user = User.find_by(username: params[:username])
    posts_with_username = user.post_liking.includes(:user).order(created_at: :desc).with_user
    is_following = current_user ? current_user.following?(user) : false
    following_count = user.following.length
    follower_count = user.followers.length

    render_for_react(
      props: {
        user: user,
        author: params[:username],
        posts: posts_with_username,
        is_following: is_following,
        following_count: following_count,
        follower_count: follower_count,
      },
    )
  end
end
