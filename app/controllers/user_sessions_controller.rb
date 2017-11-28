class UserSessionsController < ApplicationController
  def new
    render_for_react
  end

  def create
    if @user = login(params[:login], params[:password])
      render json: @user.id
    else
      render json: 'ログインに失敗しました', status: :unprocessable_entity
    end
  end

  def destroy
    logout
    render json: 'Logged out.'
  end
end
