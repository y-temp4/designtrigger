class ImagesController < ApplicationController
  require 'aws-sdk-s3'

  def create
    user = current_user
    image = params['image']
    image_size = params['image_size'].to_i
    image_original_filename = image.original_filename
    image_extension = image_original_filename.match(/(.+)(\.[^.]+$)/)[2]
    image_new_name = "#{SecureRandom.hex(10)}#{image_extension}"
    image_path = image.tempfile.path

    bucket = Aws::S3::Resource.new.bucket('designtrigger-image')
    bucket.object(image_new_name).put(body: File.open(image_path))

    user.update(uploaded_image_size: user.uploaded_image_size + image_size)

    render json: { image_path: image_path,
                   image_new_name: image_new_name,
                   image_original_filename: image_original_filename, }
  end
end
