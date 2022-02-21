import jwt from "../../services/jwt.service";
import router from "../../router";
import { uniqueId } from "lodash";

export default {
  state: {
    me: {},
    addresses: [],
  },

  getters: {},

  mutations: {
    login(state, payload) {
      state.me = payload;
      router.push("/").then(() => {});
    },

    logout(state) {
      state.me = {};
      router.push("/login").then(() => {});
    },

    me(state, payload) {
      state.me = payload;
    },

    addresses(state, payload) {
      state.addresses = payload;
    },

    addAddress(state, payload) {
      payload.id = uniqueId();
      state.addresses.push(payload);
    },

    editAddress(state, payload) {
      let index = state.addresses.findIndex((item) => item.id === payload.id);
      state.addresses[index] = payload;
    },

    deleteAddress(state, id) {
      state.addresses = state.addresses.filter((address) => address.id !== id);
    },
  },

  actions: {
    login({ commit }, payload) {
      this.$api.auth.login(payload).then((res) => {
        jwt.saveToken(res.token);
        this.$api.auth.setAuthHeader();
        this.$api.auth.getMe().then((res) => {
          commit("login", res);
        });
      });
    },

    logout({ commit }) {
      this.$api.auth.setAuthHeader();
      this.$api.auth.logout().then(() => {
        jwt.destroyToken();
        commit("logout");
      });
    },

    me({ commit }) {
      this.$api.auth.setAuthHeader();
      this.$api.auth.getMe().then((res) => {
        commit("me", res);
      });
    },

    addresses({ commit }) {
      if (jwt.getToken()) {
        this.$api.auth.setAuthHeader();
        this.$api.profile.addresses().then((res) => {
          commit("addresses", res.data);
        });
      }
    },

    createAddress({ commit }, payload) {
      this.$api.auth.setAuthHeader();
      this.$api.profile.addAddress(payload).then((res) => {
        commit("addAddress", res.data);
      });
    },

    deleteAddress({ commit }, payload) {
      this.$api.profile.deleteAddress(payload).then(() => {
        commit("deleteAddress", payload);
      });
    },

    editAddress({ commit }, payload) {
      this.$api.profile.updateAddress(payload).then(() => {
        commit("editAddress", payload);
      });
    },

    switchEditModeAddresses({ commit }, index) {
      commit("switchEditModeAddresses", index);
    },
  },
};
