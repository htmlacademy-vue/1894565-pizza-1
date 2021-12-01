import components from "@/static/pizza";

export default {
  state: {
    components: components,
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

    increaseNumberIngredients(state, payload) {
      let ingredient = state.components.ingredients.find(
        (item) => item.id === payload.id
      );
      ingredient.quantity++;

      let ingredientPizza = state.pizza.ingredients.find(
        (item) => item.id === ingredient.id
      );

      if (!ingredientPizza) {
        state.pizza.ingredients.push(ingredient);
      } else {
        ingredientPizza = ingredient;
      }
    },

    reduceNumberIngredients(state, payload) {
      let ingredient = state.components.ingredients.find(
        (item) => item.id === payload.id
      );

      if (ingredient) {
        ingredient.quantity--;
        console.log(ingredient);
        if (ingredient.quantity === 0) {
          state.pizza.ingredients = state.pizza.ingredients.filter(
            (elem) => elem.id !== ingredient.id
          );
        }
      }
    },

    manualChangeIngredients(state, index) {
      let ingredient = state.components.ingredients[index];

      if (ingredient.quantity < 0) {
        ingredient.quantity = 0;
      } else if (ingredient.quantity > 3) {
        ingredient.quantity = 3;
      }

      if (!state.pizza.ingredients.find((item) => item.id === ingredient.id)) {
        state.pizza.ingredients.push(ingredient);
      }
    },

    setDefault(state, payload) {
      if (payload) {
        state.pizza = payload;
      } else {
        state.pizza.dough = state.components.dough[0];
        state.pizza.size = state.components.sizes[0];
        state.pizza.sauce = state.components.sauces[0];
      }
    },
  },

  actions: {
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

    setDefault({ commit }, payload) {
      commit("setDefault", payload);
    },

    clearPizza({ commit }) {
      commit("clearPizza");
    },
  },
};
