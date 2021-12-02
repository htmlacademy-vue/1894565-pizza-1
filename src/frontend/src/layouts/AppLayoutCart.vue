<template>
  <form method="post" class="layout-form">
    <Header :total-price="totalPrice" />
    <slot />
    <Footer class="footer" :total-price="totalPrice" />
  </form>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/FooterCart";
import { mapGetters, mapState } from "vuex";

export default {
  name: "AppLayoutMain",
  components: {
    Header,
    Footer,
  },
  computed: {
    ...mapState({
      pizzas: (state) => state.cart.products,
      additional_products: (state) => state.cart.additional_products,
    }),
    ...mapGetters(["totalPrice"]),
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
