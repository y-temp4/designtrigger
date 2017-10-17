class SettingsAccountsCustomImagesController < ApplicationController
  require 'aws-sdk-s3'

  def show
    redirect_to '/' and return unless current_user
    render_for_react
  end

  def update
    @user = current_user

    image = params['image']
    image_size = params['image_size'].to_i
    image_new_name = "#{SecureRandom.hex(10)}.jpg"
    image_path = image.tempfile.path

    bucket = Aws::S3::Resource.new.bucket('designtrigger-image')
    bucket.object(image_new_name).put(body: File.open(image_path))
    profile_image_url = "https://designtrigger-image.s3.amazonaws.com/#{image_new_name}"

    if @user.update(profile_image_url: profile_image_url,
                    uploaded_image_size: @user.uploaded_image_size + image_size)
      render json: @user
    else
      render json: @user.errors.full_messages, status: :unprocessable_entity
    end
  end
end
