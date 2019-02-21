/*
 * @Author: jhd
 * @Date: 2019-02-11 10:29:11
 * @Description: user store file content
 */
import { ActionTree, MutationTree } from 'vuex'
import httpservice from '../../api'
import axios from 'axios'
// Vue.use(Vuex)

interface IState {
  login: boolean
  userInfo: object
  token: string
  userType: string
}

const state: IState = {
  login: false,
  userInfo: {},
  token: '',
  userType: '1'
}
const mutations: MutationTree<IState> = {
  /**
   * @description: 设置登陆状态
   * @param {state} state
   * @param {flag} flag
   * @return: null
   */
  'TOGGLE_LOGOUT' (state: IState, flag: boolean): void {
    state.login = flag
  },
  /**
   * @description: 设置token
   * @param {state} state
   * @param {token} token
   * @return: null
   */
  'SET_TOKEN' (state: IState, token: string): void {
    state.token = token
    window.localStorage.setItem('AGENCY_TOKEN', token)
  },
  /**
   * @description: 设置用户信息
   * @param {state} state
   * @param {info} info
   * @return: null
   */
  'SET_USERINFO' (state: IState, info: any): void {
    state.userInfo = info
  },
  /**
   * @description: 设置用户状态
   * @param {state} state
   * @param {type} type
   * @return: null
   */
  'SET_USERTYPE' (state: IState, type: string): void {
    state.userType = type
  }
}
const actions: ActionTree<IState, any> = {
  /**
   * @description: 登陆
   * @param {type} commit
   * @return: 接口数据
   */
  async login ({ commit, dispatch }, user): Promise<Ajax.AjaxResponse> {
    const res: Ajax.AjaxResponse = await httpservice.login({ ...user })
    if (res.errcode === 200) {
      commit('TOGGLE_LOGOUT', true)
      commit('SET_TOKEN', res.data.token)
      dispatch('getUserInfo')
    } else {
      commit('TOGGLE_LOGOUT', false)
    }
    return res
  },
  /**
   * @description: 获取用户数据
   * @param {type} commit
   * @return: null
   */
  async getUserInfo ({commit}): Promise<any> {
    const info: any = await httpservice.getUserInfo()
    if (info.success) commit('SET_USERINFO', info.data)
    else {
      commit('SET_USERINFO', {})
      commit('TOGGLE_LOGOUT', false)
    }
  },
  async logout ({ commit }): Promise<Ajax.AjaxResponse> {
    const res = await httpservice.logout()
    commit('TOGGLE_LOGOUT', false)
    return res
  },
  /**
   * @description: 设置用户类型
   * @param {type} commit
   * @return: null
   */
  UserType ({ commit }) {
    const type = window.localStorage.getItem('USERTYPE') || '1'
    commit('SET_USERTYPE', type)
  },
  /**
   * @description: 获取用户事件列表
   * @param {type} payload 参数
   * @return: res
   */
  async getUsers ({}, payload): Promise<any> {
    const res = await httpservice.getEventUserList(payload)
    return res
  }
}
export default {
  namespaced: true,
  state,
  actions,
  mutations
}
