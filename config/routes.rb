Rails.application.routes.draw do



  root :to => 'tops#show'

  get    'hello_world'   => 'hello_world#index'
  get    'users/new'     => 'users#new'
  post   'users'         => 'users#create'
  get    'login'         => 'user_sessions#new'
  post   'user_sessions' => 'user_sessions#create'
  delete 'user_sessions' => 'user_sessions#destroy'
end
