<template>
  <template v-if="user">
    <v-row>
      <v-col cols="6">
        <!-- <v-select
          v-model="selectedIndex"
          label="Select User"
          :items="users"
          item-title="username"
          item-value="id"
        /> -->
        <v-card class="mx-auto" max-width="1080">
          <v-toolbar flat color="indigo">
            <v-btn icon="mdi-account"></v-btn>
            <v-toolbar-title class="font-weight-light">
              My Account {{ userinfo.id }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <!-- 
            <v-btn icon @click="isEditing = !isEditing">
              <v-fade-transition leave-absolute>
                <v-icon v-if="isEditing">mdi-close</v-icon>

                <v-icon v-else>mdi-pencil</v-icon>
              </v-fade-transition>
            </v-btn> -->
          </v-toolbar>

          <v-card-text>
            <v-text-field
              :disabled="!isEditing"
              label="username"
              v-model="user.username"
            />
            <v-text-field
              :disabled="!isEditing"
              label="Email"
              v-model="user.email"
            />
          </v-card-text>
          <v-divider />
          <v-card-text>
            <v-text-field disabled v-model="user.role" />
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <!-- <v-btn :disabled="!isEditing" @click="save"> Save </v-btn> -->
          </v-card-actions>
          <v-snackbar v-model="hasSaved" :timeout="2000">
            Your profile has been updated
          </v-snackbar>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-row>
          <v-col cols="12">
            <v-card elevation="2">
              <v-card-text>
                <div class="d-flex flex-column align-center">
                  <div class="mr-2">Clock for {{ user.username }}:</div>
                  <div class="text-h6 mt-2">{{ currentTime }}</div>
                  <v-btn
                    v-if="canClock"
                    class="mt-4"
                    :color="
                      lastClockStatus && lastClockStatus ? 'red' : 'green'
                    "
                    @click="newClock"
                  >
                    <v-icon class="mr-2">
                      {{
                        lastClockStatus && lastClockStatus
                          ? "mdi-clock-out"
                          : "mdi-clock-in"
                      }}
                    </v-icon>
                    Clock
                    {{ lastClockStatus && lastClockStatus ? "out" : "in" }} now
                  </v-btn>
                  <v-progress-circular
                    v-else
                    indeterminate
                  ></v-progress-circular>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-card>
              <Doughnut
                v-if="loaded"
                :data="chartData"
                :options="chartOptions"
              />
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </template>

  <template v-else>
    <v-skeleton-loader type="card" width="100%" />
  </template>
</template>

<script>
import { formatClock, createClock } from "@/services/functions/clock";
import { useUserStore } from "@/store/users";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "vue-chartjs";

import clockInSound from "@/assets/clockIn.mp3";
import clockOutSound from "@/assets/clockOut.mp3";
import fail from "@/assets/fail.mp3";

ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  data: () => ({
    userInfo: null,
    chartData: null,
    loaded: false,
    hasSaved: false,
    isEditing: null,
    selectedTeamIds: null,
    selectedIndex: 5,
    clocks: [],
    currentTime: "",
    memberships: [],
    lastClockStatus: true,
    canClock: true,
    sound: {
      clockIn: new Audio(clockInSound),
      clockOut: new Audio(clockOutSound),
      fail: new Audio(fail),
    },
  }),
  props: {},
  beforeUnmount() {
    document.removeEventListener("keydown", this.handleKeydown);
  },
  created() {
    const store = useUserStore(); // Use the store within the component's context
    store.fetchUsers();
    store.fetchTeams();
    store.fetchMemberships();
    this.getClocks();
  },
  watch: {
    selectedIndex(newIndex) {
      this.updateUserFromIndex(newIndex);
      this.loadChart();
      this.refreshData();
      console.log(this.memberships);
      const arrmemberships = [];
      this.memberships.forEach((m) => arrmemberships.push(m.id));
      this.selectedTeamIds = arrmemberships;
    },
  },
  computed: {
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
      };
    },
    users() {
      const store = useUserStore();
      return store.users;
    },
    teams() {
      const store = useUserStore();
      return store.teams;
    },
    user() {
      const store = useUserStore();
      return store.getAuth().user;
    },
    userinfo() {
      const store = useUserStore();
      return store.getAuth().user;
    },
  },
  mounted() {
    document.addEventListener("keydown", this.handleKeydown);

    this.startClock();
    this.loaded = false;
    const store = useUserStore();
    // get current User memberships
    (() => {
      // const memberships = store.getClock(this.selectedIndex);
      // console.log(memberships);
    })();
    try {
      // Effectuez une requête Axios pour obtenir les données de vos horloges depuis l'API
      store.fetchClocks(this.selectedIndex).then((clocks) => {
        const presentClocks = clocks.reduce((acc, c) => {
          if (c.status) return acc + 1;
          return acc;
        }, 0);

        const presentPercent = (presentClocks / clocks.length) * 100;
        console.log("PRESENT CLOCK : ", presentPercent);
        this.chartData = {
          labels: ["ABSENT", "PRESENT"], // Remplacez "label" par le nom de la propriété qui contient les libellés
          datasets: [
            {
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(75, 192, 192, 0.2)",
              ],
              borderColor: ["rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)"],
              borderWidth: 2,
              data: [100 - presentPercent, presentPercent], // Remplacez "status" par le nom de la propriété qui contient les données
            },
          ],
        };

        this.loaded = true;
      });

      // Adaptez les données de vos horloges pour correspondre au format attendu
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    getClocks() {
      try {
        const store = useUserStore();
        (async () => {
          const clocks = await store.fetchAllClocks();
          const userClocks = clocks.filter(
            (clock) => clock.user_id === this.selectedIndex
          );
          this.clocks = userClocks;
          const now = new Date().getTime();
          let closestClock = null;
          let smallestDiff = Number.MAX_VALUE;
          for (const clock of this.clocks) {
            const clockTime = new Date(clock.time).getTime();
            const diff = Math.abs(clockTime - now); // Difference in milliseconds
            if (diff < smallestDiff) {
              smallestDiff = diff;
              closestClock = clock;
            }
          }
          this.lastClockStatus = closestClock.status;
        })();
      } catch (e) {
        console.log();
      }
    },
    newClock() {
      if (this.canClock) {
        this.canClock = false; // Prevents clocking again until 10 seconds have passed

        try {
          const currentDateTime = new Date().toISOString();
          const formattedTime = currentDateTime.slice(0, -5) + "Z";
          const formData = formatClock({
            status: !this.lastClockStatus,
            user_id: this.selectedIndex,
            time: formattedTime,
          });

          // Assuming createClock is an asynchronous function
          createClock(formData, [this.refreshData])
            .then(() => {
              // Handle success if needed
            })
            .catch((e) => {
              console.error(e); // Handle error
            });

          this.lastClockStatus = !this.lastClockStatus;
        } catch (e) {
          console.error(e); // Handle synchronous errors
        }

        // Set a timeout to re-enable clocking after 10 seconds
        setTimeout(() => {
          this.canClock = true;
        }, 10000); // 10 seconds delay
      }
    },

    handleKeydown(e) {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "u") {
        e.preventDefault(); // Prevents the default action of the key
        if (!this.canClock) return this.playSound(false, true);
        this.playSound(this.lastClockStatus);
        this.newClock();
      }
    },
    playSound(type = true, special = false) {
      if (special) {
        this.audio = this.sound.fail;
        this.audio.play();
        return;
      }
      if (type == true) {
        this.audio = this.sound.clockIn;
      } else {
        this.audio = this.sound.clockOut;
      }
      this.audio.play();
    },

    refreshData() {
      const store = useUserStore();
      this.clocks = store.getClocksByUser(this.selectedIndex);
      store.fetchAllClocks();
      this.getClocks();
    },
    click() {
      console.log(this.memberships);
    },
    startClock() {
      this.updateTime(); // Call it immediately to set the initial time
      setInterval(this.updateTime, 1000); // Update time every second
    },
    updateTime() {
      const now = new Date();
      const formattedTime = now.toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      this.currentTime = formattedTime;
    },
    loadChart() {
      this.loaded = false;
      const store = useUserStore();
      store.fetchClocks(this.selectedIndex).then((clocks) => {
        const presentClocks = clocks.reduce((acc, c) => {
          if (c.status) return acc + 1;
          return acc;
        }, 0);

        const presentPercent = (presentClocks / clocks.length) * 100;
        console.log("PRESENT CLOCK : ", presentPercent);
        this.chartData = {
          labels: ["ABSENT", "PRESENT"],
          datasets: [
            {
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(75, 192, 192, 0.2)",
              ],
              borderColor: ["rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)"],
              borderWidth: 2,
              data: [100 - presentPercent, presentPercent],
            },
          ],
        };

        this.loaded = true;
      });
    },
    updateUserFromIndex(index) {
      const selectedUser = this.users[index];
      if (selectedUser) {
        this.user = {
          id: selectedUser.id,
          username: selectedUser.username,
          email: selectedUser.email,
          role: selectedUser.role,
        };
        this.selectedTeamIds = selectedUser.teamIds;
      }
    },
    save() {
      this.isEditing = !this.isEditing;
      this.hasSaved = true;
    },
  },
  components: { Doughnut },
};
</script>
