class Post < ApplicationRecord
  include Resonatable

  acts_as_ordered_taggable

  belongs_to :user
  has_many :comments, dependent: :destroy

  validates :title, presence: true
  validates :body, presence: true
  validates :user_id, presence: true
  validates :uuid, presence: true, uniqueness: true

  validate :tag_list_inclusion

  def self.with_user
    includes(:user).map do |post|
      post.as_json.merge(user: post.user.as_json)
    end
  end

  def to_param
    uuid
  end

  def tag_list_inclusion
    tag_list.each do |tag|
      errors.add(tag, ' スラッシュはタグに含められません') if tag.include?('/')
    end
  end
end
