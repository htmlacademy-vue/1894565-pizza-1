<template>
  <main class="layout">
    <div class="layout__content">
      <div class="layout__title">
        <h1 class="title title--big">История заказов</h1>
      </div>
      <Orders />
    </div>
  </main>
</template>

<script>
import Orders from "@/modules/orders/Orders";
export default {
  name: "OrdersView",
  components: {
    Orders,
  },
};
</script>

<style scoped></style>
