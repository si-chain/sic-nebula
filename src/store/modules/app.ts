/*
 * @Author: jhd
 * @Date: 2019-01-15 11:31:50
 * @Description: app store file
 */
// import Vue from 'vue'
import Cookies from 'js-cookie'
import { ActionTree, MutationTree } from 'vuex'
import httpservice from '../../api'

interface ISidebar {
  opend: boolean
  withoutAnimation: boolean
}
interface IEvent {
  x: string
  y: number
  z: number
}
interface IState {
  sidebar: ISidebar
  device: string
  router: object
  submenu: object[]
  dailyevent: IEvent[]
  viewHeight: number
  timer: any
  subRouteName: string
  routeName: string
}
const state: IState = {
  sidebar: {
    opend: false,
    withoutAnimation: false
  },
  device: 'desktop',
  router: {},
  submenu: [],
  dailyevent: [],
  viewHeight: 700,
  timer: undefined,
  subRouteName: '',
  routeName: ''
}
const mutations: MutationTree<IState> = {
  'TOGGLE_SIDEBAR' (state: IState): void {
    console.log(state.sidebar.opend)
    if (!state.sidebar.opend) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
    state.sidebar.opend = !state.sidebar.opend
    state.sidebar.withoutAnimation = false
  },
  'CLOSE_SIDEBAR' (state: IState, withoutAnimation: boolean): void {
    Cookies.set('sidebarStatus', 1)
    state.sidebar.opend = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  'TOGGLE_DEVICE' (state: IState, device: string): void {
    state.device = device
  },
  'SET_ROUTER' (state: IState, data: object): void {
    state.router = data
  },
  'SET_SUBMENU' (state: IState, submenu: object[]): void {
    state.submenu = submenu
  },
  'SET_EVENNT' (state: IState, payload: any[]) {
    state.dailyevent = payload
  },
  'SET_VIEWHEIGHT' (state: IState, height: number) {
    state.viewHeight = height
  },
  'SET_TIMER' (state: IState, timer: any) {
    state.timer = timer
  },
  'SET_SUBROUTENAME' (state: IState , name: string) {
    state.subRouteName = name
  },
  'SET_ROUTENAME' (state: IState, name: string) {
    state.routeName = name
  }
}
const actions: ActionTree<IState, any> = {
  toggleSiderBar ({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar ({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice ({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setRouter ({ commit }, router) {
    commit('SET_ROUTER', router)
    return router
  },
  setSubMenu ({ commit }, menus) {
    commit('SET_SUBMENU', menus)
    return menus
  },
  async getDailyEvent ({ commit }): Promise<any> {
    const res: Ajax.AjaxResponse = await httpservice.getdaily_event()
    commit('SET_EVENNT', res)
    return res
  },
  async clearIntervalTimer ({ state, commit }): Promise<any> {
    if (state.timer) {
      clearInterval(state.timer)
      commit('SET_TIMER', undefined)
    }
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
