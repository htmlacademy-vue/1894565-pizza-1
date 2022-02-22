<template>
  <section class="sheet order">
    <div class="order__wrapper">
      <div class="order__number">
        <b>Заказ #{{ order.id }}</b>
      </div>

      <div class="order__sum">
        <span>Сумма заказа: {{ totalOrderPrice }} ₽</span>
      </div>

      <div class="order__button">
        <button
          type="button"
          class="button button--border"
          @click="deleteOrder"
        >
          Удалить
        </button>
      </div>
      <div class="order__button">
        <button type="button" class="button" @click="orderRepeat">
          Повторить
        </button>
      </div>
    </div>

    <ul class="order__list">
      <Pizza
        v-for="pizza in order.orderPizzas"
        :key="pizza.id"
        :pizza="pizza"
      />
    </ul>

    <ul class="order__additional">
      <additional-product
        v-for="product in order.orderMisc"
        :key="product.id"
        :product="product"
      />
    </ul>
    <p class="order__address">
      <span v-if="order.orderAddress"
        >Адрес доставки: {{ order.orderAddress.name }}.
      </span>
      <span v-if="order.phone"
        ><b> Телефон: {{ order.phone }}</b>
      </span>
    </p>
  </section>
</template>

<script>
import Pizza from "@/common/components/orders/Pizza";
import AdditionalProduct from "@/common/components/orders/AdditionalProduct";
import { cloneDeep } from "lodash";
import { calculateCostOfPizza } from "@/common/pricePizza.js";
export default {
  name: "Card",
  components: {
    Pizza,
    AdditionalProduct,
  },
  props: {
    order: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    totalOrderPrice() {
      let sum = 0;
      this.order.orderPizzas.forEach((pizza) => {
        sum += calculateCostOfPizza(pizza) * pizza.quantity;
      });
      if (this.order.orderMisc) {
        this.order.orderMisc.forEach((misc) => {
          sum += misc.price * misc.quantity;
        });
      }

      return sum;
    },
  },

  methods: {
    orderRepeat() {
      this.$store.dispatch("cleanCart");

      this.order.orderPizzas.forEach((pizza) => {
        this.$store.dispatch("addProduct", {
          item: cloneDeep(pizza),
          field: "products",
        });
      });
      if (this.order.orderMisc) {
        this.$store.dispatch("addProduct", {
          item: cloneDeep(this.order.orderMisc),
          field: "additional_products",
        });
      }

      this.$router.push("/cart");
    },

    deleteOrder() {
      this.$store.dispatch("deleteOrder", this.order.id);
    },
  },
};
</script>

<style scoped></style>
