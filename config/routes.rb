Rails.application.routes.draw do
  root :to => 'tops#show'

  get 'hello_world' => 'hello_world#index'
  get 'users/new' => 'users#new'
end
