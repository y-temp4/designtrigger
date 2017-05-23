class SettingsAccountsController < ApplicationController
  def show
    unless current_user
      redirect_to '/'
      return
    end
    render_for_react
  end

  def update
    @user = current_user
    # binding.pry
    # @user[:password] = current_user.password
    if @user.update(user_params)
    else
      render json: @user.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email)
  end
end
