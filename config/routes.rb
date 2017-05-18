Rails.application.routes.draw do
  resources :users
  get 'hello_world' => 'hello_world#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get 'users/new' => 'users#new'
end
