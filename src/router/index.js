import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// 导入管理员和用户的组件
import ManagerIndexView from '@/views/manager/ManagerIndexView.vue';
import ManagerListView from '@/views/manager/ManagerListView.vue';
import UserListView from '@/views/manager/UserListView.vue';

// 导入轮播图组件
import BannerIndexView from '@/views/banner/BannerIndexView.vue';
import BannerListView from '@/views/banner/BannerListView.vue';
import AddBannerView from '@/views/banner/AddBannerView.vue';

// 导入产品管理组件
import ProIndexView from '@/views/pro/ProIndexView.vue';
import ProListView from '@/views/pro/ProListView.vue';
import AddProView from '@/views/pro/AddProView.vue';

// 导入图表管理组件
import EchartsIndexView from '@/views/echarts/EchartsIndexView.vue';
import EchartsShowView from '@/views/echarts/EchartsShowView.vue';
import EchartsView from '@/views/echarts/EchartsView.vue';


// 导入excel组件
import ExcelIndexView from '@/views/excel/ExcelIndexView.vue';
import ExcelImportView from '@/views/excel/ExcelImportView.vue';
import ExcelExportView from '@/views/excel/ExcelExportView.vue';

// 富文本管理组件
import EditorIndexView from '@/views/editor/EditorIndexView.vue';
import EditorShowView from '@/views/editor/EditorShowView.vue';

// 地图组件
import MapIndexView from '@/views/map/MapIndexView.vue';
import MapShowView from '@/views/map/MapShowView.vue';

// 路由规则配置
export const routes = [
  {
    // 访问时的路径
    path: '/',

    // 命名路由
    name: 'home',
    label: '首页',

    // 当访问到对应路由后需要展示的组件
    component: HomeView,
    // 路由嵌套，配置二级路由
    children:[
      {
        path: 'manager',
        name: 'manager',
        label: '账号管理',
        component: ManagerIndexView,
        // 配置三级路由
        children: [
          {
            path:'managerlist',
            name: 'managerlist',
            label: '管理员列表',
            component: ManagerListView
          },
          {
            path:'userlist',
            name: 'userlist',
            label: '用户列表',
            component: UserListView
          }
        ]
      },
      {
        path: 'banner',
        name: 'banner',
        label: '轮播图管理',
        component: BannerIndexView,
        // 配置三级路由
        children: [
          {
            path:'bannerlist',
            name: 'bannerlist',
            label: '轮播图列表',
            component: BannerListView
          },
          {
            path:'addbanner',
            name: 'addbanner',
            label: '添加轮播图',
            component: AddBannerView
          }
        ]
      },
      {
        path: 'pro',
        name: 'pro',
        label: '产品管理',
        component: ProIndexView,
        // 配置三级路由
        children: [
          {
            path:'prolist',
            name: 'prolist',
            label: '产品列表',
            component: ProListView
          },
          {
            path:'addpro',
            name: 'addpro',
            label: '添加产品',
            component: AddProView
          }
        ]
      },
      {
        path: 'echarts',
        name: 'echarts',
        label: '图表管理',
        component: EchartsIndexView,
        // 配置三级路由
        children: [
          {
            path:'echartsshow',
            name: 'echartsshow',
            label: '图表显示',
            component: EchartsShowView
          },
          {
            path:'echartsview',
            name: 'echartsview',
            label: '仪表显示',
            component: EchartsView
          }
        ]
      },
      {
        path: 'excel',
        name: 'excel',
        label: 'excel管理',
        component: ExcelIndexView,
        // 配置三级路由
        children: [
          {
            path:'excelimport',
            name: 'excelimport',
            label: 'excel导入',
            component: ExcelImportView
          },
          {
            path:'excelexport',
            name: 'excelexport',
            label: 'excel导出',
            component: ExcelExportView
          }
        ]
      },
      {
        path: 'editor',
        name: 'editor',
        label: '富文本管理',
        component: EditorIndexView,
        // 配置三级路由
        children: [
          {
            path:'editorshow',
            name: 'editorshow',
            label: '富文本显示',
            component: EditorShowView
          }
        ]
      },
      {
        path: 'map',
        name: 'map',
        label: '地图管理',
        component: MapIndexView,
        // 配置三级路由
        children: [
          {
            path:'mapshow',
            name: 'mapshow',
            label: '地图显示',
            component: MapShowView
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/LoginView.vue')
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
