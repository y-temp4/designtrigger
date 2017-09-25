class SettingsProfilesController < ApplicationController
  def show
    redirect_to '/' and return unless current_user
    render_for_react
  end

  def update
    @user = current_user
    if @user.update(user_params)
    else
      render json: @user.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:description, :website_url)
  end
end
