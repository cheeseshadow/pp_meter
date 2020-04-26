import Vue from 'vue'
import App from './App.vue'
import router from './routes/router'
import VModal from 'vue-js-modal'
import i18n from './i18n/i18n'

Vue.config.productionTip = false

Vue.use(VModal, {dynamic: true, injectModalsContainer: true})

new Vue({
    render: h => h(App),
    router,
    i18n
}).$mount('#app')
