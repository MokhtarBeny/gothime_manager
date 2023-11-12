// Utilities
import { defineStore } from "pinia";
import CryptoJS from "crypto-js";

import axios from "axios";
import { Vite_API_URL } from "@/services/url";

export const useUserStore = defineStore("user", {
  state: () => ({
    users: [],
    teams: [],
    memberships: [],
    schedules: [],
    clocks: [],
    auth: {
      user: null,
      token: null,
    },
  }),
  getters: {
    getUsers(state) {
      return state.users;
    },
    getSchedulesByUser(state) {
      return state.schedules
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
    getSchedules(state) {
      return state.schedules;
    },
    getClocks(state) {
      return state.clocks;
    },
  },
  setters: {},
  actions: {
    getAuth() {
      // Define a secret key for decryption
      const secretKey = "your-very-own-secret-key"; // Use the same key used for encryption

      // Retrieve encrypted data from local storage
      const encryptedToken = window.localStorage.getItem("y");
      const encryptedUser = window.localStorage.getItem("x");

      // Decrypt data
      let token = null;
      let user = null;

      if (encryptedToken)
      {
        const bytesToken = CryptoJS.AES.decrypt(encryptedToken, secretKey);
        token = JSON.parse(bytesToken.toString(CryptoJS.enc.Utf8));
      }

      if (encryptedUser)
      {
        const bytesUser = CryptoJS.AES.decrypt(encryptedUser, secretKey);
        user = JSON.parse(bytesUser.toString(CryptoJS.enc.Utf8));
      }

      // Update auth state
      this.auth = { user, token };

      // Return decrypted user and token
      return { user, token };
    },
    setAuth(user, token) {
      console.log("setAuth", user, token);
      // Define a secret key for encryption
      const secretKey = "your-very-own-secret-key"; // Change this to a unique secret key

      // Encrypt data
      const encryptedUser = CryptoJS.AES.encrypt(
        JSON.stringify(user),
        secretKey
      ).toString();
      const encryptedToken = CryptoJS.AES.encrypt(
        JSON.stringify(token),
        secretKey
      ).toString();

      // Set encrypted data in local storage
      window.localStorage.setItem("x", encryptedUser);
      window.localStorage.setItem("y", encryptedToken);

      // Update auth state
      this.auth.user = user;
      this.auth.token = token;
    },
    setUsers(users) {
      if (this.auth.user.role !== "admin")
        users = users.filter((u) => u.role !== "admin");
      this.users = users;
    },
    setSchedules(schedules) {
      this.schedules = schedules;
    },
    setSchedulesByUser(schedules) {
      this.schedules = schedules;
 },
    setClocks(clocks) {
      this.clocks = clocks;
    },
    setTeams(teams) {
      this.teams = teams;
    },
    setMemberships(memberships) {
      this.memberships = memberships;
    },
    getUserByID(userID) {
      const user = this.users.find((user) => user.id === userID);
      return user;
    },
    getMembershipsByUser(userID) {
      const memberships = this.memberships.filter((m) => m.user_id === userID);
      return memberships;
    },

    getData() {
      this.fetchUsers();
      this.fetchTeams();
      this.fetchMemberships();
      this.fetchSchedules();
      this.fetchAllClocks();
    },
    async fetchUsers() {
      try
      {
        const response = await axios.get(Vite_API_URL + "users/all");
        // const filteredData = response.data.data.filter((u) => !u.is_visible);
        this.setUsers(response.data.data);
      } catch (error)
      {
        alert(error);
        console.group(error);
      }
    },
    async fetchSchedules() {
      try
      {
        const response = await axios.get(Vite_API_URL + "schedules");
        this.setSchedules(response.data.data);
      } catch (error)
      {
        alert(error);
        console.group(error);
      }
    },
    async fetchSchedulesByUser(userId, startTime, endTime) {
      try
      {
        const apiUrl = `${Vite_API_URL}schedules/${userId}?start_time=${startTime}&end_time=${endTime}`;
        const response = await axios.get(apiUrl);
        console.log(response.data.data)
        this.setSchedulesByUser(response.data.data);
      } catch (error)
      {
        alert(error);
        console.group(error);
      }
    },

    async fetchClocks(user_id) {
      try
      {
        const response = await axios.get(
          Vite_API_URL + `clocks/?user_id=${user_id}`
        );
        return response.data.data;
      } catch (error)
      {
        alert(error);
        console.group(error);
      }
    },
    async fetchTeams() {
      try
      {
        const response = await axios.get(Vite_API_URL + "teams");
        this.setTeams(response.data.data);
      } catch (error)
      {
        alert(error);
        console.group(error);
      }
    },
    async fetchUser(userID) {
      try
      {
        const response = await axios.get(Vite_API_URL + `users/${userID}`);
        this.setUsers(response.data.data);
      } catch (error)
      {
        alert(error);
        console.group(error);
      }
    },
    async fetchMemberships() {
      try
      {
        const response = await axios.get(Vite_API_URL + "memberships");
        this.setMemberships(response.data.data);
      } catch (error)
      {
        alert(error);
        console.group(error);
      }
    },
    async fetchAllClocks() {
      try
      {
        const response = await axios.get(Vite_API_URL + "clocks/all");
        this.setClocks(response.data.data);
      } catch (error)
      {
        alert(error);
        console.group(error);
      }
    },

    getMembershipsForTeam(team_id) {
      return this.memberships.filter((m) => m.team_id === team_id);
    },
  },
});
