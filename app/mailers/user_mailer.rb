class UserMailer < ApplicationMailer
  def activation_needed_email(user)
    host = get_host
    @url = "#{host}/users/#{user.activation_token}/activate"
    mail(to: user.email,
         subject: "Welcome to My Awesome Site")
  end

  def activation_success_email(user)
    host = get_host
    @url = "#{host}/login"
    mail(to: user.email,
         subject: "Your account is now activated")
  end

  private

  def get_host
    Rails.env.development? ? 'http://localhost:3000' : 'http://designtrigger.herokuapp.com'
  end
end
