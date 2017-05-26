FactoryGirl.define do
  salt = 'pU_5Yr__gS4m4_BrajJ3'
  password = 'password'

  factory :user do
    email 'test@example.com'
    username 'test_user'
    salt salt
    password password
    password_confirmation password
    crypted_password Sorcery::CryptoProviders::BCrypt.encrypt(password, salt)
  end
end
