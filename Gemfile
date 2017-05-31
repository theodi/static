source 'https://rubygems.org'

ruby "1.9.3"

gem 'rails', '~> 3.2.22'
gem 'foreman', '< 0.65.0'
gem 'thin'
gem 'dotenv-rails', '~> 1.0' # Fix to 1.x for rails 3
gem 'rack-cache', '< 1.3.0' # Pinning because we're still on 1.9.3 - can unpin once we get on new cookware

gem 'aws-ses', :require => 'aws/ses' # Needed by exception_notification
gem 'exception_notification', '~> 2.6.1'
gem 'lograge', '~> 0.1.0'

gem 'jquery-rails'
gem 'font-awesome-rails'

group :assets do
  gem "therubyracer", "~> 0.12.0"
  gem 'uglifier'
  gem 'sass', '3.4.24'
  gem 'sass-rails', '3.2.5'
end

group :test do
  gem 'capybara', '1.1.0'
  gem 'mocha', '0.13.3', :require => false
  gem 'shoulda', '2.11.3'
end

group :production do
  gem 'airbrake', '~> 4.3.4'
  gem "rails_12factor"
end

gem 'plek', '~> 1.7'
gem 'jasmine', '1.1.2'

gem 'govuk_frontend_toolkit', github: 'alphagov/govuk_frontend_toolkit', tag: 'v0.3.1'
