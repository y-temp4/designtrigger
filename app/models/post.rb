class Post < ApplicationRecord
  belongs_to :user

  validates :title, presence: true
  validates :body, presence: true
  validates :user_id, presence: true
  validates :uuid, presence: true, uniqueness: true

  def to_param
    uuid
  end
end
