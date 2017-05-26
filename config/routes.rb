Rails.application.routes.draw do

  root :to => 'tops#show'

  get    'hello_world'           => 'hello_world#index'
  get    '@:username'            => 'users#show'
  get    'users/new'             => 'users#new'
  post   'users'                 => 'users#create'
  get    'login'                 => 'user_sessions#new'
  post   'user_sessions'         => 'user_sessions#create'
  delete 'logout'                => 'user_sessions#destroy'
  get    'posts/new'             => 'posts#new'
  get    'posts'                 => 'posts#index'
  post   'posts'                 => 'posts#create'
  get    '@:username/:uuid'      => 'posts#show'
  get    '@:username/:uuid/edit' => 'posts#edit'
  delete '@:username/:uuid'      => 'posts#destroy'
  patch  'posts/:uuid'           => 'posts#update'
  get    'settings/account'      => 'settings_accounts#show'
  patch  'settings/account'      => 'settings_accounts#update'
  get    'settings/password'     => 'settings_passwords#show'
  patch  'settings/password'     => 'settings_passwords#update'
  get    'settings/profile'      => 'settings_profiles#show'
  patch  'settings/profile'      => 'settings_profiles#update'

end
