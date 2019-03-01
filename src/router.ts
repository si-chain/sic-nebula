/*
 * @Author: jhd
 * @Date: 2019-01-14 11:25:08
 * @Description: fouter file
 */
import Vue from 'vue'
import Router, { RouteConfig, Route } from 'vue-router'
Vue.use(Router)

const TeamManage = () => import(/* webpackChunkName: "AddTask" */ './views/teamManage/teamManage.vue')
const CustomManage = () => import(/* webpackChunkName: "AddRules" */ './views/customManage/customManage.vue')
// const DataUserList = () => import(/* webpackChunkName: "userlist" */ './views/TeamInsurance/UserList.vue')
const Layout = () => import(/* webpackChunkName: "index" */ './layout/index.vue')
const Center = () => import(/* webpackChunkName: "Center" */ './views/data/Center.vue')
const Login = () => import(/* webpackChunkName: "login" */ './views/login.vue')
const TeamInsurCenter = () => import(/*webpackChunkName: "TeamInsurance" */ './views/TeamInsurance/Center.vue')
const UserCenter = () => import(/*webpackChunkName: "UserCenter" */ './views/user/Center.vue')
const CarCenter = () => import(/*webpackChunkName: "CarCenter" */ './views/car/Center.vue')
const customHandle = () => import(/*webpackChunkName: "customHandle" */ './views/customManage/customHandle.vue')
const teamUser = () => import(/*webpackChunkName: "customHandle" */ './views/teamManage/teamUser.vue')

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
      },
      {
        path: '/data/team-user',
        component: teamUser,
        name: '我的团队',
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
      },
      {
        path: '/data/custom-handle/:type',
        component: customHandle,
        name: '客户处理',
        meta: { requireAuth: true, leaf: 2, show: true, title: '智能工作台-任务端 ' }
      }
    ]
  },
  {
    path: '/wxtool',
    name: '微信工具',
    meta: { leaf: 1, icon: 'icon-wechat', show: true, type: '4', title: '智能工作台-微信工具 ' },
    component: Layout,
    children: [
      {
        path: '/wxtool/session-list',
        component: () => import(/*webpackChunkName: "SessionList" */ './views/wechatTool/SessionList.vue'),
        name: '对话列表',
        meta: { requireAuth: true, leaf: 2, show: true, title: '智能工作台-微信工具-对话列表 ' }
      },
      {
        path: '/wxtool/session-set',
        component: () => import(/*webpackChunkName: "SessionSet" */ './views/wechatTool/SessionSet.vue'),
        name: '消息设置',
        meta: { requireAuth: true, leaf: 2, show: true, title: '智能工作台-微信工具-消息设置 ' }
      },
      {
        path: '/wxtool/marketing-strategy',
        component: () => import(/*webpackChunkName: "SessionSet" */ './views/wechatTool/marketing.vue'),
        name: '营销策略',
        meta: { requireAuth: true, leaf: 2, show: true, title: '智能工作台-微信工具-消息设置 ' }
      },
      {
        path: '/wxtool/path-analysis',
        component: () => import(/*webpackChunkName: "PathAnalysis" */ './views/wechatTool/PathAnalysis.vue'),
        name: '传播路径',
        meta: { requireAuth: true, leaf: 2, show: true, title: '智能工作台-微信工具-传播路径 ' }
      },
      {
        path: '/wxtool/kol-list',
        component: () => import(/*webpackChunkName: "PathAnalysis" */ './views/wechatTool/KOLtable.vue'),
        name: 'KOL分析',
        meta: { requireAuth: true, leaf: 2, show: true, title: '智能工作台-微信工具-KOL分析 ' }
      },
      {
        path: '/wxtool/login',
        component: () => import(/*webpackChunkName: "wechatlogin" */ './views/wechatTool/login.vue'),
        name: '托管',
        meta: { requireAuth: true, leaf: 2, show: false, title: '智能工作台-微信工具-KOL分析 ' }
      }
    ]
  },
  {
    path: '/article-manage',
    name: '文章管理',
    meta: { leaf: 1, icon: 'icon-article', show: true, type: '4', title: '智能工作台-微信工具 ' },
    component: Layout,
    children: [
      {
        path: '/article-manage/list',
        component: () => import(/*webpackChunkName: "articlelist" */ './views/article/list.vue'),
        name: '文章列表',
        meta: { requireAuth: true, leaf: 2, show: true, title: '智能工作台-文章管理 ' }
      },
      {
        path: '/article-manage/edit/:id?',
        component: () => import(/*webpackChunkName: "articleEdit" */ './views/article/articleEdit.vue'),
        name: '文章列表',
        meta: { requireAuth: true, leaf: 2, show: true, title: '智能工作台-文章详情 ' }
      }
    ]
  },
  {
    path: '/admin-manage',
    name: '中介管理',
    meta: { leaf: 1, icon: 'icon-agency', show: true, type: '4', title: '智能工作台-中介管理 ' },
    component: Layout,
    children: [
      {
        path: '/admin-manage/list',
        component: () => import(/*webpackChunkName: "adminList" */ './views/adminManage/agencyList.vue'),
        name: '中介列表',
        meta: { requireAuth: true, leaf: 2, show: true, title: '智能工作台-中介列表 ' }
      }
    ]
  },
  {
    path: '/agency-manage',
    name: '中介信息',
    meta: { leaf: 1, icon: 'icon-agency-info', show: true, type: '4', title: '智能工作台-中介管理 ' },
    component: Layout,
    children: [
      {
        path: '/agency-manage/list',
        component: () => import(/*webpackChunkName: "agencyList" */ './views/agencyManage/agencyList.vue'),
        name: '投保明细',
        meta: { requireAuth: true, leaf: 2, show: true, title: '智能工作台-投保明细 ' }
      }
    ]
  },
  {
    path: '/hr-manage',
    name: 'HR',
    meta: { leaf: 1, icon: 'icon-hr', show: true, type: '4', title: '智能工作台-HR端' },
    component: Layout,
    children: [
      {
        path: '/hr-manage/user',
        component: () => import(/*webpackChunkName: "agencyList" */ './views/HR/userList.vue'),
        name: '人员名单',
        meta: { requireAuth: true, leaf: 2, show: true, title: '智能工作台-HR端' }
      },
      {
        path: '/hr-manage/mp-config',
        component: () => import(/*webpackChunkName: "agencyList" */ './views/HR/mpconfig.vue'),
        name: '小程序配置',
        meta: { requireAuth: true, leaf: 2, show: true, title: '智能工作台-HR端' }
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
  if (to.path === '/data/custom-handle/:type') {
    next({
      path: '/data/custom-handle/1'
    })
  }
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
    case '4':
      window.localStorage.setItem('USERTYPE', '4')
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
