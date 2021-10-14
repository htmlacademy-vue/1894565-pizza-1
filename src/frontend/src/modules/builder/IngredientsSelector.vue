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
              v-for="ingredient in ingredients"
              :key="ingredient.id"
              :item="ingredient"
              @add-items="addItems"
              @start-drag="startDrag"
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
      ingredientsList: this.ingredients,
      selected: [],
    };
  },
  mounted() {
    this.ingredients.forEach((ingredient) => {
      this.$set(ingredient, "quantity", 0);
    });
    console.log(this.$refs);
  },
  methods: {
    ingredientClass(href) {
      let arr = href.split("/");
      arr = arr[arr.length - 1].split(".");
      return arr[0];
    },

    removeIngredient(ingredient) {
      if (ingredient.quantity >= 1) ingredient.quantity--;
      this.addItems();
    },

    addIngredient(ingredient) {
      ingredient.quantity++;
      this.addItems();
    },

    addItems() {
      this.$emit(
        "add-items",
        this.ingredients.filter((ingredient) => ingredient.quantity >= 1),
        "ingredients"
      );
    },
    startDrag(evt, item) {
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
      evt.dataTransfer.setData("itemId", JSON.stringify(item));
    },
  },
};
</script>

<style scoped></style>
