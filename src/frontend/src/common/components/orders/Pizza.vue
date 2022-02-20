<template>
  <li class="order__item">
    <div class="product">
      <img
        src="img/product.svg"
        class="product__img"
        width="56"
        height="56"
        alt="Капричоза"
      />
      <div class="product__text">
        <h2>{{ pizza.title }}</h2>
        <ul>
          <li>
            Размер:
            <span style="text-transform: lowercase">{{ size }}</span
            >, Тесто: <span style="text-transform: lowercase">{{ dough }}</span
            >.
          </li>
          <li>
            Соус:
            <span style="text-transform: lowercase">{{ sauce }}</span>
          </li>
          <li>
            Начинка:
            <span style="text-transform: lowercase"> {{ ingredients }} </span>
          </li>
        </ul>
      </div>
    </div>

    <p class="order__price">{{ `${pizza.quantity}x${price} ₽` }}</p>
  </li>
</template>

<script>
import { calculateCostOfPizza } from "@/common/pricePizza.js";
export default {
  name: "Pizza",
  props: {
    pizza: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    ingredients() {
      let names = this.pizza.ingredients.map((ingredient) => ingredient.name);
      return names.join(", ");
    },

    size() {
      return this.pizza.size.name;
    },
    dough() {
      return this.pizza.dough.name;
    },
    sauce() {
      return this.pizza.sauce.name;
    },
    price() {
      return calculateCostOfPizza(this.pizza);
    },
  },
};
</script>

<style scoped></style>
