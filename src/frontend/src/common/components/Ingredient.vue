<template>
  <li
    class="ingredients__item drag-el"
    :draggable="ingredient.quantity < 3"
    @dragstart="startDrag($event, ingredient)"
    :style="`cursor: ${ingredient.quantity < 3 ? 'pointer' : 'default'}`"
  >
    <span :class="`filling filling--` + ingredientClass(ingredient.image)">{{
      ingredient.name
    }}</span>

    <div class="counter counter--orange ingredients__counter">
      <button
        type="button"
        class="counter__button counter__button--minus"
        :disabled="ingredient.quantity < 1"
        @click="removeIngredient(ingredient)"
      >
        <span class="visually-hidden">Меньше</span>
      </button>
      <input
        v-model="ingredient.quantity"
        type="text"
        name="counter"
        class="counter__input"
        min="0"
        max="3"
        @input="validateCount"
      />
      <button
        type="button"
        class="counter__button counter__button--plus"
        @click="addIngredient(ingredient)"
        :disabled="this.ingredient.quantity >= 3"
      >
        <span class="visually-hidden">Больше</span>
      </button>
    </div>
  </li>
</template>

<script>
export default {
  name: "Ingredient.vue",
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      ingredient: this.item,
    };
  },
  computed: {
    quantity() {
      return this.ingredient.quantity;
    },
  },

  watch: {
    quantity() {
      this.addItems();
    },
  },
  methods: {
    ingredientClass(href) {
      let arr = href.split("/");
      arr = arr[arr.length - 1].split(".");
      return arr[0];
    },
    // Контролируем количество у текущего ингридиента
    validateCount() {
      if (this.ingredient.quantity > 3) {
        this.ingredient.quantity = 3;
      } else if (this.ingredient.quantity < 1) {
        this.ingredient.quantity = 0;
      }
      this.addItems();
    },

    removeIngredient(ingredient) {
      if (ingredient.quantity >= 1) ingredient.quantity--;
      this.addItems();
    },

    addIngredient(ingredient) {
      if (ingredient.quantity < 3) {
        ingredient.quantity++;
        this.addItems();
      }
    },
    startDrag(evt, ingredient) {
      this.$emit("start-drag", evt, ingredient);
    },
    addItems() {
      this.$emit("add-items");
    },
  },
};
</script>

<style scoped></style>
