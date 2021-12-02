<template>
  <main class="content cart">
    <div class="container">
      <div class="cart__title">
        <h1 class="title title--big">Корзина</h1>
      </div>

      <div v-if="pizzas.length === 0" class="sheet cart__empty">
        <p>В корзине нет ни одного товара</p>
      </div>

      <ul v-else class="cart-list sheet">
        <product
          :index="index"
          :data="pizza"
          v-for="(pizza, index) in pizzas"
          :key="pizza.id"
          @manual-change="manualChange"
          @increase-number="increaseNumber"
          @reduce-number="reduceNumber"
        />
      </ul>

      <div class="cart__additional">
        <ul class="additional-list">
          <additional-product
            v-for="(product, index) in products"
            :key="product.id"
            :product="product"
            :index="index"
            @manual-change="manualChange"
            @increase-number="increaseNumber"
            @reduce-number="reduceNumber"
          />
        </ul>
      </div>

      <order-info :contact="order_info" />
    </div>
  </main>
</template>

<script>
import Product from "@/modules/cart/Product";
import AdditionalProduct from "@/modules/cart/AdditionalProduct";
import OrderInfo from "@/modules/cart/OrderInfo";
import { mapState } from "vuex";
import misc from "@/static/misc.json";
import { cloneDeep, has } from "lodash";
export default {
  name: "Cart",
  components: {
    Product,
    AdditionalProduct,
    OrderInfo,
  },
  data() {
    return {
      additional_products: misc,
    };
  },
  computed: {
    ...mapState({
      pizzas: (state) => state.cart.products,
      products: (state) => state.cart.additional_products,
      order_info: (state) => state.cart.order_info,
    }),
  },
  mounted() {
    this.additional_products.forEach((item) => {
      if (!has(item, "quantity")) {
        if (!this.products.find((elem) => elem.id === item.id)) {
          this.$store.dispatch("addProduct", {
            item: cloneDeep(item),
            field: "additional_products",
          });
        }
      }
    });
  },
  methods: {
    manualChange(payload) {
      this.$store.dispatch("manualChange", payload);
    },
    increaseNumber(payload) {
      this.$store.dispatch("increaseNumber", payload);
    },
    reduceNumber(payload) {
      this.$store.dispatch("reduceNumber", payload);
    },
  },
};
</script>
