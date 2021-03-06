class User < ApplicationRecord
  include Resonatable

  authenticates_with_sorcery!

  has_many :posts
  has_many :comments

  validates :password, confirmation: true, length: { minimum: 8 },
                       if: -> { new_record? || changes[:crypted_password] }
  validates :password_confirmation, presence: true,
                                    if: -> { new_record? || changes[:crypted_password] }

  validates :email,    presence: true, uniqueness: true
  validates :username, presence: true, uniqueness: true,
                       format: { with: /\A[a-z0-9_]+\z/i },
                       length: { maximum: 15 }
  validates :description, length: { maximum: 100 }
  validates :uploaded_image_size, numericality: { less_than_or_equal_to: 10_000_000 }

  def as_json(opts = {})
    opts[:except] ||= [
      :crypted_password,
      :salt,
      :created_at,
      :updated_at,
    ]
    super(opts)
  end
end
