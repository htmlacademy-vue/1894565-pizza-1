<template>
  <form method="post" class="layout-form">
    <Header />
    <slot />
    <Footer class="footer" />
  </form>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/FooterCart";

export default {
  name: "AppLayoutMain",
  components: {
    Header,
    Footer,
  },
};
</script>

<style scoped>
.footer {
  position: fixed;
  width: 96%;
  bottom: 0px;
}
</style>
