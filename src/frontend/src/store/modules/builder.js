import { isEmpty } from "lodash";
export default {
  state: {
    components: {
      ingredients: [],
      doughs: [],
      sizes: [],
      sauces: [],
    },
    pizza: {
      title: "",
      size: {},
      dough: {},
      sauce: {},
      ingredients: [],
      price: 0,
      quantity: 1,
    },
  },

  mutations: {
    updatePizza(state, payload) {
      state.pizza[payload.type] = payload.item;
    },

    setPizza(state, payload) {
      state.pizza = payload;
    },

    clearPizza(state) {
      state.pizza = {
        title: "",
        size: {},
        dough: {},
        sauce: {},
        ingredients: [],
        price: 0,
        quantity: 1,
      };
    },

    increaseNumberIngredients(state, index) {
      let ingredient = state.components.ingredients[index];
      ingredient.quantity++;
      let addedIngredient = state.pizza.ingredients.find(
        (item) => item.id === ingredient.id
      );
      if (addedIngredient) {
        addedIngredient = ingredient;
      } else {
        state.pizza.ingredients.push(ingredient);
      }
    },

    reduceNumberIngredients(state, index) {
      let ingredient = state.components.ingredients[index];
      ingredient.quantity--;
      if (ingredient.quantity === 0) {
        state.pizza.ingredients = state.pizza.ingredients.filter(
          (elem) => elem.id !== ingredient.id
        );
      }
    },

    manualChangeIngredients(state, payload) {
      let ingredient = state.components.ingredients[payload.index];
      ingredient.quantity = parseInt(payload.value);
      if (ingredient.quantity < 0) {
        ingredient.quantity = 0;
      } else if (ingredient.quantity > 3) {
        ingredient.quantity = 3;
      }
      let addedIngredient = state.pizza.ingredients.find(
        (item) => item.id === ingredient.id
      );
      if (addedIngredient) {
        addedIngredient = ingredient;
      } else {
        state.pizza.ingredients.push(ingredient);
      }
    },

    loadIngredients(state, payload) {
      state.components.ingredients = payload.map((item) => {
        return { ...item, quantity: 0 };
      });
    },
    loadSizes(state, payload) {
      state.components.sizes = payload;
    },
    loadSauces(state, payload) {
      state.components.sauces = payload;
    },
    loadDough(state, payload) {
      state.components.doughs = payload;
    },

    setDefault(state, payload) {
      if (!isEmpty(payload)) {
        state.pizza = payload;

        state.components.ingredients.forEach((ingredient, index) => {
          let el = state.pizza.ingredients.find(
            (item) => item.id === ingredient.id
          );
          if (el) {
            state.components.ingredients[index] = el;
          }
        });

        // state.components.ingredients[0] = state.pizza.ingredients[0];
      } else {
        if (!state.pizza.id) {
          state.pizza.dough = state.components.doughs[0];
          state.pizza.size = state.components.sizes[0];
          state.pizza.sauce = state.components.sauces[0];
        }
      }
    },
  },

  actions: {
    async loadComponents({ commit }, payload) {
      await this.$api.pizza
        .ingredients()
        .then((res) => commit("loadIngredients", res.data));
      await this.$api.pizza
        .sizes()
        .then((res) => commit("loadSizes", res.data));
      await this.$api.pizza
        .sauces()
        .then((res) => commit("loadSauces", res.data));
      await this.$api.pizza
        .dough()
        .then((res) => commit("loadDough", res.data));
      commit("clearPizza");
      commit("setDefault", payload);
    },

    updatePizza({ commit }, payload) {
      commit("updatePizza", payload);
    },

    manualChangeIngredients({ commit }, payload) {
      commit("manualChangeIngredients", payload);
    },

    increaseNumberIngredients({ commit }, payload) {
      commit("increaseNumberIngredients", payload);
    },

    reduceNumberIngredients({ commit }, payload) {
      commit("reduceNumberIngredients", payload);
    },

    setPizza({ commit }, payload) {
      commit("setPizza", payload);
    },

    clearPizza({ commit }) {
      commit("clearPizza");
    },
  },
};
