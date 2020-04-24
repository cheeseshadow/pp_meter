import Vue from 'vue'
import App from './App.vue'
import router from './routes/router'
import VueRouter from 'vue-router'
import VModal from 'vue-js-modal'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VModal)

new Vue({
    render: h => h(App),
    router
}).$mount('#app')
