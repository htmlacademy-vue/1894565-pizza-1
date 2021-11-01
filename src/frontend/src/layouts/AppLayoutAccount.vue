<template>
  <div>
    <Header />
    <div>
      <router-view />
      <side-bar />
    </div>
  </div>
</template>

<script>
import Header from "./components/Header";
import SideBar from "./components/SideBarProfile";
export default {
  name: "AppLayoutAccount",
  components: {
    Header,
    SideBar,
  },
};
</script>

<style scoped></style>
