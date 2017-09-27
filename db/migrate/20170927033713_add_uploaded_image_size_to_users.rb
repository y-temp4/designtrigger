class AddUploadedImageSizeToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :uploaded_image_size, :integer, default: 0
  end
end
