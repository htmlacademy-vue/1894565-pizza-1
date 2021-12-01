<template>
  <div>
    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper" :key="previewKey">
          <h1 class="title title--big">Конструктор пиццы</h1>

          <dough-selector
            :doughs="components.dough"
            :selected="pizza"
            @add-item="addItem"
          />
          <size-selector
            :sizes="components.sizes"
            :selected="pizza"
            @add-item="addItem"
          />
          <ingredients-selector
            :ingredients="components.ingredients"
            @add-items="addItem"
            @manual-change="manualChange"
            @increase-number="increaseNumber"
            @reduce-number="reduceNumber"
          >
            <sauces-selector
              :sauces="components.sauces"
              :selected="pizza"
              @add-item="addItem"
            />
          </ingredients-selector>
          <pizza-view
            @add-item="addItem"
            @add-drop-item="addDropElement"
            @submit="submit"
          />
        </div>
      </form>
    </main>
  </div>
</template>

<script>
import DoughSelector from "@/modules/builder/DoughSelector";
import IngredientsSelector from "@/modules/builder/IngredientsSelector";
import SizeSelector from "@/modules/builder/SizeSelector";
import SaucesSelector from "@/modules/builder/SaucesSelector";
import PizzaView from "@/modules/builder/PizzaView";
import { uniqueId, cloneDeep } from "lodash";
import { mapGetters, mapState } from "vuex";

export default {
  name: "Index.vue",
  components: {
    DoughSelector,
    IngredientsSelector,
    SizeSelector,
    SaucesSelector,
    PizzaView,
  },
  data() {
    return {
      previewKey: 0,
      ingredients: [],
      id: this.$route.params.id,
    };
  },

  computed: {
    ...mapGetters(["getPizza"]),
    ...mapState({
      pizza: (state) => state.builder.pizza,
      components: (state) => state.builder.components,
    }),
  },

  mounted() {
    this.ingredients = this.components.ingredients;

    if (this.id) {
      let changedPizza = this.getPizza(parseInt(this.id));

      if (!changedPizza) {
        this.$router.push("/");
        return;
      }

      this.$store
        .dispatch("setDefault", this.getPizza(parseInt(this.id)))
        .then(() => {
          this.previewKey++;
        });
    } else {
      this.$store.dispatch("setDefault", false).then(() => {
        this.previewKey++;
      });
      this.ingredients.forEach((ingredient) => {
        this.$set(ingredient, "quantity", 0);
      });
    }
  },

  methods: {
    addItem(item, type) {
      this.$store.dispatch("updatePizza", { item, type });
    },

    addDropElement(index) {
      this.$store.dispatch(
        "increaseNumberIngredients",
        this.components.ingredients[index]
      );
    },

    manualChange(payload) {
      this.$store.dispatch("manualChangeIngredients", payload);
    },
    increaseNumber(payload) {
      this.$store.dispatch("increaseNumberIngredients", payload);
    },
    reduceNumber(payload) {
      this.$store.dispatch("reduceNumberIngredients", payload);
    },

    submit(order) {
      if (this.$route.params.id) {
        this.$router.push("/cart");
      } else {
        order.id = parseInt(uniqueId());
        this.$store
          .dispatch("addProduct", { item: cloneDeep(order), field: "products" })
          .then(() => {
            this.$router.push("/cart");
            this.$store.dispatch("clearPizza");
          });
      }
    },
  },
};
</script>
