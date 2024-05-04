defmodule DataVisulalizerWeb.Utils do
  alias DataVisulalizerWeb.Endpoint

  def notify_plot_update(plot_id, payload) do
    Endpoint.broadcast!("plot:plot-#{plot_id}", "plotUpdated", payload)
  end
end
