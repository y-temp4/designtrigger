class User < ApplicationRecord
  authenticates_with_sorcery!

  has_many :posts

  validates :password, length: { minimum: 8 }
  validates :password, presence: true

  validates :email,    presence: true, uniqueness: true
  validates :username, presence: true, uniqueness: true
end
