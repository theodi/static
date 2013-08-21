unless Rails.env.development? or Rails.env.test?
  Rails.application.config.middleware.use ExceptionNotifier,
    :email_prefix => "[#{Rails.application.class.to_s.split('::').first}] ",
    :sender_address => %{"Winston Smith-Churchill" <winston@alphagov.co.uk>},
    :exception_recipients => %w{nope@example.com}
end
