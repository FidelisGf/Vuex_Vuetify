
import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Guard from "../middleware/middleware"
import Check from "../middleware/userMiddleware"
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    beforeEnter: Guard.auth,
    component: HomeView,
    children: [
      {
        path: '/pedidos',
        name: 'pedidos',
        beforeEnter: Check.checkIfUserHasEmpresa,
        component: () => import(/* webpackChunkName: "about" */ '../views/PedidoView.vue')
      },
      {
        path: '/products',
        name: 'products',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        beforeEnter: Guard.auth,
        component: () => import(/* webpackChunkName: "about" */ '../views/ProductView.vue')
      },
      {
        path: '/empresa',
        name: 'empresa',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        beforeEnter: Guard.auth,
        component: () => import(/* webpackChunkName: "about" */ '../views/EmpresaView.vue')
      },
      {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
      }
    ]
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "about" */ '../views/RegisterView.vue')
  },
  {
    path: '/login',
    name: 'login',
    
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  },
 
 
 
  
]

const router = new VueRouter({
  routes
})

  
export default router
