import VueRouter from 'vue-router'
import Login from '@/components/Login.vue'
import Lobby from '@/components/Lobby.vue'

const routes = [
    {path: '/login', component: Login},
    {name: 'lobby', path: '/lobby/:username', component: Lobby, props: true},
    {path: '*', redirect: '/login'}
]

const router = new VueRouter({mode: 'history', routes})

export default router