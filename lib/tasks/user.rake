namespace :user do
  desc "Reset reset_uploaded_image_size of user to 0 once a month"
  task reset_uploaded_image_size: :environment do
    User.all.each do |u|
      uploaded_image_size_before_reset = u.uploaded_image_size
      u.update(uploaded_image_size: 0)
      logger = Logger.new('log/user-reset_uploaded_image_size.log')
      logger.info "Reset id#{u.id}:#{u.username}'s uploaded_image_size from #{uploaded_image_size_before_reset} to 0"
    end
  end
end
