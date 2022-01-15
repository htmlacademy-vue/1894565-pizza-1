import jwt from "../../services/jwt.service";
import router from "../../router";

export default {
  state: {
    me: {},
    addresses: [],
  },

  getters: {},

  mutations: {
    async login(state, payload) {
      this.$api.auth.login(payload).then((res) => {
        jwt.saveToken(res.token);
        this.$api.auth.setAuthHeader();
        this.$api.auth.getMe().then((res) => {
          state.me = res;
        });
        router.push("/").then(() => {});
      });
    },

    logout(state) {
      this.$api.auth.setAuthHeader();
      this.$api.auth.logout().then(() => {
        jwt.destroyToken();
        state.me = {};
        router.push("/login").then(() => {});
      });
    },

    me(state) {
      this.$api.auth.setAuthHeader();
      this.$api.auth.getMe().then((res) => {
        state.me = res;
      });
    },

    addresses(state) {
      this.$api.auth.setAuthHeader();
      this.$api.profile.addresses().then((res) => {
        state.addresses = res.data;
      });
    },

    createAddress(state, payload) {
      this.$api.auth.setAuthHeader();
      this.$api.profile.addAddress(payload).then(() => {});
    },

    deleteAddress(state, id) {
      this.$api.profile.deleteAddress(id).then(() => {});
    },

    editAddress(state, payload) {
      let data = payload;
      this.$api.profile.updateAddress(data).then(() => {});
    },
  },

  actions: {
    login({ commit }, payload) {
      commit("login", payload);
    },
    logout({ commit }) {
      commit("logout");
    },
    me({ commit }) {
      commit("me");
    },
    addresses({ commit }) {
      commit("addresses");
    },
    createAddress({ commit }, payload) {
      commit("createAddress", payload);
    },
    deleteAddress({ commit }, payload) {
      commit("deleteAddress", payload);
    },
    editAddress({ commit }, payload) {
      commit("editAddress", payload);
    },
    switchEditModeAddresses({ commit }, index) {
      commit("switchEditModeAddresses", index);
    },
  },
};
