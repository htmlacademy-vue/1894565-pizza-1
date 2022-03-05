<template>
  <li
    class="ingredients__item"
    :draggable="item.quantity < 3"
    :id="`ingredient-${index}`"
    @dragstart="startDrag($event, index)"
    :style="`cursor: ${item.quantity < 3 ? 'pointer' : 'default'};
    }`"
  >
    <span
      :class="`filling filling--` + ingredientClass(item.image)"
      :style="`font-weight: ${item.quantity > 0 ? '600' : '300'}`"
      >{{ item.name }}</span
    >

    <div class="counter counter--orange ingredients__counter">
      <quantity-selection
        @manual-change="manualChange"
        @reduce-number="reduceNumber"
        @increase-number="increaseNumber"
        :limit="3"
        :obj="item"
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

  methods: {
    //обработчик селектора для иконки ингридиента
    ingredientClass(href) {
      let arr = href.split("/");
      arr = arr[arr.length - 1].split(".");
      return arr[0];
    },

    // Контролируем количество у текущего элемента, если его изменили в ручную
    manualChange(payload) {
      this.$emit("manual-change", { value: payload, index: this.index });
    },
    //отнять
    reduceNumber() {
      this.$emit("reduce-number", { ...this.item });
    },
    //прибавить
    increaseNumber() {
      this.$emit("increase-number", { ...this.item });
    },

    //обработчик начала перетаскивания
    startDrag(evt, index) {
      this.$emit("start-drag", evt, index);
    },
  },
};
</script>
