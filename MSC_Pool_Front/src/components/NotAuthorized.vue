<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card class="not-authorized-card">
          <v-card-title class="not-authorized-title">
            <v-icon size="24" class="mr-2">mdi-lock</v-icon>
            Access Denied
          </v-card-title>
          <v-card-text class="not-authorized-text">
            <v-icon size="64" color="red" class="mb-4"
              >mdi-alert-circle-outline</v-icon
            >
            <p>You are not authorized to be here.</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "NotAuthorized",
  methods: {},
};
</script>

<style scoped>
.not-authorized-card {
  max-width: 500px;
  padding: 24px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
}

.not-authorized-title {
  font-size: 24px;
  color: #ff0000;
  text-align: center;
  margin-bottom: 20px;
}

.not-authorized-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #333;
}
</style>
