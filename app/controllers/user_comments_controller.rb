class UserCommentsController < ApplicationController
  def index
    user = User.find_by(username: params[:username])
    comments = Comment.where(user_id: user.id)
                      .includes(post: :user)
                      .order(created_at: :desc)
    comments_with_post_with_posted_user = comments.map do |comment|
      comment.as_json.merge(
        post: comment.post.as_json.merge(
          user: comment.post.user.as_json
        )
      )
    end
    is_following = current_user ? current_user.following?(user) : false
    following_count = user.following.length
    follower_count = user.followers.length

    render_for_react(
      props: {
        user: user,
        author: params[:username],
        comments: comments_with_post_with_posted_user,
        is_following: is_following,
        following_count: following_count,
        follower_count: follower_count,
      },
    )
  end
end
