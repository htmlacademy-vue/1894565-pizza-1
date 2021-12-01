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
              v-for="(item, index) in items"
              :key="item.id"
              :item="item"
              :index="index"
              @add-items="addItems"
              @start-drag="startDrag"
              @manual-change="manualChange"
              @increase-number="increaseNumber"
              @reduce-number="reduceNumber"
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
      items: this.ingredients,
    };
  },
  methods: {
    // Контролируем количество у текущего элемента, если его изменили в ручную
    manualChange(payload) {
      this.$emit("manual-change", payload);
    },
    //отнять
    reduceNumber(payload) {
      this.$emit("reduce-number", payload);
    },
    //прибавить
    increaseNumber(payload) {
      this.$emit("increase-number", payload);
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

<style scoped></style>
