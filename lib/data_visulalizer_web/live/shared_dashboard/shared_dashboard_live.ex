defmodule DataVisulalizerWeb.SharedDashboardLive do
  use DataVisulalizerWeb, :live_view

  alias DataVisulalizer.Accounts

  def mount(_params, session, socket) do
    current_user = Accounts.get_user_by_session_token(session["user_token"])

    socket =
      socket
      |> assign(:current_user, current_user)

    {:ok, socket}
  end
end
