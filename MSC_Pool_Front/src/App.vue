<template>
  <v-app id="inspire" v-if="token">
    <v-navigation-drawer
      v-model="drawer"
      app
      class="deep-purple accent-4 white--text"
    >
      <!-- Logo Image -->
      <v-list-item class="justify-center">
        <v-list-item-content class="align-center">
          <v-img
            src="https://1000logos.net/wp-content/uploads/2021/10/Batman-Logo.png"
            height="100"
            contain
          />
        </v-list-item-content>
      </v-list-item>

      <v-divider class="white"></v-divider>

      <!-- Static User Info centered without image -->
      <v-list-item class="justify-center mb-2">
        <v-list-item-content class="align-center">
          <v-list-item-title class="title text-center">
            {{ userInfo?.username || "" }}
          </v-list-item-title>
          <v-list-item-subtitle class="text-center">
            {{ userInfo?.email || "" }}
            {{ userInfo?.role || "" }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider class="white"></v-divider>
      <!-- Navigation Routes -->
      <v-list dense>
        <v-list-item title="Dashboard" prepend-icon="mdi-home" to="/" />
        <v-list-item
          title="Profil"
          prepend-icon="mdi-account-circle"
          to="/profil"
        />
        <v-list-item
          title="Calendar"
          prepend-icon="mdi-clock-start"
          to="/calendar"
        />

        <v-list-item
          v-if="userInfo?.role === 'admin' || userInfo?.role === 'smanager'"
          title="Manage Users"
          prepend-icon="mdi-account-multiple"
          to="/users"
        />
        <v-list-item
          v-if="userInfo?.role === 'admin' || userInfo?.role === 'smanager'"
          title="teams"
          prepend-icon="mdi-account-group-outline"
          to="/teams"
        />

        <v-list-item
          v-if="
            userInfo?.role === 'admin' ||
            userInfo?.role === 'smanager' ||
            userInfo?.role === 'manager'
          "
          title="Manage Team"
          prepend-icon="mdi-account-multiple-check"
          to="/manage/team"
        />
      </v-list>
      <v-spacer></v-spacer>

      <v-divider class="white"></v-divider>

      <v-spacer></v-spacer>
      <!-- This pushes the logout butpMton to the bottom -->

      <!-- Logout Button at the bdottom with spacing -->
      <v-list-item class="mt-5">
        <v-list-item-content>
          <v-btn block color="red" dark @click="logout">
            Logout
            <v-icon right>mdi-logout</v-icon>
          </v-btn>
        </v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>Gothime Manager</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
    <v-bottom-navigation :elevation="3" grow>
      <v-btn value="recent">
        <v-icon>mdi-history</v-icon>

        <span>Recent</span>
      </v-btn>

      <v-btn value="favorites">
        <v-icon>mdi-heart</v-icon>

        <span>Favorites</span>
      </v-btn>

      <v-btn value="nearby">
        <v-icon>mdi-map-marker</v-icon>

        <span>Nearby</span>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
  <v-app v-else class="bg-blue">
    <v-snackbar v-model="snackbar">
      <v-icon color="white">mdi-alert-circle</v-icon>
      <span class="white--text">You are not connected</span>
    </v-snackbar>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="px-5 py-5">
          <v-img
            src="https://1000logos.net/wp-content/uploads/2021/10/Batman-Logo.png"
            height="50"
            contain
          />
          <v-divider class="mx-5 my-3"></v-divider>
          <v-card-title class="text-h6 text-center pb-5">Login</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field
                v-model="auth.email"
                label="Email"
                prepend-icon="mdi-email"
                outlined
                required
                :rules="emailRules"
              ></v-text-field>
              <v-text-field
                v-model="auth.password"
                label="Password"
                prepend-icon="mdi-lock"
                outlined
                required
                type="password"
              ></v-text-field>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-btn color="primary" type="submit" block>Login</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>

<script setup>
import { ref } from "vue";

const drawer = ref(null);
</script>

<script>
import { useUserStore } from "./store/users.js";
import axios from "axios";
import { Vite_API_URL } from "./services/url";

export default {
  data: () => ({
    snackbar: true,
    drawer: null,
    userInfo: {
      name: null,
      email: null,
    },
    auth: {
      email: "",
      password: "",
    },
    token: null,
    emailRules: [
      (v) => !!v || "Email is required",
      (v) => /.+@.+\..+/.test(v) || "Email must be valid",
    ],
  }),
  created() {
    // This will run immediately after the instance is created
    this.loggedIn();
    if (
      (this.token === null || this.token === undefined || this.token === "") &&
      this.$route.path != "/"
    ) {
      this.$router.push("/");
    }
  },
  mounted() {
    const store = useUserStore();
    this.userInfo = store.getAuth().user;

    if (
      (this.token === null || this.token === undefined || this.token === "") &&
      this.$route.path !== "/"
    ) {
      this.$router.push("/");
    }
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/");
      window.location.reload();
    },
    loggedIn() {
      this.$router.push("/");
      const store = useUserStore();
      store.getAuth();
      const auth = store.getAuth();
      if (auth) {
        this.token = auth.token;
      }
      console.log("LOGGED IN");
    },
    async login() {
      if (this.auth.email || this.auth.password) {
        this.snackbar = true;
        const formData = {
          user: {
            email: this.auth.email,
            password: this.auth.password,
          },
        };
        const response = await axios.post(Vite_API_URL + "login", formData);
        const store = useUserStore();
        store.setAuth(response.data.user, response.data.token);
        const auth = store.getAuth();
        console.log(auth);
        this.token = response.data;
        this.$router.push("/");
        window.location.reload();

        // store.login(formData);
      }
    },
  },
};
</script>
