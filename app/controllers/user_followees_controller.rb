class UserFolloweesController < ApplicationController
  def index
    user = User.find_by(username: params[:username])
    is_following = current_user ? current_user.following?(user) : false
    following_users = user.following
    following_count = following_users.length
    follower_count = user.followers.length

    render_for_react(
      props: {
        user: user,
        posts: Post.where(user_id: user.id).order(created_at: :desc),
        is_following: is_following,
        following_count: following_count,
        follower_count: follower_count,
        following_users: following_users
      }
    )
  end
end
