//引入路由插件
import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'

//引入token
import { API_token } from "@/api/apis"

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        { path: '/', name: "login", component: Login },
        {
            path: "/Index",
            name: "Index",
            component: () => import('../pages/Index.vue'),
            children: [
                { path: "/Index/home", name: "home", component: () => import("../pages/index/Home.vue") },
                { path: "/Index/Order", name: "Order", component: () => import("../pages/index/Order.vue") },
                { path: "/Index/Shop", name: "Shop", component: () => import("../pages/index/shop/Shop.vue") },
                { path: "/Index/Product-list", name: "Product-list", component: () => import("../pages/index/product/Product-list.vue") },
                { path: "/Index/Product-add", name: "Product-add", component: () => import("../pages/index/product/Product-add.vue") },
                { path: "/Index/Product-class", name: "Product-class", component: () => import("../pages/index/product/Product-class") },
                { path: "/Index/account-list", name: "account-list", component: () => import("../pages/index/account/account-list.vue") },
                { path: "/Index/account-add", name: "account-add", component: () => import("../pages/index/account/account-add.vue") },
                { path: "/Index/change-pass", name: "change-pass", component: () => import("../pages/index/account/change-pass.vue") },
                { path: "/Index/commodity-stati", name: "commodity-stati", component: () => import("../pages/index/stati/commodity-stati.vue") },
                { path: "/Index/Order-stati", name: "Order-stati", component: () => import("../pages/index/stati/Order-stati.vue") },
                { path: "/Index/Personal", name: "Personal", component: () => import("../pages/index/account/Personal.vue") },
            ]
        },
    ]
})
export default router
//路由拦截
router.beforeEach((to, from, next) => {
    from
    //如果不在首页
    if (to.path != "/") {
        // console.log(to.path)//即将进入的目标对象路由
        // console.log(from.path)//离开的路由
        //调用token接口判断是否在登录状态
        API_token(localStorage.token).then(res => {
            console.log(res)
            if (res.data.code == 0) {
                next()//如果在登录状态就放行
            }else{
                next("/")//如果不在登录状态就跳转到首页
            }
        })
    } else {

        next()//放行
    }
})