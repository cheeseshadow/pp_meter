import VueI18n from "vue-i18n";
import Vue from "vue";

Vue.use(VueI18n)

const messages = {
    en: {}
}

export default new VueI18n({
    silentTranslationWarn: true,
    locale: 'en',
    messages
})