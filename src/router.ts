/*
 * @Author: jhd
 * @Date: 2019-01-14 11:25:08
 * @Description: fouter file
 */
import Vue from 'vue'
import Router, { RouteConfig, Route } from 'vue-router'
Vue.use(Router)

const TeamManage = () => import(/* webpackChunkName: "AddTask" */ './views/teamManage.vue')
const CustomManage = () => import(/* webpackChunkName: "AddRules" */ './views/customManage.vue')
const DataUserList = () => import(/* webpackChunkName: "userlist" */ './views/TeamInsurance/UserList.vue')
const Layout = () => import(/* webpackChunkName: "index" */ './layout/index.vue')
const Center = () => import(/* webpackChunkName: "Center" */ './views/data/Center.vue')
const Login = () => import(/* webpackChunkName: "login" */ './views/login.vue')
const TeamInsurCenter = () => import(/*webpackChunkName: "TeamInsurance" */ './views/TeamInsurance/Center.vue')
const UserCenter = () => import(/*webpackChunkName: "UserCenter" */ './views/user/Center.vue')
const CarCenter = () => import(/*webpackChunkName: "CarCenter" */ './views/car/Center.vue')
// const About = () => import(/*webpackChunkName: "TeamInsurance" */ './views/About.vue')
const routers: RouteConfig[] = [
  {
    path: '/data',
    name: '概况',
    meta: { leaf: 1, icon: 'icon-home', show: true, type: '1', title: '智能工作台-运营端'},
    component: Layout,
    children: [
      {
        path: '/data/data-center',
        component: Center,
        name: '数据概览',
        meta: { requireAuth: true, leaf: 2, show: true, title: '智能工作台-运营端' }
      }
    ]
  },
  {
    path: '/team',
    name: '团险',
    meta: { leaf: 1, icon: 'icon-card-insure', show: true, type: '1', title: '智能工作台-运营端' },
    component: Layout,
    children: [
      {
        path: '/team/data-analysis',
        component: TeamInsurCenter,
        name: '团险分析',
        meta: { requireAuth: true, leaf: 2, show: true, title: '智能工作台-运营端' }
      },
      {
        path: 'https://s.17doubao.com/analysis/customer',
        component: TeamInsurCenter,
        name: '团体客户',
        meta: { requireAuth: true, leaf: 2, show: true, isLink: true, title: '智能工作台-运营端'}
      }
    ]
  },
  {
    path: '/user',
    name: '个险',
    meta: { leaf: 1, icon: 'icon-user', show: true, type: '1', title: '智能工作台-运营端' },
    component: Layout,
    children: [
      {
        path: '/user/data-analysis',
        component: UserCenter,
        name: '个险分析',
        meta: { requireAuth: true, leaf: 2, show: true, title: '智能工作台-运营端' }
      },
      {
        path: 'https://s.17doubao.com/customer/manage',
        component: TeamInsurCenter,
        name: '个人客户',
        meta: { requireAuth: true, leaf: 2, show: true, isLink: true, title: '智能工作台-运营端' }
      }
    ]
  },
  {
    path: '/car',
    name: '车险',
    meta: { leaf: 1, icon: 'icon-car', show: true, type: '1', title: '智能工作台-运营端' },
    component: Layout,
    children: [
      {
        path: '/car/data-analysis',
        component: CarCenter,
        name: '车险分析',
        meta: { requireAuth: true, leaf: 2, show: true, title: '智能工作台-运营端' }
      }
    ]
  },
  {
    path: '/data/team-center',
    name: '首页',
    meta: { leaf: 1, icon: 'icon-home', show: true, type: '2', title: '智能工作台-派发端 ' },
    component: Layout,
    children: [
      {
        path: '/data/team-center',
        component: TeamManage,
        name: '任务下发',
        meta: { requireAuth: true, leaf: 2, show: true, title: '智能工作台-派发端 ' }
      }
    ]
  },
  {
    path: '/data/custom-center',
    name: '首页',
    meta: { leaf: 1, icon: 'icon-home', show: true, type: '3', title: '智能工作台-任务端 ' },
    component: Layout,
    children: [
      {
        path: '/data/custom-center',
        component: CustomManage,
        name: '个人中心',
        meta: { requireAuth: true, leaf: 2, show: true, title: '智能工作台-任务端 ' }
      }
    ]
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
  base: 'ai',
  routes: routers
})

router.beforeEach((to: Route, from: Route, next: any): void => {
  switch (to.query.type) {
    case '1':
      window.localStorage.setItem('USERTYPE', '1')
      break
    case '2':
      window.localStorage.setItem('USERTYPE', '2')
      break
    case '3':
      window.localStorage.setItem('USERTYPE', '3')
      break
    default:
      next()
      break
  }
  if (to.path === '/') {
    next({
      path: '/data'
    })
  }
  if (to.meta.title) {
    document.title = `${to.meta.title}`
  }
  next()
})
export default router
