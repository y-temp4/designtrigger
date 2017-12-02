class TagsController < ApplicationController
  def index
    render_for_react(
      props: {
        tags: ActsAsTaggableOn::Tag.all.order("taggings_count DESC").as_json,
      }
    )
  end

  def show
    tag = params[:tag]
    posts = Post.includes(:user).order(created_at: :desc).tagged_with(tag)
    posts_with_username = posts.with_user
    render_for_react(
      props: {
        posts: posts_with_username,
        tag: tag,
      }
    )
  end
end
