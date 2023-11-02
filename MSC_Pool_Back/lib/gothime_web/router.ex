defmodule TimeManagerWeb.Router do
  use TimeManagerWeb, :router

  pipeline :api do
    plug(:accepts, ["json"])
    plug(CORSPlug, origin: ["http://localhost:3000/", "http://localhost:3000/users", "http://localhost:3000/calendar"])
  end

  scope "/api", TimeManagerWeb do
    pipe_through(:api)

    get("/users", UserController, :showByEmailAndUsername)
    get("/users/all", UserController, :index)
    resources("/users", UserController, except: [:new])

    resources("/teams/", TeamController)

    post("/clocks/:user_id", ClockController, :create_with_user)
    get("/clocks", ClockController, :get_clocks_by_userid)
    # resources "/clocks/", ClockController, except: [:new, :edit]

    get("/schedules/:user_id", ScheduleController, :get_schedules_by_user_and_date_range)
    get("/schedules/:user_id/:id", ScheduleController, :get_schedule_by_userid_and_id)
    post("shcedules/", ScheduleController, :create )
    resources("/schedules/", ScheduleController, except: [:new, :edit])
  end
end
