require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  describe 'GET #show' do
    it "assigns the requested user to @user" do
      user = create(:user)
      get :show, params: { username: user.username }
      expect(assigns(:user)).to eq user
    end
  end

  describe 'POST #create' do
    it "saves the new user in the database" do
      expect do
        post :create, params: { user: attributes_for(:user) }
      end.to change(User, :count).by(1)
    end
  end
end
