/*
 * @Author: jhd
 * @Date: 2019-02-11 10:29:11
 * @Description: user store file content
 */
import { ActionTree, MutationTree } from 'vuex'
import httpservice from '../../api'

// interface ILoggedUser {
//   headImgUrl: string
//   nickName: string
//   wechatUserId: number
//   userKey: string
// }
interface IState {
  // 1 消息汇总 2好友 3群聊
  sessionType: number
  // 好友列表
  friends: any[]
  // 聊天记录
  chatRecord: any[]
  // 用户key
  userKey: string
  loggendUser: any
  fromId: number
  RecordType: number
  viewType: string
  firendInfo: any
  groupUser: any[]
  groupName: string,
  singleList: any[]
}

const state: IState = {
  sessionType: 1,
  friends: [],
  chatRecord: [],
  userKey: '',
  loggendUser: undefined,
  fromId: 1,
  RecordType: 1,
  viewType: 'chat',
  firendInfo: {},
  groupUser: [],
  groupName: '',
  singleList: []
}
const mutations: MutationTree<IState> = {
  /**
   * @description: 设置对话类型
   */
  'TOGGLE_SESSIONTYPE' (state: IState, type: number): void {
    state.sessionType = type
  },
  /**
   * @description: 设置好友列表
   */
  'TOGGLE_FRIENDS' (state: IState, user: any[]): void {
    state.friends = user
  },
  /**
   * @description: 设置聊天记录
   */
  'TOGGLE_CHATRECORD' (state: IState, infos: any[]): void {
    state.chatRecord = infos
  },
  /**
   * @description: 获取userkey
   */
  'GET_USERKEY' (state: IState): void {
    state.userKey = window.localStorage.getItem('USERKEY') || ''
  },
  /**
   * @description: 设置userkey
   */
  'SET_USERKEY' (state: IState, key: string): void {
    state.userKey = key
    window.localStorage.setItem('USERKEY', key)
  },
  'SET_LOGGED' (state: IState, user: any): void {
    state.loggendUser = user
  },
  // 设置formId
  'SET_FROMID' (state: IState, fromId: number) {
    state.fromId = fromId
  },
  // 设置消息类型
  'SET_RECORDTYPE' (state: IState, RecordType: number) {
    state.RecordType = RecordType
  },
  // 设置view type
  'SET_VIEWTYPE' (state: IState, type: string) {
    state.viewType = type
  },
  // 设置好友信息
  'SET_FRIENDINFO' (state: IState, info: any) {
    state.firendInfo = info
  },
  // 设置群成员
  'SET_GROUPUSER' (state: IState, users: any[]) {
    state.groupUser = users
  },
  // 设置群名称
  'SET_GROUPNAME' (state: IState, name: string) {
    state.groupName = name
  },
  // 设置标签或问题列表
  'SET_SINGLELIST' (state: IState, singleList: any[]) {
    state.singleList = singleList
  }
}
const actions: ActionTree<IState, any> = {
  /**
   * @description: 获取好友列表
   * @param {type} commit
   * @return: 接口数据
   */
  async getfriends ({ commit }, payload): Promise<any> {
    const info: any = await httpservice.wechatFriendList({ ...payload })
    console.log(info)
    return info
  },
  /**
   * @description: 消息统计
   * @param {payload}
   * @return: 接口数据
   */
  async getReportDataList ({}, payload): Promise<any> {
    const data = await httpservice.wechatReportDataList({...payload})
    return data
  },
  /**
   * @description: 获取登陆状态
   * @param {payload}
   * @return: 接口数据
   */
  // async getWechatLogged ({ }, payload): Promise<any> {
  //   const data = await httpservice.wechatLogged({ ...payload })
  //   return data
  // },
  // 获取登陆二维码
  async getWechatQRscan ({commit}, payload): Promise<any> {
    const data = await httpservice.wechatQRscan({...payload})
    if (data.errcode === 200) {
      commit('SET_USERKEY', data.data.userKey)
    }
    return data
  },
  // 查询是否登陆
  async IsLogin ({commit, state}): Promise<any> {
    commit('GET_USERKEY')
    const data = await httpservice.wechatISLogin({userKey: state.userKey})
    return data
  },
  // 查询一登陆账号
  async IsLogged ({commit, state}, payload): Promise<any> {
    const data = await httpservice.wechatLogged({...payload})
    if (data.errcode === 200 && data.data.length > 0) {
      commit('SET_LOGGED', data.data[0])
    }
    return data
  },
  // 获取微信聊天列表
  async wechatChatListList ({commit}, payload): Promise<any> {
    const data = await httpservice.wechatChatListList({...payload})
    return data
  },
  // 获取群 或者个人的聊天记录
  async wechatChatRecordList ({commit}, payload): Promise<any> {
    const data = await httpservice.wechatChatRecordList({...payload})
    commit('TOGGLE_CHATRECORD', data.data.records.reverse())
    commit('SET_FROMID', payload.fromId)
    commit('SET_RECORDTYPE', payload.chatRecordType)
    return data
  },
  // 获取群成员呢
  async wechatGroupMemberList ({commit}, payload): Promise<any> {
    const data = await httpservice.wechatGroupMemberList({...payload})
    commit('SET_GROUPUSER', data.data)
  },
  // 获取全部群列表
  async wechatGroupList ({commit}, payload): Promise<any> {
    const data = await httpservice.wechatGroupList({...payload})
    return data
  },
  // 获取标签或者问题列表
  async getSingleList ({commit}, payload): Promise<any> {
    const data = await httpservice.wechatSingleList({...payload})
    commit('SET_SINGLELIST', data.data.records)
    return data.data.records
  }
}
export default {
  namespaced: true,
  state,
  actions,
  mutations
}
