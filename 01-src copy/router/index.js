import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// 路由规则配置
const routes = [
  {
    // 访问时的路径
    path: '/',

    // 命名路由
    name: 'home',

    // 当访问到对应路由后需要展示的组件
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue')
  }
]

const router = createRouter({
  // 配置路由模式
  history: createWebHashHistory(import.meta.env.BASE_URL),
  // 配置路由规则
  routes
})

// 导出路由
export default router
