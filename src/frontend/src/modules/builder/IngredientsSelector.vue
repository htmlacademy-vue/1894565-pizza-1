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
              @add-ingredient="addIngredient"
              @remove-ingredient="removeIngredient"
              @validate-quantity="validateQuantity"
            />
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Ingredient from "../../common/components/Ingredient";

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
    validateQuantity(index) {
      if (this.items[index].quantity > 3) {
        this.items[index].quantity = 3;
      } else if (this.items[index].quantity < 1) {
        this.items[index].quantity = 0;
      }
      this.addItems();
    },
    addIngredient(index) {
      if (this.items[index].quantity < 3) {
        this.items[index].quantity++;
        this.addItems();
      }
    },
    removeIngredient(index) {
      if (this.items[index].quantity >= 1) {
        this.items[index].quantity--;
        this.addItems();
      }
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
