class HelloWorldController < ApplicationController
  def index
    render_for_react(
      props: {
        name: "Stranger",
      },
    )
  end
end
