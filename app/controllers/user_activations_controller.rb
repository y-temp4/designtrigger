class UserActivationsController < ApplicationController
  def create
    if (@user = User.load_from_activation_token(params[:id]))
      @user.activate!
      auto_login @user
      redirect_to root_path
    else
      not_authenticated
    end
  end
end
