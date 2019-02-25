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
