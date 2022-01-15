<template>
  <div @drop="onDrop($event, 1)" @dragover.prevent @dragenter.prevent>
    <div class="content__pizza">
      <label class="input">
        <input
          type="text"
          v-model="pizza.title"
          name="pizza_name"
          @change="setTitle"
          placeholder="Введите название пиццы"
        />
      </label>

      <div class="content__constructor">
        <div
          :class="`pizza pizza--foundation--${doughClass(
            pizza.dough.name
          )}-${sauceClass(pizza.sauce.name)}`"
        >
          <div class="pizza__wrapper">
            <div v-for="ingredient in pizza.ingredients" :key="ingredient.id">
              <div
                :class="`pizza__filling pizza__filling--${ingredientClass(
                  ingredient.image
                )} `"
              ></div>

              <div
                v-if="ingredient.quantity === 2"
                :class="`pizza__filling pizza__filling--${ingredientClass(
                  ingredient.image
                )} pizza__filling--second`"
              ></div>

              <div
                v-if="ingredient.quantity === 3"
                :class="`pizza__filling pizza__filling--${ingredientClass(
                  ingredient.image
                )} pizza__filling--third`"
              ></div>
            </div>
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
import TotalPrice from "@/common/components/builder/TotalPrice";
import { mapState } from "vuex";
export default {
  name: "PizzaView",
  components: {
    TotalPrice,
  },

  computed: {
    ...mapState({
      pizza: (state) => state.builder.pizza,
    }),

    checkAvailabilityProducts() {
      return this.pizza.ingredients.length > 0 && this.pizza.title.length > 0;
    },

    totalPrice() {
      let sumIngredients = 0;
      let sauce = this.pizza.sauce.price;
      let dough = this.pizza.dough.price;
      let sizeMultiplier = this.pizza.size.multiplier;

      for (let i = 0; i < this.pizza.ingredients.length; i++) {
        sumIngredients +=
          this.pizza.ingredients[i].price * this.pizza.ingredients[i].quantity;
      }
      return (sumIngredients + sauce + dough) * sizeMultiplier;
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
      let itemIndex = evt.dataTransfer.getData("itemIndex");
      this.$emit("add-drop-item", JSON.parse(itemIndex));
    },

    setTitle() {
      this.$emit("add-item", this.pizza.title, "title");
    },

    submit() {
      let order = this.pizza;
      order.price = this.totalPrice;
      this.$emit("submit", order);
    },
  },
};
</script>

<style scoped></style>
