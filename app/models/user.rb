class User < ApplicationRecord
  authenticates_with_sorcery!

  has_many :posts

  validates :password, presence: true, length: { minimum: 8 }, if: :new_user?

  validates :email,    presence: true, uniqueness: true
  validates :username, presence: true, uniqueness: true, format: { with: /\A[a-z0-9]+\z/i }

  private

  def new_user?
    new_record?
  end
end
