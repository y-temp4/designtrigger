class PostsController < ApplicationController
  before_action :set_post, only: [:show, :edit, :update, :destroy]

  # GET /posts
  def index
    posts_with_username = Post.includes(:user).order(created_at: :desc).map do |post|
      post.as_json.merge(user: post.user.as_json)
    end
    render_for_react(
      props: {
        posts: posts_with_username,
      }
    )
  end

  # GET /@:username/1
  def show
    if @post
      # ユーザー名が違うURLにアクセス時に正しいURLへ移動
      correct_url = "/@#{@post.user.username}/posts/#{@post.uuid}"
      redirect_to correct_url and return if @post.user.username != params[:username]
    else
      redirect_to root_path and return
    end
    post = @post.as_json.merge(tag_list: @post.tag_list)
    related_posts = Post.includes(:user)
                        .where(user_id: @post.user.id)
                        .where.not(id: @post.id)
                        .limit(3)
                        .order(created_at: :desc)
    related_posts_with_user = related_posts.map do |related_post|
      related_post.as_json.merge(user: related_post.user.as_json)
    end
    comments = @post.comments.includes(:user).order(created_at: :desc)
    comments_with_user = comments.map do |comment|
      comment.as_json.merge(user: comment.user.as_json)
    end
    likes_count = @post.post_likers.length
    liked = current_user ? current_user.post_liking?(@post) : false
    render_for_react(
      props: {
        post: post,
        related_posts: related_posts_with_user,
        author: @post.user,
        comments: comments_with_user,
        likes_count: likes_count,
        liked: liked,
      },
    )
  end

  # GET /posts/new
  def new
    render_for_react(prerender: false)
  end

  # GET /@:username/1/edit
  def edit
    redirect_to '/' and return unless logged_in?
    # 他のユーザーの記事編集画面へのアクセスを禁止
    redirect_to '/' and return if current_user.username != params[:username]

    post = @post.as_json.merge(tag_list: @post.tag_list)
    render_for_react(
      props: {
        post: post,
      },
      prerender: false,
    )
  end

  # POST /posts
  def create
    @post = Post.new(post_params)
    @post.uuid = SecureRandom.hex 10

    if @post.save
      render json: @post
    else
      render json: @post.errors.full_messages, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /posts/1
  def update
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /posts/1
  def destroy
    @post.destroy
  end

  private

  def set_post
    @post = Post.find_by(uuid: params[:uuid])
  end

  def post_params
    params.require(:post).permit(:title, :body, :user_id, :tag_list)
  end
end
