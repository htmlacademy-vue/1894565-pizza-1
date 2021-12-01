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
      <quantity-selection
        @manual-change="manualChange"
        @reduce-number="reduceNumber"
        @increase-number="increaseNumber"
        :limit="3"
        :obj="ingredient"
        field="quantity"
      />
    </div>
  </li>
</template>

<script>
import QuantitySelection from "@/common/components/cart/QuantitySelection";
export default {
  name: "Ingredient.vue",
  components: {
    QuantitySelection,
  },
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

  methods: {
    //обработчик селектора для иконки ингридиента
    ingredientClass(href) {
      let arr = href.split("/");
      arr = arr[arr.length - 1].split(".");
      return arr[0];
    },

    // Контролируем количество у текущего элемента, если его изменили в ручную
    manualChange() {
      this.$emit("manual-change", this.index);
    },
    //отнять
    reduceNumber() {
      this.$emit("reduce-number", { ...this.ingredient });
    },
    //прибавить
    increaseNumber() {
      this.$emit("increase-number", { ...this.ingredient });
    },

    //обработчик начала перетаскивания
    startDrag(evt, index) {
      this.$emit("start-drag", evt, index);
    },
  },
};
</script>

<style scoped></style>
