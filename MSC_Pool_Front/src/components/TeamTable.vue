<template>
  <v-data-table
    :headers="headers"
    :items="teams"
    class="elevation-1 pa-6"
    :sort-by="[{ key: 'id', order: 'desc' }]"
    :sort-desc="sortDesc"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>The Teams</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn color="primary" dark class="mb-2" v-bind="props">
              Ajouter
              <v-icon size="small" class="me-2 ml-2" @click="editItem(item)">
                mdi-plus-circle-outline
              </v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="editedItem.name" label="Team Name" />
                  </v-col>

                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      v-model="editedItem.description"
                      label="Team Description"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="close">
                Annuler
              </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="save">
                Enregistrer
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="720px">
          <v-card>
            <v-card-title class="text-h5">
              Êtes-vous sûr de vouloir supprimer cet élément ?
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete"
                >Annuler</v-btn
              >
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:item.actions="{ item }">
      <!-- <v-icon small color="blue" @click="editItem(item)"> mdi-pencil </v-icon> -->
      <v-icon small color="red" @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>

    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Réinitialiser</v-btn>
    </template>
  </v-data-table>
  <v-snackbar v-model="snackbar">
    {{ error }}

    <template v-slot:actions>
      <v-btn color="pink" variant="text" @click="snackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>
<script>
// import axios from "axios";
import { useUserStore } from "../store/users";
import {
  createUser,
  updateUser,
  formatUser,
  deleteUser,
} from "../services/functions/user.js";
import { createTeam, deleteTeam, formatTeam } from "@/services/functions/teams";
// import { Vite_API_URL } from "@/services/url";
// import { useTeamStore } from "../store/teams.js";

export default {
  data: () => ({
    emailRules: [
      (v) => !!v || "Email is required",
      (v) => /.+@.+\..+/.test(v) || "Email must be valid",
    ],
    snackbar: false,
    error: "Un message !!!",
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        title: "name",
        key: "name",
      },
      { title: "description", key: "description" },
      { title: "Actions", key: "actions", sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      id: null,
      name: "",
      description: "",
    },
    defaultItem: {
      id: null,
      name: "",
      description: "",
    },
  }),

  computed: {
    teams() {
      const store = useUserStore();
      return store.teams;
    },
    users() {
      const store = useUserStore();
      return store.users;
    },
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : `Edit Team `;
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    const store = useUserStore(); // Use the store within the component's context
    store.fetchUsers();
    store.fetchTeams();
  },

  methods: {
    showSnackBar(message) {
      this.snackbar = true;
      this.error = message;
      setTimeout(() => {
        this.snackbar = false;
        this.error = "";
      }, 3000);
    },
    refreshData() {
      const store = useUserStore();
      store.fetchTeams();
    },
    editItem(item) {
      const data = formatTeam(item);
      this.editedIndex = data.user.id;
      this.editedItem = { ...data.user };
      console.log(this.editedItem);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.users.splice(this.editedIndex, 1);
      const formData = formatTeam(this.editedItem);
      deleteTeam(formData, [this.refreshData]);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      if (this.editedIndex > -1) {
        const formData = formatTeam(this.editedItem);
        updateUser(formData, [this.refreshData]);
      } else {
        const formData = formatTeam(this.editedItem);
        createTeam(formData, [this.refreshData]);
      }
      this.close();
    },
  },
};
</script>
