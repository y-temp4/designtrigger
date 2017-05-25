source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

ruby '2.4.1'

gem 'rails', '~> 5.1.0'

gem 'mini_racer', platforms: :ruby
gem 'pg', '~> 0.18'
gem 'puma', '~> 3.7'
gem 'react_on_rails', '~> 7'
gem 'sorcery'
gem 'uglifier', '>= 1.3.0'

group :development do
  gem 'better_errors'
  gem 'binding_of_caller'
  gem 'bullet'
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'rubocop', require: false
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'pry-rails'
end

group :production do
  gem 'heroku-deflater'
  gem 'rails_12factor'
end
