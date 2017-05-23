class SettingsPasswordsController < ApplicationController
  def show
    unless current_user
      redirect_to '/'
      return
    end
    render_for_react
  end

  def update
    user = current_user
    user.password = params[:user][:password]
    user.password_confirmation = params[:user][:password_confirmation]
    if user.valid?
      user.save
    else
      render json: user.errors.full_messages, status: :unprocessable_entity
    end
  end
end
