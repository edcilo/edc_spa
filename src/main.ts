import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import "./registerServiceWorker";
import i18n from "./lang";
import router from "./router";
import store from "./store";

import "./filters";
import "./directives";

Vue.config.productionTip = false;
Vue.use(Vuelidate);

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
