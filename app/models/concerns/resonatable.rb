module Resonatable
  include Resonance

  resonate :user, target: :user, action: :follow
  resonate :user, target: :post, action: :post_like
end
