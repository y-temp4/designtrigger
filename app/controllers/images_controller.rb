class ImagesController < ApplicationController
  require 'aws-sdk-s3'

  def create
    image = params['image']
    # image_original_filename = image.original_filename
    # image_extension = image_original_filename.match(/(.+)(\.[^.]+$)/)[2]
    # image_new_name = "#{SecureRandom.hex(10)}#{image_extension}"
    # image_path = image.tempfile.path
    #
    # bucket = Aws::S3::Resource.new.bucket('designtrigger-image')
    # bucket.object(image_new_name).put(body: File.open(image_path))
    #
    # render json: { image_path: image_path,
    #                image_new_name: image_new_name,
    #                image_original_filename: image_original_filename, }
    render json: image.tempfile.path.to_s
  end
end
