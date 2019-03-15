import { ActionTree, MutationTree, GetterTree } from 'vuex'
import httpservice from '../../api'
import { removeConfigure } from '@/api/hr';

interface IState {
  companyInfo: any
  mpConfig: any
  users: any[]
}

const state: IState = {
  companyInfo: {},
  mpConfig: {},
  users: []
}

const mutations: MutationTree<IState> = {
  'SET_USERS' (state: IState, user: any[]) {
    state.users = user
  }
}
const actions: ActionTree<IState, any> = {
  // 获取结构信息
  async getGroupInfo ({}, payload) {
    const data = await httpservice.getGroupInfo(payload)
    return data
  },
  // 更新机构信息
  async updateGroupInfo ({}, payload) {
    const data = await httpservice.updateGroupInfo({...payload})
    return data
  },
  // 获取配置
  async getMpConfigs ({}, payload) {
    const data = await httpservice.getMpConfigList({...payload})
    return data
  },
  // 获取单个配置
  async getMpConfig ({}, payload) {
    const data = await httpservice.getMpConfig(payload)
    return data
  },
  // 添加单一key配置
  async addConfigure ({}, payload) {
    const data = await httpservice.addConfigure({...payload})
    return data
  },
  // 更新单一key配置
  async putConfigure ({}, payload) {
    const data = await httpservice.putConfigure({...payload})
    return data
  },
  // 添加配置 相同key
  async addConfigures ({}, payload) {
    const data = await httpservice.addConfigures({...payload})
    return data
  },
  // 更新配置 相同key
  async putConfigures ({}, payload) {
    const data = await httpservice.putConfigures({...payload})
    return data
  },
  // 删除配置
  async removeConfigure ({}, payload) {
    const data = await httpservice.removeConfigure(payload)
    return data
  },
  // 上传 excel
  async UploadUserExcel ({}, payload) {
    const data = await httpservice.UploadUserExcel({...payload})
    return data
  },
  async getUserList ({commit}, payload) {
    const data = await httpservice.getUserList({...payload})
    if (data.errcode === 200) commit('SET_USERS', data.data)
    return data
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
