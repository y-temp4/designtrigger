class User < ApplicationRecord
  authenticates_with_sorcery!

  has_many :posts

  validates :password, confirmation: true, length: { minimum: 8 },
                       if: -> { new_record? || changes[:crypted_password] }
  validates :password_confirmation, presence: true,
                                    if: -> { new_record? || changes[:crypted_password] }

  validates :email,    presence: true, uniqueness: true
  validates :username, presence: true, uniqueness: true,
                       format: { with: /\A[a-z0-9_]+\z/i }
end
