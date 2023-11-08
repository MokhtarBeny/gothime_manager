defmodule TimeManagerModuleWeb.UserController do
  use TimeManagerModuleWeb, :controller

  alias TimeManagerModule.Account
  alias TimeManagerModule.Account.User

  action_fallback TimeManagerModuleWeb.FallbackController

  def index(conn, _params) do
    users = Account.list_users()
    render(conn, :index, users: users)
  end

  def create(conn, %{"user" => user_params}) do
    with {:ok, %User{} = user} <- Account.create_user(user_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", ~p"/api/users/#{user}")
      |> render(:show, user: user)
    end
  end

  def show(conn, %{"id" => id}) do
    user = Account.get_user!(id)
    render(conn, :show, user: user)
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    user = Account.get_user!(id)

    with {:ok, %User{} = user} <- Account.update_user(user, user_params) do
      render(conn, :show, user: user)
    end
  end

  def delete(conn, %{"id" => id}) do
    user = Account.get_user!(id)

    with {:ok, %User{}} <- Account.delete_user(user) do
      send_resp(conn, :no_content, "")
    end
  end
  def showByEmailAndUsername(conn, %{"username" => username, "email" => email}) do
    case Account.get_user_by_email_and_username(email, username) do
      {:ok, users} ->
        render(conn, :index, users: users)
      {:error, reason} ->
        json(conn, %{error: reason})
    end
  end
  def register(conn, %{"user" => user_params}) do
    with {:ok, user} <-  Account.create_user(user_params) do
      conn
      |> put_status(:created)
      |> text("User Successfully registered with email:" <> " " <> user.email)

    end
  end
end
