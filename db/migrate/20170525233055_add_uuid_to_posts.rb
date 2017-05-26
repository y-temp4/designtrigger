class AddUuidToPosts < ActiveRecord::Migration[5.1]
  def change
    add_column :posts, :uuid, :string, :null => false, :default => 0
  end
end
