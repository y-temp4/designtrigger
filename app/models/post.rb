class Post < ApplicationRecord
  include Resonatable

  acts_as_ordered_taggable

  belongs_to :user
  has_many :comments

  validates :title, presence: true
  validates :body, presence: true
  validates :user_id, presence: true
  validates :uuid, presence: true, uniqueness: true

  def to_param
    uuid
  end
end
