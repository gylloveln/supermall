import Vue from 'vue'
import VueRouter from 'vue-router' 

const  Cart = () => import("../views/shopcart/Shopcart")
const  Home = () => import("../views/home/Home")
const  Category = () => import("../views/category/Category")
const  Profile = () => import("../views/profile/Profile")
const  Detail = () => import("../views/detail/Detail")


Vue.use(VueRouter)
const routes = [
    {
        path: '',
        redirect: '/home'
      },
      {
        path: '/home',
        // 指定的组件
        component:Home
      },
      {
        path: '/cart',
        component:Cart
      },
      {
        path: '/category',
        component:Category
      },
      {
        path: '/profile',
        component:Profile
      }, 
      {
        path: '/detail/:iid',
        component:Detail
      } 
]
const router = new VueRouter({
    routes,
    mode:'history'
})

export default router