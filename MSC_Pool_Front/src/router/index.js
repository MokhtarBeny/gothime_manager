// Composables
import { createRouter, createWebHistory } from "vue-router";
import UserProfil from "../views/UserProfil.vue";
import MyCalendar from "../views/MyCalendar.vue";
import MyTeam from "../views/MyTeam.vue";
import Teams from "../views/TeamTables.vue";
import ManageTeam from "../views/ManageTeam.vue";
import NotAuthorized from "../views/NotAuthorized.vue";
const routes = [
 
  {
    path: "/",
    component: UserProfil,
  },
  {
    path: "/calendar",
    component: MyCalendar,
  },
  {
    path: "/users",
    component: MyTeam,
  },
  {
    path: "/teams",
    component: Teams,
  },
  {
    path: "/manage/team",
    component: ManageTeam,
  },
  {
    path: "/unauthorized",
    component: NotAuthorized,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
