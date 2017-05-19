Rails.application.routes.draw do
  # resources :posts
  root :to => 'tops#show'

  get    'hello_world'    => 'hello_world#index'
  get    'users/new'      => 'users#new'
  post   'users'          => 'users#create'
  get    'login'          => 'user_sessions#new'
  post   'user_sessions'  => 'user_sessions#create'
  delete 'logout'         => 'user_sessions#destroy'
  get    'posts/new'      => 'posts#new'
  post   'posts'          => 'posts#create'
  get    '@:username/:id' => 'posts#show'
end
