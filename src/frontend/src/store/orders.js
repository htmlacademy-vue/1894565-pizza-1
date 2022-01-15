export default {
  state: {
    orders: [],
  },

  getters: {},

  mutations: {
    addOrder(state, payload) {
      state.orders.push(payload);
    },
  },

  actions: {
    addOrder({ commit }, payload) {
      commit("addOrder", payload);
    },
  },
};
