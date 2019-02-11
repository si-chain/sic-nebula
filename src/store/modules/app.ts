/*
 * @Author: jhd
 * @Date: 2019-01-15 11:31:50
 * @Description: app store file
 */
// import Vue from 'vue'
import Cookies from 'js-cookie'
import { ActionTree, MutationTree } from 'vuex'

interface ISidebar {
  opend: boolean
  withoutAnimation: boolean
}
interface IState {
  sidebar: ISidebar
  device: string
  router: object
  submenu: object[]
}
const state: IState = {
  sidebar: {
    opend: !+Cookies.get('sidebarStatus'),
    withoutAnimation: false
  },
  device: 'desktop',
  router: {},
  submenu: []
}
const mutations: MutationTree<IState> = {
  'TOGGLE_SIDEBAR' (state: IState): void {
    if (state.sidebar.opend) {
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
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
