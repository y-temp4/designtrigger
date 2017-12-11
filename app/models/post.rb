require 'matrix'

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

  def self.recommended_posts(post)
    vec_data = File.read("#{Rails.root.to_s}/data/vec.dat")
    vectors = Marshal.load vec_data
    id_selected = post.id
    vec_data_selected = nil
    vectors.each do |data|
      vec_data_selected = Vector.elements(data[:vec]) if data[:id] == id_selected
    end
    # もしvectorsがnilのままだったらレコメンドしない（最近の記事を表示するなど）
    return Post.related_posts(post) unless vec_data_selected
    max_score = Array.new(4, score: 0, id: 0)
    vectors.each do |data|
      score = vec_data_selected.inner_product(Vector.elements(data[:vec]))
                               .fdiv(
                                 vec_data_selected.norm * Vector.elements(data[:vec]).norm
                               )
      max_score.sort! { |a, b| a[:score] <=> b[:score] }
      if max_score[0][:score] < score
        max_score.shift
        max_score.push(score: score, id: data[:id])
      end
    end
    recommended_post_ids = []
    max_score.each do |score|
      recommended_post_ids << score[:id] if score[:id] != id_selected
    end
    recommended_posts = Post.where(id: recommended_post_ids)
    if recommended_posts.empty?
      Post.related_posts(post)
    else
      recommended_posts
    end
  end

  def self.related_posts(post)
    Post.includes(:user)
        .where(user_id: post.user.id)
        .where.not(id: post.id)
        .limit(3)
        .order(created_at: :desc)
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
