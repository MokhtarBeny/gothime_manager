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


### Additional Frontend Tools
In addition to the core technologies, our application utilizes several other tools to enhance functionality and user experience:

- **Pinia**: Manages the application's state in a centralized store, ensuring reactive and consistent state management across components.
- **Vue Router**: Facilitates navigation and routing within the SPA, contributing to a smooth and seamless user experience.
- **Mdi Icons**: Provides a rich set of icons, enhancing the visual appeal and user interface of our application.
- **V-Calendar**: Integrated for handling date and time-related functionalities, offering a user-friendly calendar interface.
- **Vue-Chartjs**: Utilized for rendering responsive and interactive charts, useful for data visualization tasks.
- **Axios**: Employed for making HTTP requests to the backend, enabling efficient data fetching and state updates.

These tools collectively contribute to the robustness and feature-rich nature of our frontend.

### Protected Routes
To ensure security and appropriate access control, our application implements protected routes:

- **Token-Based Authentication**: Routes are secured using token-based authentication. Users must be authenticated to access certain parts of the application.
- **Role-Based Access**: Access to specific routes is also determined based on user roles. For example, admin routes are inaccessible to regular users. This role-based protection aligns the application's functionality with the user's permissions and responsibilities.

This approach to route protection is crucial in maintaining the integrity and security of our application, ensuring that users only access content and functionalities relevant to their roles.