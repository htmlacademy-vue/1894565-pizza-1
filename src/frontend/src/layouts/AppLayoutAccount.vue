<template>
  <div>
    <Header :total-price="totalPrice" />
    <div>
      <slot />
      <side-bar />
    </div>
  </div>
</template>

<script>
import Header from "./components/Header";
import SideBar from "./components/SideBarAccount";
import { mapGetters } from "vuex";
export default {
  name: "AppLayoutAccount",
  components: {
    Header,
    SideBar,
  },
  computed: {
    ...mapGetters(["totalPrice"]),
  },
};
</script>

<style scoped></style>
