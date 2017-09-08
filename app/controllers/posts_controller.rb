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
    # ユーザー名が違うURLにアクセス時に正しいURLへ移動
    if @post.user.username != params[:username]
      redirect_to "/@#{@post.user.username}/posts/#{@post.uuid}"
      return
    end
    post = @post.as_json.merge(tag_list: @post.tag_list)
    comments = @post.comments.includes(:user).order(created_at: :desc)
    comments_with_user = comments.map do |comment|
      comment.as_json.merge(user: comment.user.as_json)
    end
    likes_count = @post.post_likers.length
    liked = current_user ? current_user.post_liking?(@post) : false
    render_for_react(
      props: {
        post: post,
        author: params[:username],
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
    unless logged_in?
      redirect_to '/'
      return
    end
    # 他のユーザーの記事編集画面へのアクセスを禁止
    if current_user.username != params[:username]
      redirect_to '/'
      return
    end
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
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find_by(uuid: params[:uuid])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def post_params
      params.require(:post).permit(:title, :body, :user_id, :tag_list)
    end
end
