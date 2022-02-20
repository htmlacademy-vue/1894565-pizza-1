import { cloneDeep } from "lodash";

export default {
  state: {
    orders: [],
  },

  getters: {},

  mutations: {
    getOrders(state, rootState) {
      this.$api.orders.getOrders().then((res) => {
        const orders = res;
        const components = rootState.builder.components;
        const misc = rootState.cart.additional_products;

        orders.forEach((order) => {
          console.log(order);
          const pizzas = [];
          if (order.orderPizzas) {
            order.orderPizzas.forEach((item) => {
              let pizza = {};

              pizza.sauce = components.sauces.find(
                (sauce) => sauce.id === item.sauceId
              );

              pizza.size = components.sizes.find(
                (size) => size.id === item.sizeId
              );

              pizza.dough = components.doughs.find(
                (dough) => dough.id === item.doughId
              );

              pizza.ingredients = item.ingredients.map((ingredient) => {
                const quantity = ingredient.quantity;
                ingredient = components.ingredients.find(
                  (el) => el.id === ingredient.ingredientId
                );
                ingredient.quantity = quantity;
                return ingredient;
              });

              pizza.id = item.id;
              pizza.title = item.name;
              pizza.quantity = item.quantity;
              pizzas.push(pizza);
            });
            order.orderPizzas = pizzas;
          }

          let additional_products = [];
          if (order.orderMisc) {
            order.orderMisc.forEach((product) => {
              const product_quantity = product.quantity;
              product = cloneDeep(
                misc.find((item) => item.id === product.miscId)
              );
              product.quantity = product_quantity;
              additional_products.push(product);
            });

            order.orderMisc = additional_products;
          }
        });
        state.orders = orders;
      });
    },
    deleteOrder(state, id) {
      this.$api.orders.deleteOrder(id).then(() => {
        state.orders = state.orders.filter((order) => order.id !== id);
      });
    },
  },

  actions: {
    getOrders({ commit, rootState }) {
      commit("getOrders", rootState);
    },
    deleteOrder({ commit }, id) {
      commit("deleteOrder", id);
    },
  },
};
