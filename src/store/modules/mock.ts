/*
 * @Author: jhd
 * @Date: 2019-02-11 10:29:11
 * @Description: mock store file content
 */
import { ActionTree, MutationTree } from 'vuex'
import axios from 'axios'
import httpservice from '../../api'


const state = {}
const mutations: MutationTree<any> = {}
const actions: ActionTree<any, any> = {
  /**
   * @description: 本地mock数据 获取用户列表
   * @param {type} 无
   * @return: 用户列表
   */
  async getTableUsers ({ }): Promise<any> {
    const res = await axios.get('/ai/json/userlist.json')
    return res
  },
  async getUserCenterTable ({}): Promise<any> {
    const res = await axios.get('/ai/json/userCenter.json')
    return res
  },
  async getTaskRules (): Promise<any> {
    const rules = await axios.get('/ai/json/taskRules.json')
    return rules
  },
  async getDataCenter (): Promise<any> {
    const data = await axios.get('/ai/json/dataCenter.json')
    return data
  },
  async getEventLogs (): Promise<any> {
    const eventLogs = await axios.get('/ai/json/eventLogs.json')
    return eventLogs
  },
  async getAgencys ({}, payload): Promise<any> {
    const data = await httpservice.getAgencys({...payload})
    return data
  }
}
export default {
  namespaced: true,
  state,
  actions,
  mutations
}
