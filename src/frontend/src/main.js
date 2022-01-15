import Vue from "vue";
import App from "./App.vue";
import vuexPlugins from "./plugins/vuexPlugins";
import router from "./router";
import store from "@/store";

Vue.use(vuexPlugins);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
