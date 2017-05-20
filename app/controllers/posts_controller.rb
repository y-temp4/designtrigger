class PostsController < ApplicationController
  before_action :set_post, only: [:show, :edit, :update, :destroy]

  # GET /posts
  def index
    posts_with_username = Post.includes(:user).order(created_at: :desc).map do |post|
      post_with_username = post.attributes
      post_with_username[:username] = post.user.username
      post_with_username
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
      redirect_to "/@#{@post.user.username}/#{@post.id}"
      return
    end
    render_for_react(
      props: {
        post: @post,
        author: params[:username],
      }
    )
  end

  # GET /posts/new
  def new
    render_for_react
  end

  # GET /@:username/1/edit
  def edit
    # 他のユーザーの記事編集画面へのアクセスを禁止
    if current_user.username != params[:username]
      redirect_to '/'
      return
    end
    render_for_react(
      props: {
        post: @post,
      }
    )
  end

  # POST /posts
  def create
    @post = Post.new(post_params)

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
      @post = Post.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def post_params
      params.require(:post).permit(:title, :body, :user_id)
    end
end
