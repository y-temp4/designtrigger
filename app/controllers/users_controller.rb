class UsersController < ApplicationController
  before_action :set_user, only: [:edit, :update, :destroy]

  # GET /users
  # GET /users.json
  def index
    @users = User.all
  end

  # GET /@:username
  def show
    @user = User.find_by(username: params[:username])
    is_following = current_user ? current_user.following?(@user) : false
    following_count = @user.following.length
    follower_count = @user.followers.length

    render_for_react(
      props: {
        user: @user,
        posts: Post.where(user_id: @user.id).order(created_at: :desc),
        is_following: is_following,
        following_count: following_count,
        follower_count: follower_count,
      }
    )
  end

  # GET /users/new
  def new
    render_for_react
  end

  # GET /users/1/edit
  def edit
  end

  # POST /users
  def create
    user = User.new(user_params)

    if user.save
      render json: user.id
    else
      render json: user.errors.full_messages, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  def update
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to @user, notice: 'User was successfully updated.' }
        format.json { render :show, status: :ok, location: @user }
      else
        format.html { render :edit }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user.destroy
    respond_to do |format|
      format.html { redirect_to users_url, notice: 'User was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation)
  end
end
