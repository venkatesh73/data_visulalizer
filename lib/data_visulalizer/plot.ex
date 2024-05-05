defmodule DataVisulalizer.Plot do
  use Ecto.Schema

  alias DataVisulalizer.Accounts.User

  schema "plots" do
    field :name, :string
    field :dataset_name, :string
    field :expression, :string
    field :raw_payload, :map
    field :data_payload, :map

    belongs_to :users, User

    timestamps()
  end
end
