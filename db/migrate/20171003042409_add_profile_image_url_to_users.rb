class AddProfileImageUrlToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :profile_image_url, :string
  end
end
