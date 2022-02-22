import jwt from "../../services/jwt.service";
import { uniqueId } from "lodash";

export default {
  state: {
    me: {},
    token: "",
    addresses: [],
  },

  getters: {},

  mutations: {
    login(state, payload) {
      state.token = payload;
    },

    logout(state) {
      state.me = {};
      state.token = "";
    },

    me(state, payload) {
      state.me = payload;
    },

    addresses(state, payload) {
      state.addresses = payload;
    },

    addAddress(state, payload) {
      state.addresses.push({ ...payload, id: uniqueId() });
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
    async login({ commit }, payload) {
      const res = await this.$api.auth.login(payload);
      jwt.saveToken(res.token);
      commit("login", res);
      return res.token;
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
