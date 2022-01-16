import Vue from "vue";
import Vuex from "vuex";
//import { uniqueId } from "lodash";
import VuexPlugins from "@/plugins/vuexPlugins";
import cart from "./modules/cart";
import builder from "./modules/builder";
import auth from "./modules/auth";
import orders from "./modules/orders";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    cart: cart,
    builder: builder,
    auth: auth,
    orders: orders,
  },
  plugins: [VuexPlugins],
});
