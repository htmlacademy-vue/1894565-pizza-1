<template>
  <div @drop="onDrop($event, 1)" @dragover.prevent @dragenter.prevent>
    <div class="content__pizza">
      <label class="input">
        <span class="visually-hidden">{{ title }}</span>
        <input
          type="text"
          v-model="title"
          name="pizza_name"
          placeholder="Введите название пиццы"
        />
      </label>

      <div class="content__constructor">
        <div
          :class="`pizza pizza--foundation--${doughClass(
            product.dough.name
          )}-${sauceClass(product.sauce.name)}`"
        >
          <div class="pizza__wrapper">
            <div
              :class="`pizza__filling pizza__filling--${ingredientClass(
                ingredient.image
              )} pizza__filling--third`"
              v-for="(ingredient, i) in product.ingredients"
              :key="i"
            ></div>
          </div>
        </div>
      </div>
      <total-price
        @submit="submit"
        :total="totalPrice"
        :button="checkAvailabilityProducts"
      />
    </div>
  </div>
</template>

<script>
import TotalPrice from "@/common/components/TotalPrice";
export default {
  name: "PizzaView",
  components: {
    TotalPrice,
  },
  props: {
    pizza: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      title: "",
      product: this.pizza,
    };
  },
  computed: {
    checkAvailabilityProducts() {
      return this.product.ingredients.length > 0 && this.title.length > 0;
    },

    totalPrice() {
      let sumIngredients = 0;
      let sauce = this.product.sauce.price;
      let dough = this.product.dough.price;
      let sizeMultipler = this.product.size.multiplier;

      for (var i = 0; i < this.product.ingredients.length; i++) {
        sumIngredients +=
          this.product.ingredients[i].price *
          this.product.ingredients[i].quantity;
      }
      return (sumIngredients + sauce + dough) * sizeMultipler;
    },
  },
  methods: {
    sauceClass(name) {
      return name === "Сливочный" ? "creamy" : "tomato";
    },
    doughClass(name) {
      return name === "Толстое" ? "big" : "small";
    },

    ingredientClass(href) {
      let arr = href.split("/");
      arr = arr[arr.length - 1].split(".");
      return arr[0];
    },

    onDrop(evt) {
      const itemID = evt.dataTransfer.getData("itemId");
      let ingredient = JSON.parse(itemID);
      this.handlerDropItems(ingredient);
    },

    handlerDropItems(ingredient) {
      let result = this.product.ingredients.find(
        (item) => item.id === ingredient.id
      );
      if (result) {
        if (result.quantity < 3) {
          result.quantity++;
        }
      } else {
        ingredient.quantity++;
        this.$emit("change-count", ingredient.id);
      }
    },
    submit() {
      let order = {};
      order.product = this.product;
      order.title = this.title;
      order.price = this.totalPrice;

      this.$emit("submit", order);
    },
  },
};
</script>

<style scoped></style>
