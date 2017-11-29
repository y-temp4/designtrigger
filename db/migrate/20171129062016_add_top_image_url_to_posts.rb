class AddTopImageUrlToPosts < ActiveRecord::Migration[5.1]
  def change
    add_column :posts, :top_image_url, :string
  end
end
