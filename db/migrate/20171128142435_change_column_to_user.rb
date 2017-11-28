class ChangeColumnToUser < ActiveRecord::Migration[5.1]
  def up
    change_column :users, :description, :string, default: ''
    change_column :users, :website_url, :string, default: ''
  end

  def down
    change_column :users, :description, :string
    change_column :users, :website_url, :string
  end
end
