module ApplicationHelper

  def menus
    $menus ||= YAML.load_file("#{Rails.root.to_s}/config/menus.yml")
  end
  
end
