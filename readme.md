# 🌃 Gotham City Time Manager
![Elixir Badge](https://img.shields.io/badge/Elixir-4B275F?style=for-the-badge&logo=elixir&logoColor=white)
![Vue.js Badge](https://img.shields.io/badge/Vue%20js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)
![Vuetify Badge](https://img.shields.io/badge/Vuetify-1867C0?style=for-the-badge&logo=vuetify&logoColor=white)
![Axios Badge](https://img.shields.io/badge/Axios-671DDF?style=for-the-badge&logo=axios&logoColor=white)
![Phoenix Badge](https://img.shields.io/badge/Phoenix-F8502B?style=for-the-badge&logo=phoenix&logoColor=white)
![JavaScript Badge](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Docker Badge](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Git Badge](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub Actions Badge](https://img.shields.io/badge/GitHub%20Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)
![PostgreSQL Badge](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Travis CI Badge](https://img.shields.io/badge/Travis%20CI-3EAAAF?style=for-the-badge&logo=travisci&logoColor=white)
![Vite Badge](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=white)
![Android Studio Badge](https://img.shields.io/badge/Android%20Studio-3DDC84?style=for-the-badge&logo=androidstudio&logoColor=white)
![Capacitor Badge](https://img.shields.io/badge/Capacitor-3880FF?style=for-the-badge&logo=capacitor&logoColor=white)


## 📌 Overview
This project is a time manager specifically designed for Gotham City. It helps in tracking the working hours and schedules of each user. The application is divided into two main parts: the backend and the frontend.

## 🔙 Backend - MSC_Pool_Back
The backend of this application, named `MSC_Pool_Back`, is built using Phoenix Elixir 🧪. It provides robust API endpoints for managing user data and their respective schedules. The authentication is handled securely using `Guardian` 🔒 and `bcrypt`, ensuring that user data remains safe and secure.
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



## 🔝 Frontend - MSC_Pool_Front
The frontend, named `MSC_Pool_Front`, is developed using Vue.js 🖼️ and Vuetify. Vue Router is integrated to manage the routing, making it an ideal choice for developing Single Page Applications (SPA). This SPA approach allows for a seamless user experience with minimal page reloads, as different views are dynamically rendered within the same page. Network requests are managed through `axios`, ensuring smooth communication with the backend 🔄.

### Interface Screenshots
Below are screenshots showcasing various aspects of our application's interface:

1. **Login Screen**
   ![Login Screen](https://zupimages.net/up/23/45/fia7.png)

2. **Profile and Clock In/Out**
   ![Profile and Clock In/Out](https://zupimages.net/up/23/45/ttxb.png)

3. **Calendar and Schedules**
   ![Calendar and Schedules](https://zupimages.net/up/23/45/ukd6.png)

4. **Manage Users**
   ![Manage Users](https://zupimages.net/up/23/45/d4q6.png)

5. **Manage Teams**
   ![Manage Teams](https://zupimages.net/up/23/45/jpmf.png)

6. **Manage My Team**
   ![Manage My Team](https://zupimages.net/up/23/45/lrv2.png)

## 🛠️ DevOps
### ⚙️ GitHub Actions
GitHub Actions are integral to the continuous integration and deployment pipeline of our project. They automate the process of building and pushing Docker images to Docker Hub. This ensures that the latest build of our application is readily available for deployment. The workflow is set up to trigger on pushes or pull requests, allowing for consistent and up-to-date Docker images with every code update.

### 🐳 Docker Images
Find the Docker images for this project on Docker Hub: [Docker Hub Link](https://hub.docker.com/r/lamamb/gothime_manager)

### 🌍 Hosting and Repository
- **Git Repository**: [GitHub Link](https://github.com/MokhtarBeny/gothime_manager)

## 💡 Design Thinking
Our approach to developing the Gotham City Time Manager is deeply rooted in design thinking, focusing on user recommendations and feedback. We actively listen to our users and implement features based on their needs and suggestions. This user-centric approach has led to several impactful enhancements in our application.

#### Team Dashboard
One significant addition, inspired by manager feedback, is the Team Dashboard. It allows managers to effectively oversee and manage their teams. This feature includes tools for scheduling, monitoring work hours, and managing team tasks, all designed to streamline the managerial process.

#### User-Friendly Shortcuts
Understanding that some of our users may face challenges in using computers, we've introduced easy-to-use shortcuts. These shortcuts enable users to clock in and out effortlessly, simplifying their daily interactions with the application. This feature is part of our commitment to making the Gotham City Time Manager accessible and user-friendly for everyone.

This iterative and responsive approach ensures that our application not only meets but exceeds the expectations and needs of our users, continuously evolving based on their valuable input.

## 🔐 Authentication and User Roles
Our application implements a robust authentication system that caters to four distinct user roles: Admin, General Manager (SManager), Manager, and User. Each role is designed with specific permissions and access levels to ensure efficient and secure operation.

### User Roles
- **Admin**: Has the highest level of access, with the ability to perform any action and inspect all aspects of the application.
- **General Manager (SManager)**: Assists the Admin by monitoring teams and users. They have extensive, but not complete, access to functionalities available to the Admin.
- **Manager**: Focused on team management. Managers can oversee their team's schedules, tasks, and performance.
- **User**: Primarily interacts with clock-in and clock-out functionalities, managing their own work hours.

### Security with Guardian and Bcrypt
#### Guardian
We use `Guardian` for secure API authentication. It ensures that all requests and transactions are performed by authenticated users, thus maintaining the integrity and confidentiality of our data.

#### Bcrypt
`Bcrypt` is employed for hashing user passwords. By using this robust hashing algorithm, we provide an additional layer of security, protecting user information from potential breaches.

### Vue Protected Routes
In our frontend, we utilize Vue Router's protected routes to ensure that users can only access pages and features appropriate to their roles. This setup adds an extra layer of security and functionality, aligning the user experience with their designated permissions and responsibilities within the application.

## 📱 Mobile Responsiveness and Cross-Platform Adaptability
Our application is designed with a strong focus on mobile responsiveness, ensuring a seamless user experience across various device sizes and platforms.

### Responsive Design with Vuetify
We leverage Vuetify's built-in responsiveness to make our app adaptable to any screen size. Vuetify's grid system and responsive utility classes allow our UI to automatically adjust and look great whether on a desktop, tablet, or mobile phone. This flexibility ensures that users have a consistent and intuitive experience regardless of the device used.

### Cross-Platform Development with Capacitor
In our pursuit to accommodate a wider user base, we've embraced Capacitor for building cross-platform applications. Capacitor enables us to write once and run everywhere, providing native-like experiences on both Android and iOS from a single codebase. This approach not only streamlines our development process but also ensures that our application can reach users on their preferred devices without compromising on features or performance.

## 🔒 Security Measures

Our application prioritizes the security and privacy of user data. We have implemented comprehensive measures to ensure that both user information and the application itself remain secure and protected.

### Data Encryption and Hashing
- **Hashing Sensitive Information**: All sensitive information, including passwords, is hashed using advanced algorithms. This ensures that even in the unlikely event of a data breach, the actual data remains inaccessible and secure.
- **Encryption of Data**: We employ strong encryption protocols to protect user data both at rest and in transit. This encryption safeguards against unauthorized access and keeps user information confidential.

### Continuous Security Monitoring
- **Regular Inspections**: Our team conducts regular security audits and inspections to identify and address any potential vulnerabilities. This proactive approach ensures that the application is safeguarded against new and emerging threats.
- **User Safety Assurance**: We continuously monitor the application to prevent any unauthorized access or suspicious activities. Ensuring user safety is paramount, and we are committed to maintaining a secure environment for our users.

Our security practices are designed to provide a robust defense against various cyber threats, ensuring that our users can trust us with their data.


## 👥 Contributors
1. [ MokhtarBeny ](https://github.com/MokhtarBeny)
2. [SanLamamba](https://github.com/sanlamamba)
3. [ quentin-derycke ](https://github.com/quentin-derycke)
4. [ PaulinDeuxTrois ](https://github.com/PaulinDeuxTrois)
5. [Name 5](#contributor-5-link) 