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
  // 1 消息汇总 2好友 3群聊
  sessionType: number
  // 用户列表
  sessionUsers: any[]
  // 聊天记录
  sessionInfos: any[]
}

const state: IState = {
  sessionType: 1,
  sessionUsers: [],
  sessionInfos: []
}
const mutations: MutationTree<IState> = {
  /**
   * @description: 设置对话类型
   */
  'TOGGLE_SESSIONTYPE' (state: IState, type: number): void {
    state.sessionType = type
  },
  /**
   * @description: 设置用户列表
   */
  'TOGGLE_SESSIONUSERS' (state: IState, user: any[]): void {
    state.sessionUsers = user
  },
  /**
   * @description: 设置聊天记录
   */
  'TOGGLE_SESSIONINFOS' (state: IState, infos: any[]): void {
    state.sessionInfos = infos
  }
}
const actions: ActionTree<IState, any> = {
  /**
   * @description: 获取用户列表
   * @param {type} commit
   * @return: 接口数据
   */
  async getSessionUsers ({ commit }): Promise<any> {
    const info: any = await httpservice.getSessionuUsers()
    console.log(info)
  }
}
export default {
  namespaced: true,
  state,
  actions,
  mutations
}
