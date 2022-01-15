<template>
  <div id="app">
    <app-layout>
      <router-view />
    </app-layout>
  </div>
</template>
<script>
import AppLayout from "./layouts/AppLayout";
import jwt from "./services/jwt.service";
export default {
  name: "App",
  components: {
    AppLayout,
  },

  created() {
    if (jwt.getToken()) {
      this.$store.dispatch("me");
      this.$store.dispatch("addresses");
    }
  },
};
</script>

<style lang="scss">
@import "assets/scss/app";
</style>
