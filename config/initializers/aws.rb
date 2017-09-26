# Aws.config.update(Rails.application.config_for(:aws).symbolize_keys)
require 'aws-sdk-s3'

Aws.config.update({
  credentials: Aws::Credentials.new(ENV["AWS_ACCESS_KEY_ID"], ENV["AWS_SECRET_ACCESS_KEY"]),
  region: 'ap-northeast-1'
})
