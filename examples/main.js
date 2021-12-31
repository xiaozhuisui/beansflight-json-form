import Vue from "vue"
import App from "./App.vue"
import "view-design/dist/styles/iview.css"
import beansflightJSONFORM from "../packages"

import enumInfo from "./constants/index"
import Enum from "vue-enum"

Vue.config.productionTip = false

Vue.use(beansflightJSONFORM)

Vue.prototype.$enum = Enum

Vue.use(Enum, { enumInfo })

new Vue({
  render: (h) => h(App),
}).$mount("#app")
