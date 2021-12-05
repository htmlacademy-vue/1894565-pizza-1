import Vue from "vue";
import App from "./App.vue";
import vuexPlugins from "./plugins/vuexPlugins.js";

Vue.config.productionTip = false;
Vue.use(vuexPlugins);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
