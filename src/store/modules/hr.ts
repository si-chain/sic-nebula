import { ActionTree, MutationTree, GetterTree } from 'vuex'
import httpservice from '../../api'
import { removeConfigure } from '@/api/hr';

interface IState {
  companyInfo: any
  mpConfig: any
}

const state: IState = {
  companyInfo: {},
  mpConfig: {}
}

const mutations: MutationTree<IState> = {}
const actions: ActionTree<IState, any> = {
  // 获取配置
  async getMpConfig ({}, payload) {
    const data = await httpservice.getMpConfigList({...payload})
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
  async addConfigures ({}, payload) {
    const data = await httpservice.addConfigures({...payload})
    return data
  },
  async putConfigures ({}, payload) {
    const data = await httpservice.putConfigures({...payload})
    return data
  },
  async removeConfigure ({}, payload) {
    const data = await httpservice.removeConfigure(payload)
    return data
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
