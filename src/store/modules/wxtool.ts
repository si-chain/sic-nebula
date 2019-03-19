/*
 * @Author: jhd
 * @Date: 2019-02-11 10:29:11
 * @Description: user store file content
 */
import { ActionTree, MutationTree } from 'vuex'
import httpservice from '../../api'

interface IState {
  // 1 消息汇总 2好友 3群聊
  sessionType: number
  // 好友列表
  friends: any[]
  // 聊天记录
  chatRecord: any[]
  // 用户key
  userKey: string
  // 登陆用户
  loggendUser: any
  fromId: number
  RecordType: number
  chatList: any[]
  viewType: string
  firendInfo: any
  groupUser: any[]
  groupList: any[]
  groupName: string
  tagList: any[]
  friendTagList: any[]
  friendTagName: string
  singleTagId: string
  questionList: any[]
  treeData: any[]
  artList: any[]
  KOLArr: any[]
  wxUserList: any[]
  KOLUser: any[]
  // 对话用户 用于发送消息
  sendMsgUser: any
  // 用户列表或者群 分页
  userListFlag: boolean
  // 用户或者群信息 分页
  messageFlag: boolean
}

const state: IState = {
  sessionType: 1,
  friends: [],
  chatRecord: [],
  userKey: '',
  loggendUser: undefined,
  fromId: 1,
  RecordType: 1,
  chatList: [],
  groupList: [],
  viewType: 'chat',
  firendInfo: {},
  groupUser: [],
  groupName: '',
  tagList: [],
  friendTagList: [],
  friendTagName: '',
  singleTagId: '',
  questionList: [],
  treeData: [],
  artList: [],
  KOLArr: [],
  wxUserList: [],
  KOLUser: [],
  sendMsgUser: {},
  userListFlag: false,
  messageFlag: false
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
  // 设置消息用户列表
  'SET_CHATLIST' (state: IState, list: any[]) {
    state.chatList = list
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
  // 设置群
  'SET_GROUPLIST' (state: IState, list: any[]) {
    state.groupList = list
  },
  // 设置标签或问题列表
  'SET_TAGLIST' (state: IState, list: any[]) {
    state.tagList = list
  },
  // 设置标签或问题列表
  'SET_QUESTIONLIT' (state: IState, list: any[]) {
    state.questionList = list
  },
  // 设置标签下所有用户
  'SET_FRIENDTAGLIST' (state: IState, friendTagList: any[]) {
    state.friendTagList = friendTagList
  },
  // 设置当前选中的标签名
  'SET_FRIENDTAGNAME' (state: IState, tagname: string) {
    state.friendTagName = tagname
  },
  // 设置标签ID
  'SET_SINGLETAGID' (state: IState, id: string) {
    state.singleTagId = id
  },
  // 设置用户列表分页
  'SET_USERFLAG' (state: IState, flag: boolean) {
    state.userListFlag = flag
  },
  // 设置消息列表分页
  'SET_MSGFLAG' (state: IState, flag: boolean) {
    state.messageFlag = flag
  },
  'SET_SENDMSGUSER' (state: IState, user: any) {
    state.sendMsgUser = user
  },
  'SET_TREEDATA' (state: IState, data: any[]) {
    state.treeData = data
  },
  'SET_ARTLIST' (state: IState, data: any[]) {
    state.artList = data
  },
  'SET_KOL' (state: IState, data: any[]) {
    state.KOLArr = data
  },
  'SET_WXUSERLIST' (state: IState, data: any[]) {
    state.wxUserList.push(data)
  },
  'SET_KOLUSER' (state: IState, data: any[]) {
    state.KOLUser = data
  }
}
const actions: ActionTree<IState, any> = {
  /**
   * @description: 获取好友列表
   * @param {type} commit
   * @return: 接口数据
   */
  async getfriends ({ commit }, payload): Promise<any> {
    const data: any = await httpservice.wechatFriendList({ ...payload })
    commit('SET_USERFLAG', data.data.current * data.data.size < data.data.total)
    return data
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
    commit('SET_USERFLAG', data.data.current * data.data.size < data.data.total)
    commit('SET_CHATLIST', data.data.records)
    return data
  },
  // 获取群 或者个人的聊天记录
  async wechatChatRecordList ({commit}, payload): Promise<any> {
    const data = await httpservice.wechatChatRecordList({...payload})
    commit('SET_MSGFLAG', data.data.current * data.data.size < data.data.total)
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
    commit('SET_GROUPLIST', data.data.records)
    return data
  },
  // 获取标签或者问题列表
  async getSingleList ({commit}, payload): Promise<any> {
    const data = await httpservice.wechatSingleList({...payload})
    commit('SET_USERFLAG', data.data.current * data.data.size < data.data.total)
    if (payload.type === 3) {
      commit('SET_TAGLIST', data.data.records)
    } else {
      commit('SET_QUESTIONLIT', data.data.records)
    }
    return data.data
  },
  // 添加标签
  async wechatAddsigle ({}, payload): Promise<any> {
    const data = await httpservice.wechatAddsigle({...payload})
    return data
  },
  // 获取标签下所有用户
  async wechatFriendTagList ({commit}, payload): Promise<any> {
    const data = await httpservice.wechatFriendTagList({...payload})
    commit('SET_FRIENDTAGLIST', data.data.records)
    return data
  },
  // 删除标签或问题
  async wechatDeleteSingle ({}, payload): Promise<any> {
    const data = await httpservice.wechatDeleteSingle(payload)
    return data
  },
  // 获取标签信息
  async wechatGetSingle ({state}): Promise<any> {
    const data = await httpservice.wechatGetSingle(state.singleTagId)
    return data
  },
  // 修改标签或问题
  async wechatFixSingle ({state}, payload): Promise<any> {
    const data = await httpservice.wechatFixSingle(state.singleTagId, {...payload})
    return data
  },
  // 上传消息设置excel
  async importMsgExcel ({}, payload): Promise<any> {
    const data = await httpservice.importMsgExcel({...payload})
    return data
  },
  async getTree ({ commit }, payload) {
    const res = await httpservice.getTree(payload)
    if (res.errcode === 200) {
      commit('SET_TREEDATA', res.data)
      return res.data
    } else {
      commit('SET_TREEDATA', [])
      return []
    }
  },
  async getArts ({ commit }, payload) {
    const res = await httpservice.getArts(payload)
    if (res.errcode === 200) {
      commit('SET_ARTLIST', res.data)
      res.data.map(async (item: any) => {
        const result = await httpservice.getShareUser({
          articleId: item.articleId
        })
        if (result.errcode === 200) {
          commit('SET_WXUSERLIST', {
            articleId: item.articleId,
            data: result.data
          })
        }
      })
      return res.data
    } else {
      commit('SET_ARTLIST', [])
      return []
    }
  },
  async getKol ({ commit, state }, payload) {
    const res = await httpservice.getKOL(payload.params)
    commit('SET_KOLUSER', res.data)
    const KOLArr = addStyle(state.treeData, res.data, 'value', 'readerWxOpenid', {
      "itemStyle": {
        "borderType": 'solid',
        "borderWidth": 10,
        "borderColor": payload.setColor,
        "shadowColor": 'yellow',
        "opacity": 1
      }
    }, false)
    commit('SET_KOL', KOLArr)
    return KOLArr
  },
  setKolColor ({ state }, payload) {
    const result = addStyle(state.treeData, [], 'value', payload.sharerWxOpenid, {
      "itemStyle": {
        "borderType": 'solid',
        "borderWidth": 10,
        "borderColor": payload.setColor,
        "shadowColor": 'yellow',
        "opacity": 1
      }
    }, true)
    return result
  },
  async getKOLTable ({}, payload) {
    const data = await httpservice.getKOLTable({...payload})
    return data.data
  },
  async getReportDate ({}, payload) {
    const data = await httpservice.getReportDate({...payload})
    return data
  },
  async sendMessage ({}, payload) {
    const data = await httpservice.sendMessage({...payload})
    return data
  },
  // 批量删除标签内用户
  async deleteTagUsers ({}, payload) {
    const data = await httpservice.deleteTagUsers(payload)
    return data
  }
}
function addStyle (changeArr: any[], contrastArr: any[], attr: string, attr1: string, obj: any, single: boolean ) {
  const resultArr = changeArr
  if (single) {
    resultArr.map(item => {
      if (!item.leaf) {
        addStyle(item.children, contrastArr, attr, attr1, obj, single)
      }
      if (item[attr] === attr1) {
        for (const key of Object.keys(obj)) {
          item[key] = obj[key]
        }
      }
    })
    return resultArr
  } else {
    resultArr.map(item => {
      if (!item.leaf) {
        addStyle(item.children, contrastArr, attr, attr1, obj, single)
      }
      contrastArr.map(child => {
        if (item[attr] === child[attr1]) {
          for (const key of Object.keys(obj)) {
            item[key] = obj[key]
          }
        }
      })
    })
    return resultArr
  }
}
export default {
  namespaced: true,
  state,
  actions,
  mutations
}
