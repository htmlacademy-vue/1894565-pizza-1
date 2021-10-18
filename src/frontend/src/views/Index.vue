<template>
  <div>
    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>

          <dough-selector :doughs="componentsPizza.dough" @add-item="addItem" />
          <size-selector :sizes="componentsPizza.sizes" @add-item="addItem" />
          <ingredients-selector
            :ingredients="componentsPizza.ingredients"
            @add-items="addItem"
          >
            <sauces-selector
              :sauces="componentsPizza.sauces"
              @add-item="addItem"
            />
          </ingredients-selector>
          <pizza-view
            :pizza="pizza"
            @add-drop-item="addDropElement"
            @submit="submit"
          />
        </div>
      </form>
    </main>
  </div>
</template>

<script>
import PizzaItems from "@/static/pizza.json";
import DoughSelector from "@/modules/builder/DoughSelector";
import IngredientsSelector from "@/modules/builder/IngredientsSelector";
import SizeSelector from "@/modules/builder/SizeSelector";
import SaucesSelector from "@/modules/builder/SaucesSelector";
import PizzaView from "@/modules/builder/PizzaView";

export default {
  name: "Index.vue",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    PizzaItems,
    DoughSelector,
    IngredientsSelector,
    SizeSelector,
    SaucesSelector,
    PizzaView,
  },
  data() {
    return {
      componentsPizza: PizzaItems,
      pizza: {
        size: {},
        dough: {},
        sauce: {},
        ingredients: [],
      },
    };
  },

  mounted() {
    this.componentsPizza.ingredients.forEach((ingredient) => {
      this.$set(ingredient, "quantity", 0);
    });
  },

  methods: {
    addItem(item, type) {
      this.pizza[type] = item;
    },

    addDropElement(index) {
      this.componentsPizza.ingredients[index].quantity++;
    },

    submit(order) {
      console.log(order);
      //TODO далее запрос на бэк или вуекс
    },
  },
};
</script>
