/*
 * @Author: jhd
 * @Description: wechatBase Api file content
 * @Date: 2019-02-21 19:03:25
 */
import ajax from './axios'

/**
 * @description: 获取登陆二维码
 */
export function wechatQRscan (params: any): Promise<any> {
  return ajax.get('/doubao-wechat-manage/login', { params }).then(res => res.data).catch(e => console.error(e))
}
/**
 * @description: 查询登陆微信
 */
export function wechatLogged (params: any): Promise<any> {
  return ajax.get('/doubao-wechat-manage/logged', { params }).then(res => res.data).catch(e => console.error(e))
}
/**
 * @description: 是否登陆
 */
export function wechatISLogin (params: any): Promise<any> {
  return ajax.get('/doubao-wechat-manage/isLogin', { params }).then(res => res.data).catch(e => console.error(e))
}
/**
 * @description: 获取微信好友或群历史
 */
export function wechatChatListList (params: any): Promise<any> {
  return ajax.get('/doubao-wechat-manage/chatList/list', { params }).then(res => res.data).catch(e => console.error(e))
}
/**
 * @description: 获取微信群或者个人聊天记录
 */
export function wechatChatRecordList (params: any): Promise<any> {
  return ajax.get('/doubao-wechat-manage/chatRecord/list', { params })
    .then(res => res.data).catch(e => console.error(e))
}
/**
 * @description: 获取微信所有群成员
 */
// export function wechatGroupMemberListAll (params: any): Promise<any> {
//   return ajax.get('/doubao-wechat-manage/groupMember/listAll', { params })
//     .then(res => res.data).catch(e => console.error(e))
// }
/**
 * @description: 获取微信好友列表
 */
export function wechatFriendList (params: any): Promise<any> {
  return ajax.get('/doubao-wechat-manage/friend/list', { params }).then(res => res.data).catch(e => console.error(e))
}
/**
 * @description: 获取微信群列表
 */
export function wechatGroupList (params: any): Promise<any> {
  return ajax.get('/doubao-wechat-manage/group/list', { params }).then(res => res.data).catch(e => console.error(e))
}
/**
 * @description: 获取微信群成员列表
 */
export function wechatGroupMemberList (params: any): Promise<any> {
  return ajax.get('/doubao-wechat-manage/groupMember/listAll', { params })
    .then(res => res.data).catch(e => console.error(e))
}
/**
 * @description: 消息统计
 */
export function wechatReportDataList (params: any): Promise<any> {
  return ajax.get('/doubao-wechat-manage/reportData/list', { params })
    .then(res => res.data).catch(e => console.error(e))
}
/**
 * @description: 获取标签或问题列表
 */
export function wechatSingleList (params: any): Promise<any> {
  return ajax.get('/doubao-wechat-manage/knowledge/single/list', { params })
    .then(res => res.data).catch(e => console.error(e))
}
/**
 * @description: 添加标签或问题列表
 */
export function wechatAddsigle (params: any): Promise<any> {
  return ajax.post('/doubao-wechat-manage/knowledge/single', params)
    .then(res => res.data).catch(e => console.error(e))
}
/**
 * @description: 根据标签获取标签下的用户
 */
export function wechatFriendTagList (params: any): Promise<any> {
  return ajax.get('/doubao-wechat-manage/friendTag/list', { params })
    .then(res => res.data).catch(e => console.error(e))
}
/**
 * 删除问题 或标签
 */
export function wechatDeleteSingle (id: string): Promise<any> {
  return ajax.delete(`/doubao-wechat-manage/knowledge/single/${id}`).then(res => res.data).catch(e => console.error(e))
}
/**
 * 获取问题 或标签
 */
export function wechatGetSingle (id: string): Promise<any> {
  return ajax.get(`/doubao-wechat-manage/knowledge/single/${id}`).then(res => res.data).catch(e => console.error(e))
}
/**
 * 修改问题或者标签
 */
export function wechatFixSingle (id: string, params: any): Promise<any> {
  return ajax.put(`/doubao-wechat-manage/knowledge/single/${id}`, params)
    .then(res => res.data).catch(e => console.error(e))
}
export function getTree (id: string): Promise<any> {
  return ajax.get(`/doubao-agent-blog/api/shareTrack/list?articleId=${id}`)
    .then(res => res.data).catch(e => console.error(e))
}
export function getArts (params: any): Promise<any> {
  return ajax.get('/doubao-agent-blog/api/share/listArticle', {params})
    .then(res => res.data).catch(e => console.error(e))
}
export function getShareUser (params: any): Promise<any> {
  return ajax.get('/doubao-agent-blog/api/share/listWxUser', { params })
    .then(res => res.data).catch(e => console.error(e))
}
export function getKOL (params: any): Promise<any> {
  return ajax.get('/doubao-agent-blog/api/shareTrack/getKOL', { params })
    .then(res => res.data).catch(e => console.error(e))
}
export function getKOLTable (params: any): Promise<any> {
  return ajax.get('/doubao-agent-blog/api/shareTrack/getKOLTable', { params })
    .then(res => res.data).catch(e => console.error(e))
}
