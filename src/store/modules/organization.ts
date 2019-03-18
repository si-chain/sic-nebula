/*
 * @Author: jhd
 * @Description: 组织机构 store file content
 * @Date: 2019-03-15 16:28:32
 */
import { ActionTree, MutationTree, GetterTree } from 'vuex'
import httpservice from '../../api'
import totree from '@/utils/totree'
import cityData from '@/utils/city'


interface IState {
  organization: any
  groups: any[]
  province: string[]
}

const state: IState = {
  organization: {},
  groups: [],
  province: []
}

const getters: GetterTree<IState, any> = {
  province (state: IState) {
    return totree(state.groups)
  }
}
const mutations: MutationTree<IState> = {
  'SET_GROUPS' (state: IState, groups: any[]) {
    state.groups = groups
  },
  'SET_PROVINCE' (state: IState) {
    state.province = cityData.province
    return state.province
  }
}
const actions: ActionTree<IState, any> = {
  // 创建组织机构
  async createUserOrganization ({}, payload) {
    const data = await httpservice.organization.createUserOrganization({...payload})
    return data
  },
  // 更新组织机构
  async updateUserOrganization ({}, payload) {
    const data = await httpservice.organization.updateUserOrganization({...payload})
    return data
  },
  async deleteUserOrganization ({}, payload) {
    const data = await httpservice.organization.deleteUserOrganization({...payload})
    return data
  },
  // 获取自身及下级
  async getGroupList ({commit}) {
    const res = await httpservice.organization.getGroupList()
    res.success ? commit('SET_GROUPS', res.data) : commit('SET_GROUPS', [])
    return res
  },
  // 添加用户
  async addTeamUser ({}, payload) {
    const res = await httpservice.organization.addBrokerOutsourceStaff({...payload})
    return res
  },
  // 更新用户
  async putTeamUser ({}, payload) {
    const res = await httpservice.organization.putBrokerOutsourceStaff({...payload})
    return res
  },
  // 删除用户
  async delTeamUser ({}, payload) {
    const res = await httpservice.organization.delBrokerOutsourceStaff(payload)
    return res
  },
  // 批量删除人员
  async delTeamUsers ({ }, payload) {
    const res = await httpservice.organization.delBrokerOutsourceStaffs(payload)
    return res
  },
  async getTeamUser ({}, payload) {
    const data = await httpservice.organization.getBrokerOutsourceStaff(payload)
    return data
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
