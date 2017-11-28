Rails.application.routes.draw do

  root :to => 'tops#show'

  get    '@:username'                    => 'users#show'
  get    'users/new'                     => 'users#new'
  post   'users'                         => 'users#create'
  get    'login'                         => 'user_sessions#new'
  post   'user_sessions'                 => 'user_sessions#create'
  delete 'logout'                        => 'user_sessions#destroy'
  get    'posts/new'                     => 'posts#new'
  get    'posts'                         => 'posts#index'
  post   'posts'                         => 'posts#create'
  get    '@:username/posts/:uuid'        => 'posts#show'
  get    '@:username/posts/:uuid/edit'   => 'posts#edit'
  delete '@:username/posts/:uuid'        => 'posts#destroy'
  patch  'posts/:uuid'                   => 'posts#update'
  get    'settings/account'              => 'settings_accounts#show'
  patch  'settings/account'              => 'settings_accounts#update'
  get    'settings/account/custom_image' => 'settings_accounts_custom_images#show'
  patch  'settings/account/custom_image' => 'settings_accounts_custom_images#update'
  get    'settings/password'             => 'settings_passwords#show'
  patch  'settings/password'             => 'settings_passwords#update'
  get    'settings/profile'              => 'settings_profiles#show'
  patch  'settings/profile'              => 'settings_profiles#update'
  post   'follow'                        => 'follows#create'
  delete 'unfollow'                      => 'follows#destroy'
  get    '@:username/followees'          => 'user_followees#index'
  get    '@:username/followers'          => 'user_followers#index'
  post   'comments'                      => 'comments#create'
  delete 'comments/:id'                  => 'comments#destroy'
  get    '@:username/comments'           => 'user_comments#index'
  post   'posts/:uuid/like'              => 'post_likes#create'
  delete 'posts/:uuid/unlike'            => 'post_likes#destroy'
  post   'upload'                        => 'images#create'
  get    'search'                        => 'post_search_results#show'
  get    '@:username/likes'              => 'user_likes#index'
  get    'tags'                          => 'tags#index'
  get    'tags/:tag'                     => 'tags#show'
  get    'terms'                         => 'terms#show'
  get    'privacy'                       => 'privacy#show'
  get    'users/:id/activate'            => 'user_activations#create'
end
