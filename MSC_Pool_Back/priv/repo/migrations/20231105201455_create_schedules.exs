defmodule TimeManagerModule.Repo.Migrations.CreateSchedules do
  use Ecto.Migration

  def change do
    create table(:schedules) do
      add :start_time, :utc_datetime
      add :end_time, :utc_datetime
      add :user_id, references(:users, on_delete: :nothing)

      timestamps(type: :utc_datetime)
    end

    create index(:schedules, [:user_id])
  end
end
