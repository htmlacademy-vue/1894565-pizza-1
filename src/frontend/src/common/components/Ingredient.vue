<template>
  <li
    class="ingredients__item drag-el"
    :draggable="ingredient.quantity < 3"
    @dragstart="startDrag($event, index)"
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
        @click="removeIngredient"
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
        @click="addIngredient"
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
    index: {
      type: Number,
      default: 0,
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
    //реагируем на изменение количества и шлём наверх
    quantity() {
      this.$emit("add-items");
    },
  },
  methods: {
    //обработчик селектора для иконки ингридиента
    ingredientClass(href) {
      let arr = href.split("/");
      arr = arr[arr.length - 1].split(".");
      return arr[0];
    },
    // Контролируем количество у текущего ингридиента
    validateCount() {
      this.$emit("validate-quantity", this.index);
    },
    //удаляем ингридиент
    removeIngredient() {
      this.$emit("remove-ingredient", this.index);
    },
    //добавляем ингридиент
    addIngredient() {
      this.$emit("add-ingredient", this.index);
    },
    //обработчик начала перетаскивания
    startDrag(evt, index) {
      this.$emit("start-drag", evt, index);
    },
  },
};
</script>

<style scoped></style>
