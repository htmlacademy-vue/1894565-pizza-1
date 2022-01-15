<template>
  <div>
    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper" :key="previewKey">
          <h1 class="title title--big">Конструктор пиццы</h1>
          <dough-selector
            :doughs="doughs"
            :selected="pizza.dough"
            @add-item="addItem"
          />
          <size-selector
            :sizes="sizes"
            :selected="pizza.size"
            @add-item="addItem"
          />
          <ingredients-selector
            v-if="ingredients"
            :ingredients="ingredients"
            @add-items="addItem"
            @manual-change="manualChange"
            @increase-number="increaseNumber"
            @reduce-number="reduceNumber"
          >
            <sauces-selector
              :sauces="sauces"
              :selected="pizza.sauce"
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
      id: this.$route.params.id,
    };
  },

  computed: {
    ...mapGetters(["getPizza"]),
    ...mapState({
      pizza: (state) => state.builder.pizza,
      ingredients: (state) => state.builder.components.ingredients,
      doughs: (state) => state.builder.components.doughs,
      sizes: (state) => state.builder.components.sizes,
      sauces: (state) => state.builder.components.sauces,
    }),
  },

  mounted() {
    this.loadComponents();
  },

  methods: {
    loadComponents() {
      let changedPizza = {};
      if (this.id) {
        changedPizza = this.getPizza(parseInt(this.id));

        if (!changedPizza) {
          this.$router.push("/");
        }
      }
      this.$store.dispatch("loadComponents", changedPizza).then(() => {
        this.previewKey++;
      });
    },

    addItem(item, type) {
      this.$store.dispatch("updatePizza", { item, type });
    },

    addDropElement(index) {
      this.$store.dispatch("increaseNumberIngredients", index);
    },

    manualChange(payload) {
      this.$store.dispatch("manualChangeIngredients", payload);
    },
    increaseNumber(index) {
      this.$store.dispatch("increaseNumberIngredients", index);
    },
    reduceNumber(index) {
      this.$store.dispatch("reduceNumberIngredients", index);
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
