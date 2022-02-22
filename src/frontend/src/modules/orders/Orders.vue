<template>
  <div>
    <card v-for="order in orders" :key="order.id" :order="order" />
  </div>
</template>

<script>
import Card from "@/common/components/orders/Card";
import { mapState } from "vuex";

export default {
  name: "OrdersModule",
  components: {
    Card,
  },
  computed: {
    ...mapState({
      orders: (state) => state.orders.orders,
    }),
  },
  async created() {
    await this.$store.dispatch("loadMisc");
    await this.$store.dispatch("loadComponents");
    await this.$store.dispatch("getOrders");
  },
};
</script>

<style scoped></style>
