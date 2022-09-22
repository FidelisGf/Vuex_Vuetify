
import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)



const routes = [
  {
    path: '/home',
    name: 'home',
    
    component: HomeView
  },
  {
    path: '/',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  },
  {
    path: '/pedidos',
    name: 'pedidos',
    component: () => import(/* webpackChunkName: "about" */ '../views/PedidoView.vue')
  },
  {
    path: '/products',
    name: 'products',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ProductView.vue')
  },
  {
    path: '/empresa',
    name: 'empresa',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
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

const router = new VueRouter({
  routes
})

  

// router.beforeEach(async (to, from, next) => {
//     //const token = localStorage.getItem('token')
//     try{
//       const res = await axios.get("/auth/validateTkn")
//       if(res.data == 1){
//         // if (token || to.name === 'login') {
//         //   next()
//         // }
//         console.log(res);
//         next();
//       }else if(res.data == 'Invalido'){
//         alert('Você precisa estar logado para isso !')
//         next({name: 'login'})
//       }
//     }catch(error){
//       //console.log(error)
//     }
//   }
// );
export default router
