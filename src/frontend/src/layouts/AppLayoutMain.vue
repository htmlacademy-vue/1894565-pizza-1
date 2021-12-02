<template>
  <div>
    <Header :total-price="totalPrice" />
    <slot />
  </div>
</template>

<script>
import Header from "./components/Header";
import { mapGetters } from "vuex";
export default {
  name: "AppLayoutMain",
  components: {
    Header,
  },
  computed: {
    ...mapGetters(["totalPrice"]),
  },
};
</script>

<style scoped></style>
