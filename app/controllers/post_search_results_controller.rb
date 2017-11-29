class PostSearchResultsController < ApplicationController
  def show
    keywords = params[:q].split(/[\p{blank}\s]+/)
    groupings = keywords.reduce({}) do |acc, elem|
      acc.merge(elem => { title_or_body_or_tags_name_cont: elem })
    end
    posts = Post.ransack(combinator: 'and', groupings: groupings).result(distinct: true)

    posts_with_username = posts.includes(:user).order(created_at: :desc).map do |post|
      post.as_json.merge(user: post.user.as_json)
    end
    render_for_react(
      props: {
        posts: posts_with_username,
        title: keywords.join(' '),
      }
    )
  end
end
