import { sumBy } from "lodash";
import { calculateCostOfPizza } from "@/common/pricePizza.js";
import router from "../../router";
export default {
  state: {
    products: [],
    additional_products: [],
    order_info: {
      street: "",
      building: "",
      flat: "",
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
        sumBy(state.products, (pizza) => pizza.price * pizza.quantity) +
        sumBy(
          state.additional_products,
          (product) => product.price * product.quantity
        )
      );
    },
  },

  mutations: {
    addProduct(state, payload) {
      if (!payload.item.id) {
        payload.item.quantity = 1;
      }

      if (payload.field === "products") {
        payload.item.price = calculateCostOfPizza(payload.item);
      }

      payload.item.total_price = payload.item.price * payload.item.quantity;
      if (payload.field === "products") {
        state.products.push(payload.item);
      }

      if (payload.field === "additional_products") {
        state.additional_products = payload.item;
      }
    },

    loadMisc(state, payload) {
      state.additional_products = payload.map((item) => {
        return {
          ...item,
          quantity: 0,
        };
      });
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

    setDelivery(state, payload) {
      state.order_info = payload;
    },

    sendOrder(state, payload) {
      let misc = state.additional_products.map((item) => {
        return {
          miscId: item.id,
          quantity: item.quantity,
        };
      });

      state.additional_products.forEach((el) => {
        el.quantity = 0;
      });

      let pizzas = [];
      state.products.forEach((product) => {
        let pizza = {};
        (pizza.name = product.title),
          (pizza.quantity = product.quantity),
          (pizza.sauceId = product.sauce.id),
          (pizza.doughId = product.dough.id),
          (pizza.sizeId = product.size.id),
          (pizza.ingredients = product.ingredients.map((ingredient) => {
            return {
              ingredientId: ingredient.id,
              quantity: ingredient.quantity,
            };
          }));
        pizzas.push(pizza);
      });

      let address = {};

      if (state.order_info.id === "new_address") {
        address.street = state.order_info.street;
        address.building = state.order_info.building;
        address.flat = state.order_info.flat;
        address.comment = state.order_info.comment || "";
      } else if (state.order_info.id && state.order_info.id === "pickup") {
        address = null;
      } else {
        address.id = state.order_info.id;
      }

      this.dispatch("submitOrder", {
        userId: payload,
        phone: state.order_info.phone,
        misc,
        pizzas,
        address,
      });
    },

    cleanCart(state) {
      state.products = [];
    },
  },

  actions: {
    addProduct({ commit }, payload) {
      commit("addProduct", payload);
    },

    submitOrder({ commit }, payload) {
      this.$api.pizza.addOrder(payload).then(() => {
        commit("cleanCart");
        router.push("/thanks-order").then(() => {});
      });
    },

    loadMisc({ commit }) {
      this.$api.pizza.misc().then((res) => commit("loadMisc", res.data));
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

    setDelivery({ commit }, payload) {
      commit("setDelivery", payload);
    },

    sendOrder({ commit }, payload) {
      commit("sendOrder", payload);
    },

    cleanCart({ commit }) {
      commit("cleanCart");
    },
  },
};
