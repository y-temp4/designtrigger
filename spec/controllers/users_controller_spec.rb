require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  describe 'GET #show' do
    it "assigns the requested user to @user" do
      user = create(:user)
      get :show, params: { username: user.username }
      # expect(assigns(:user)).to eq user
    end
  end

  describe 'POST #create' do
    it "saves the new user in the database" do
      expect do
        post :create, params: { user: attributes_for(:user) }
      end.to change(User, :count).by(1)
    end

    it "cannnot create user with already existing username" do
      create(:user, username: 'test', email: 'test1@example.com')
      user = build(:user, username: 'test', email: 'test2@example.com')
      expect(user).not_to be_valid
    end

    it "cannnot create user with already existing email" do
      create(:user, username: 'test1', email: 'test@example.com')
      user = build(:user, username: 'test2', email: 'test@example.com')
      expect(user).not_to be_valid
    end

    it "cannnot create user too short password (should over 9 chars)" do
      user = build(:user, password: 'short', password_confirmation: 'short')
      expect(user).not_to be_valid
    end

    it "cannnot create user with symbol" do
      user = build(:user, username: '.test')
      expect(user).not_to be_valid
    end
  end
end
