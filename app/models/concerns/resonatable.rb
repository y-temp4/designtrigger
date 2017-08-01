module Resonatable
  include Resonance

  resonate :user, target: :user, action: :follow
end
