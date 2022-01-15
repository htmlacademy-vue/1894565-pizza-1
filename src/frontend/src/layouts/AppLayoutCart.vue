<template>
  <div class="layout-form">
    <Header :total-price="totalPrice" />
    <slot />
    <Footer class="footer" :order-info="order_info" :total-price="totalPrice" />
  </div>
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
      order_info: (state) => state.cart.order_info,
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
