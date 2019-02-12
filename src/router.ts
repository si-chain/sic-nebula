/*
 * @Author: jhd
 * @Date: 2019-01-14 11:25:08
 * @Description: fouter file
 */
import Vue from 'vue'
import Router, { RouteConfig, Route } from 'vue-router'
Vue.use(Router)

const AddTask = () => import(/* webpackChunkName: "AddTask" */ './views/TeamInsurance/AddTask.vue')
const AddRules = () => import(/* webpackChunkName: "AddRules" */ './views/TeamInsurance/AddRules.vue')
const DataUserList = () => import(/* webpackChunkName: "release" */ './views/TeamInsurance/UserList.vue')
const Layout = () => import(/* webpackChunkName: "index" */ './layout/index.vue')
const Center = () => import(/* webpackChunkName: "Center" */ './views/data/Center.vue')
const Login = () => import(/* webpackChunkName: "login" */ './views/login.vue')
const TeamInsurCenter = () => import(/*webpackChunkName: "TeamInsurance" */ './views/TeamInsurance/Center.vue')
const routers: RouteConfig[] = [
  {
    path: '/data',
    name: '概况',
    meta: { leaf: 1, icon: 'icon-home', show: true},
    component: Layout,
    children: [
      {
        path: '/data-center',
        component: Center,
        name: '数据中心',
        meta: { requireAuth: true, leaf: 2, show: true }
      },
      {
        path: '/data-analysis',
        component: TeamInsurCenter,
        name: '数据分析',
        meta: { requireAuth: true, leaf: 2, show: true }
      },
      {
        path: '/add-analysis-task',
        component: AddTask,
        name: '添加任务',
        meta: { requireAuth: true, leaf: 2, show: false }
      },
      {
        path: '/data-user-list',
        component: DataUserList,
        name: '用户列表',
        meta: { requireAuth: true, leaf: 2, show: false }
      },
      {
        path: '/add-analysis-rules',
        component: AddRules,
        name: '添加规则',
        meta: { requireAuth: true, leaf: 2, show: false }
      }
    ]
  },
  {
    path: '/tuanxian',
    name: '团险',
    meta: { leaf: 1, icon: 'icon-user', show: true },
    component: Layout
  },
  {
    path: '/gexian',
    name: '个险',
    meta: { leaf: 1, icon: 'icon-user', show: true },
    component: Layout
  },
  {
    path: '/gexian',
    name: '车险',
    meta: { leaf: 1, icon: 'icon-user', show: true },
    component: Layout
  },
  {
    path: '/login',
    name: 'login',
    meta: { leaf: 1, show: false },
    component: Login
  }
]
const router: Router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routers
})

router.beforeEach((to: Route, from: Route, next: any): void => {
  if (to.fullPath === '/') {
    next({
      path: '/data-center'
    })
  }
  next()
})
export default router
