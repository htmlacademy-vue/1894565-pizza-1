<template>
  <div id="app">
    <constructor-pizza></constructor-pizza>
  </div>
</template>

<script>
import ConstructorPizza from "@/views/Index";

export default {
  name: "App",
  components: {
    ConstructorPizza,
  },
};
</script>

<style lang="scss">
@import "assets/scss/app";
</style>
