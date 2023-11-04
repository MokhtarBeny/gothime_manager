// Utilities
import { defineStore } from "pinia";

import axios from "axios";
import { Vite_API_URL } from "@/services/url";

export const useUserStore = defineStore("user", {
  state: () => ({
    users: [],
    teams: [],
  }),
  getters: {
    getUsers(state) {
      return state.users;
    },
    getUser(state, userID) {
      const data = {
        user: null,
        team: null,
      };
      data.user = state.users.find((user) => user.id === userID);
      if (data.user === null) return new Error("User not found");
      data.team = state.teams.find((team) => team.id === data.user.team_id);
      return data;
    },
    getTeams(state) {
      return state.teams;
    },
  },
  actions: {
    setUsers(users) {
      this.users = users;
    },
    async fetchUsers() {
      try {
        const response = await axios.get(Vite_API_URL + "users/all");
        // const filteredData = response.data.data.filter((u) => !u.is_visible);
        this.setUsers(response.data.data);
      } catch (error) {
        alert(error);
        console.group(error);
      }
    },
    async fetchClocks(user_id) {
      try {
        const response = await axios.get(
          Vite_API_URL + `clocks/?user_id=${user_id}`
        );
        return response.data.data;
      } catch (error) {
        alert(error);
        console.group(error);
      }
    },
    async fetchUser(userID) {
      try {
        const response = await axios.get(Vite_API_URL + `users/${userID}`);
        this.setUsers(response.data.data);
      } catch (error) {
        alert(error);
        console.group(error);
      }
    },
    setTeams(teams) {
      this.teams = teams;
    },
    async fetchTeams() {
      try {
        const response = await axios.get(Vite_API_URL + "teams");
        this.setTeams(response.data.data);
      } catch (error) {
        alert(error);
        console.group(error);
      }
    },
  },
});
