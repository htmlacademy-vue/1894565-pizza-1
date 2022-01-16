export default {
  state: {
    orders: [],
  },

  getters: {},

  mutations: {
    getOrders(state) {
      this.$api.orders.getOrders().then((res) => {
        state.orders = res;
      });
    },
  },

  actions: {
    getOrders({ commit }) {
      commit("getOrders");
    },
  },
};
