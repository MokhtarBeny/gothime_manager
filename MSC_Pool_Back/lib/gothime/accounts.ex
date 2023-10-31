defmodule TimeManager.Accounts do
  @moduledoc """
  The Accounts context.
  """

  import Ecto.Query, warn: false
  alias TimeManager.Repo

  alias TimeManager.Accounts.Team

  @doc """
  Returns the list of teams.

  ## Examples

  		iex> list_teams()
  		[%Team{}, ...]

  """
  def list_teams do
    Repo.all(Team)
  end

  @doc """
  Gets a single team.

  Raises `Ecto.NoResultsError` if the Team does not exist.

  ## Examples

  		iex> get_team!(123)
  		%Team{}

  		iex> get_team!(456)
  		** (Ecto.NoResultsError)

  """
  def get_team!(id), do: Repo.get!(Team, id)

  @doc """
  Creates a team.

  ## Examples

  		iex> create_team(%{field: value})
  		{:ok, %Team{}}

  		iex> create_team(%{field: bad_value})
  		{:error, %Ecto.Changeset{}}

  """
  def create_team(attrs \\ %{}) do
    %Team{}
    |> Team.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a team.

  ## Examples

  		iex> update_team(team, %{field: new_value})
  		{:ok, %Team{}}

  		iex> update_team(team, %{field: bad_value})
  		{:error, %Ecto.Changeset{}}

  """
  def update_team(%Team{} = team, attrs) do
    team
    |> Team.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a team.

  ## Examples

  		iex> delete_team(team)
  		{:ok, %Team{}}

  		iex> delete_team(team)
  		{:error, %Ecto.Changeset{}}

  """
  def delete_team(%Team{} = team) do
    Repo.delete(team)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking team changes.

  ## Examples

  		iex> change_team(team)
  		%Ecto.Changeset{data: %Team{}}

  """
  def change_team(%Team{} = team, attrs \\ %{}) do
    Team.changeset(team, attrs)
  end

  alias TimeManager.Accounts.User

  @doc """
  Returns the list of users.

  ## Examples

  		iex> list_users()
  		[%User{}, ...]

  """
  def list_users do
    Repo.all(User)
  end

  @doc """
  Gets a single user.

  Raises `Ecto.NoResultsError` if the User does not exist.

  ## Examples

  		iex> get_user!(123)
  		%User{}

  		iex> get_user!(456)
  		** (Ecto.NoResultsError)

  """
  def get_user!(id), do: Repo.get!(User, id)

  @doc """
  Creates a user.

  ## Examples

  		iex> create_user(%{field: value})
  		{:ok, %User{}}

  		iex> create_user(%{field: bad_value})
  		{:error, %Ecto.Changeset{}}

  """
  def create_user(attrs \\ %{}) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a user.

  ## Examples

  		iex> update_user(user, %{field: new_value})
  		{:ok, %User{}}

  		iex> update_user(user, %{field: bad_value})
  		{:error, %Ecto.Changeset{}}

  """
  def update_user(%User{} = user, attrs) do
    user
    |> User.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a user.

  ## Examples

  		iex> delete_user(user)
  		{:ok, %User{}}

  		iex> delete_user(user)
  		{:error, %Ecto.Changeset{}}

  """
  def delete_user(%User{} = user) do
    Repo.delete(user)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking user changes.

  ## Examples

  		iex> change_user(user)
  		%Ecto.Changeset{data: %User{}}

  """
  def change_user(%User{} = user, attrs \\ %{}) do
    User.changeset(user, attrs)
  end

  # CUSTOM
  def get_user_by_email_and_username(email, username) do
    query =
      from(u in User,
        where: u.email == ^email and u.username == ^username
      )

    case Repo.all(query) do
      [] -> {:error, "No User found with this email and username"}
      users -> {:ok, users}
    end
  end

  def mark_as_visible(user) do
    user
    |> User.changeset(%{is_visible: true})
    |> Repo.update()
  end
end
