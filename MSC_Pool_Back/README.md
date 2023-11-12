## 🔙 Backend - MSC_Pool_Back
The backend of this application, named `MSC_Pool_Back`, is built using Phoenix Elixir 🧪. It provides API endpoints for managing user data and their respective schedules. The authentication is handled securely using `Guardian` 🔒 and `bcrypt`, ensuring that user data remains safe and secure.
### Project and Database Setup Commands
Below are the commands used for setting up the project and creating the various database tables:

```shell
mix phx.new gothime_manager --app gothime_app --module TimeManagerModule --no-html --no-assets --database postgres --no-mailer --no-live --no-dashboard

mix phx.gen.json Account User users username:string email:string:unique is_visible:boolean team_id:references:teams password_hash:string

mix phx.gen.json Account Team teams name:string:unique description:string

mix phx.gen.json Account Membership memberships team_id:references:teams user_id:references:users

mix phx.gen.json Time Clock clocks time:naive_datetime status:boolean user_id:references:users

mix phx.gen.json Time Schedule schedules start_time:naive_datetime end_time:naive_datetime user_id:references:users
```
### Database Tables
Our backend leverages several key tables to manage data efficiently. The structure of these tables is as follows:

#### Users Table
| Code        | Label           | Type           | Constraint   |
|-------------|-----------------|----------------|--------------|
| id          | ID              | INT            | Primary Key  |
| username    | Username        | Varchar(255)   |              |
| email       | Email           | Varchar(180)   | Unique       |
| role        | Role            | Varchar(255)   |              |
| password_hash | Password Hash | Varchar(255)   |              |
| is_visible  | Is Visible      | Boolean        |              |

#### Teams Table
| Code        | Label           | Type           | Constraint   |
|-------------|-----------------|----------------|--------------|
| id          | ID              | INT            | Primary Key  |
| name        | Name            | Varchar(255)   |              |
| description | Description     | Varchar(255)   |              |
| user_id     | User ID         | INT            | Foreign Key  |

#### Memberships Table
| Code        | Label           | Type           | Constraint   |
|-------------|-----------------|----------------|--------------|
| id          | ID              | INT            | Primary Key  |
| user_id     | User ID         | INT            | Foreign Key  |
| team_id     | Team ID         | INT            | Foreign Key  |

#### Clocks Table
| Code        | Label           | Type           | Constraint   |
|-------------|-----------------|----------------|--------------|
| id          | ID              | INT            | Primary Key  |
| time        | Time            | UTC DateTime   |              |
| status      | Status          | Boolean        |              |
| user_id     | User ID         | INT            | Foreign Key  |

#### Schedules Table
| Code        | Label           | Type           | Constraint   |
|-------------|-----------------|----------------|--------------|
| id          | ID              | INT            | Primary Key  |
| start_time  | Start Time      | UTC DateTime   |              |
| end_time    | End Time        | UTC DateTime   |              |
| user_id     | User ID         | INT            | Foreign Key  |

