<template>
  <div id="app">
    <app-layout />
  </div>
</template>
<script>
import AppLayout from "./layouts/AppLayout";

export default {
  name: "App",
  components: {
    AppLayout,
  },
  mounted() {
    console.log(this.$api);
  },
};
</script>

<style lang="scss">
@import "assets/scss/app";
</style>
