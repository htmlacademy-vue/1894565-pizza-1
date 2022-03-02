<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">
        <slot />

        <div class="ingredients__filling">
          <p>Начинка:</p>

          <ul class="ingredients__list">
            <ingredient
              v-for="(item, index) in ingredients"
              :key="item.id"
              :item="item"
              :index="index"
              @add-items="addItems"
              @start-drag="startDrag"
              @manual-change="manualChange"
              @increase-number="increaseNumber(index)"
              @reduce-number="reduceNumber(index)"
            />
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Ingredient from "@/common/components/builder/Ingredient";

export default {
  name: "IngredientsSelector",
  components: {
    Ingredient,
  },
  props: {
    ingredients: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selected: [],
    };
  },
  methods: {
    // Контролируем количество у текущего элемента, если его изменили в ручную
    manualChange(payload) {
      this.$emit("manual-change", payload);
    },
    //отнять
    reduceNumber(index) {
      this.$emit("reduce-number", index);
    },
    //прибавить
    increaseNumber(index) {
      this.$emit("increase-number", index);
    },
    addItems() {
      this.$emit(
        "add-items",
        this.ingredients.filter((ingredient) => ingredient.quantity >= 1),
        "ingredients"
      );
    },
    startDrag(evt, index) {
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
      evt.dataTransfer.setData("itemIndex", JSON.stringify(index));
    },
  },
};
</script>
