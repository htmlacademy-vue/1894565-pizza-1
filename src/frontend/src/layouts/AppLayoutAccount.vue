<template>
  <div>
    <Header />
    <div>
      <slot />
      <side-bar />
    </div>
  </div>
</template>

<script>
import Header from "./components/Header";
import SideBar from "./components/SideBarAccount";
export default {
  name: "AppLayoutAccount",
  components: {
    Header,
    SideBar,
  },
};
</script>

<style scoped></style>
