class PostSearchResultsController < ApplicationController
  def show
    if params[:q]
      keywords = params[:q].split(/[\p{blank}\s]+/)
      groupings = keywords.reduce({}) do |acc, elem|
        acc.merge(elem => { title_or_body_or_tags_name_cont: elem })
      end
      posts = Post.ransack(combinator: 'and', groupings: groupings).result(distinct: true)
      posts_with_username = posts.order(created_at: :desc).with_user
      render_for_react(
        props: {
          posts: posts_with_username,
          title: keywords.join(' '),
        }
      )
    else
      render_for_react
    end
  end
end
