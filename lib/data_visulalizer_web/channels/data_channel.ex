defmodule DataVisulalizerWeb.DataChannel do
  use Phoenix.Channel

  def join("plot:" <> plot_id, message, socket) do
    IO.inspect(plot_id)
    IO.inspect(message)
    {:ok, socket}
  end
end
