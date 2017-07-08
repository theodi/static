source 'https://rubygems.org'

ruby "1.9.3"

gem 'rails', '~> 3.2.22'
gem 'foreman', '< 0.84.0'
gem 'thin'
gem 'dotenv-rails', '~> 2.2' # Fix to 1.x for rails 3
gem 'rack-cache', '< 1.7.0' # Pinning because we're still on 1.9.3 - can unpin once we get on new cookware

gem 'lograge', '~> 0.3.6'

gem 'jquery-rails'
gem 'font-awesome-rails'

group :assets do
  gem "therubyracer", "~> 0.12.3"
  gem 'uglifier'
  gem 'sass', '3.4.25'
  gem 'sass-rails', '3.2.6'
end

group :test do
  gem 'capybara', '2.14.4'
  gem 'mocha', '1.2.1', :require => false
  gem 'shoulda', '3.5.0'
end

group :production do
  gem 'airbrake', '~> 4.3.4'
  gem "rails_12factor"
end

gem 'plek', '~> 2.0'
gem 'jasmine', '1.1.2'

gem 'govuk_frontend_toolkit', github: 'alphagov/govuk_frontend_toolkit', tag: 'v0.3.1'
