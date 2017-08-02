class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  private

  def action_path
    "#{controller_path}##{action_name}"
  end

  def common_props
    {
      actionPath: action_path,
      currentUser: current_user,
      baseUrl: request.base_url,
      fullPath: request.fullpath,
    }
  end

  def render_for_react(props: {}, status: 200, prerender: true)
    if request.xhr?
      response.headers["Cache-Control"] = "no-cache, no-store"
      response.headers["Expires"] = "Fri, 01 Jan 1990 00:00:00 GMT"
      response.headers["Pragma"] = "no-cache"
      render(
        json: common_props.merge(props),
        status: status,
      )
    else
      render(
        html: view_context.react_component(
          "Router",
          prerender: prerender,
          props: common_props.merge(props).as_json,
        ),
        layout: true,
        status: status,
      )
    end
  end
end
