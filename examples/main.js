import Vue from "vue";
import App from "./App.vue";
import "view-design/dist/styles/iview.css";
import beansflightJSONFORM from "../packages";

Vue.config.productionTip = false;

Vue.use(beansflightJSONFORM);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
