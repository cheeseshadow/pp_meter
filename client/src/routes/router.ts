import VueRouter from 'vue-router'
import Login from '@/components/Login.vue'
import Room from '@/components/Room.vue'

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { name: 'room', path: '/room/:user', component: Room, props: true }
]

const router = new VueRouter({ mode: 'history', routes })

router.beforeEach((to, from, next) => {

    // console.log('to', to)
    // console.log('from', from)

    // console.log(document.cookie)

    next()
})

export default router