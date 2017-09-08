class CreatePostLikes < ActiveRecord::Migration[5.1]
  def change
    create_table :post_likes do |t|
      t.integer :user_id
      t.integer :target_post_id

      t.timestamps
    end
  end
end
