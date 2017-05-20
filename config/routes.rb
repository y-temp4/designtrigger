Rails.application.routes.draw do

  root :to => 'tops#show'

  get    'hello_world'         => 'hello_world#index'
  get    '@:username'          => 'users#show'
  get    'users/new'           => 'users#new'
  post   'users'               => 'users#create'
  get    'login'               => 'user_sessions#new'
  post   'user_sessions'       => 'user_sessions#create'
  delete 'logout'              => 'user_sessions#destroy'
  get    'posts/new'           => 'posts#new'
  get    'posts'               => 'posts#index'
  post   'posts'               => 'posts#create'
  get    '@:username/:id'      => 'posts#show'
  get    '@:username/:id/edit' => 'posts#edit'
  delete '@:username/:id'      => 'posts#destroy'
  patch  'posts/:id'           => 'posts#update'
end
