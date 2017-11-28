require 'rails_helper'

RSpec.describe UserSessionsController, type: :controller do
  describe 'POST #create' do
    it "login as new session" do
      # user = create(:user)
      # post :create, params: { email: user.email, password: 'password' }
      # expect(response).to be_success
      # expect(response.body).to eq user.id.to_s
    end

    it "cannot login" do
      user = create(:user)
      post :create, params: { email: user.email, password: 'wrong_password' }
      expect(response.status).to eq 422
      expect(response.body).to eq 'ログインに失敗しました'
    end
  end
end
