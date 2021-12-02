import { sumBy } from "lodash";

export default {
  state: {
    products: [],
    additional_products: [],
    order_info: {
      street: "",
      house: "",
      apartment: "",
      phone: "",
      receiving: "Заберу сам",
    },
  },

  getters: {
    getPizza: (state) => (id) => {
      return state.products.find((product) => product.id === id);
    },

    totalPrice(state) {
      return (
        sumBy(state.products, (pizza) => pizza.total_price) +
        sumBy(state.additional_products, (product) => product.total_price)
      );
    },
  },

  mutations: {
    addProduct(state, payload) {
      payload.item.quantity = 1;
      payload.item.total_price = payload.item.price * payload.item.quantity;
      state[payload.field].push(payload.item);
    },

    increaseNumber(state, payload) {
      state[payload.field][payload.index].quantity++;
    },

    reduceNumber(state, payload) {
      let product = state[payload.field][payload.index];

      product.quantity--;

      if (payload.field === "products") {
        if (product.quantity === 0) {
          state[payload.field] = state[payload.field].filter(
            (item) => item.id !== product.id
          );
        }
      }
    },
    manualChange(state, payload) {
      state[payload.field][payload.index].quantity = parseInt(payload.quantity);
      if (state[payload.field][payload.index].quantity > 20) {
        state[payload.field][payload.index].quantity = 20;
      } else if (state[payload.field][payload.index].quantity < 1) {
        state[payload.field][payload.index].quantity = 0;
      }
    },

    priceUpdate(state, payload) {
      let pizza = state[payload.field][payload.index];
      if (pizza) {
        pizza.total_price = pizza.price * pizza.quantity;
      }
    },
  },

  actions: {
    addProduct({ commit }, payload) {
      commit("addProduct", payload);
    },

    priceUpdate({ commit }, payload) {
      commit("priceUpdate", payload);
    },

    increaseNumber({ commit }, payload) {
      commit("increaseNumber", payload);
      commit("priceUpdate", payload);
    },

    reduceNumber({ commit }, index) {
      commit("reduceNumber", index);
      commit("priceUpdate", index);
    },

    manualChange({ commit }, payload) {
      commit("manualChange", payload);
      commit("priceUpdate", payload);
    },
  },
};
