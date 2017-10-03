class SettingsAccountsController < ApplicationController
  require 'aws-sdk-s3'
  require 'base64'

  def show
    redirect_to '/' and return unless current_user
    render_for_react
  end

  def update
    @user = current_user

    image = user_params[:profile_image_url]

    if image
      image_new_name = "#{SecureRandom.hex(10)}.jpg"
      bucket = Aws::S3::Resource.new.bucket('designtrigger-image')
      bucket.object(image_new_name).put(body: Base64.decode64(image))
      profile_image_url = "https://designtrigger-image.s3.amazonaws.com/#{image_new_name}"
    end

    if @user.update(user_params)
      @user.update(profile_image_url: profile_image_url) if image
      render json: @user
    else
      render json: @user.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :profile_image_url)
  end
end
