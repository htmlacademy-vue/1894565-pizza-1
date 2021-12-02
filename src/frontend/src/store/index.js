import Vue from "vue";
import Vuex from "vuex";
//import { uniqueId } from "lodash";
import cart from "./modules/cart";
import builder from "./modules/builder";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    cart: cart,
    builder: builder,
  },
});
