source 'https://rubygems.org'
source 'https://BnrJb6FZyzspBboNJzYZ@gem.fury.io/govuk/'

#ruby=ruby-1.9.3
#ruby-gemset=quirkafleeg-static


gem 'rails', '~> 3.2.13'
gem 'foreman', '< 0.65.0'
gem 'thin'
gem 'dotenv-rails'

gem 'aws-ses', :require => 'aws/ses' # Needed by exception_notification
gem 'exception_notification', '~> 2.6.1'
gem 'lograge', '~> 0.1.0'

gem 'jquery-rails'
gem 'font-awesome-rails'

group :router do
  gem 'router-client', '2.0.3', :require => 'router/client'
end

group :assets do
  gem "therubyracer", "~> 0.12.0"
  gem 'uglifier'
  gem 'sass', '3.2.1'
  gem 'sass-rails', '3.2.5'
end

group :test do
  gem 'capybara', '1.1.0'
  gem 'mocha', '0.13.3', :require => false
  gem 'shoulda', '2.11.3'
end

group :production do
  gem 'airbrake'
end

gem 'plek', '~> 1.7'
gem 'jasmine', '1.1.2'

gem 'govuk_frontend_toolkit', '0.31.0'
