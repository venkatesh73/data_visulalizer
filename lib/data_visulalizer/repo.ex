defmodule DataVisulalizer.Repo do
  use Ecto.Repo,
    otp_app: :data_visulalizer,
    adapter: Ecto.Adapters.Postgres
end
