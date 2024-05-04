defmodule DataVisulalizerWeb.DashboardLive do
  use DataVisulalizerWeb, :live_view

  alias DataVisulalizerWeb.Utils

  def mount(_params, _session, socket) do
    {:ok, socket}
  end

  def handle_params(_params, _uri, %{assigns: %{live_action: :create}} = socket) do
    {:noreply, socket}
  end

  def handle_params(_params, _uri, %{assigns: %{live_action: :update}} = socket) do
    {:noreply, socket}
  end

  def handle_params(_params, _uri, %{assigns: %{live_action: :view}} = socket) do
    {:noreply, socket}
  end

  def handle_params(_params, _uri, socket) do
    {:noreply, socket}
  end

  def handle_event("updatePlot", _params, socket) do
    notify_changes(1, %{
      data: [
        %{
          id: 1,
          x: ["Zebras", "Lions", "Pelicans"],
          y: [90, 40, 60],
          type: "bar",
          name: "New York Zoo"
        }
      ]
    })

    {:noreply, socket}
  end

  def notify_changes(plot_id, payload) do
    Utils.notify_plot_update(plot_id, payload)
  end
end
