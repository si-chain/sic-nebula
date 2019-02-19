/*
 * @Author: jhd
 * @Date: 2019-01-14 17:02:49
 * @Description: user ajax config file
 */
import ajax from './axios'

// 登陆
export function login ( params: any): Promise<Ajax.AjaxResponse> {
  return ajax.post('/login', params).then(res => res.data).catch(e => console.error(e))
}
// 退出登陆
export function logout (): Promise<Ajax.AjaxResponse> {
  return ajax.post('/logout').then(res => res.data).catch(e => console.error(e))
}
// info
export function getInfo (): Promise<Ajax.AjaxResponse> {
  return ajax.get('/userInfo').then(res => res.data).catch(e => console.error(e))
}
export function getdaily_event (): Promise<any> {
  return ajax.get('/uec/api/datav/daily_event').then(res => res).catch(e => console.error(e))
}

export function getUserList (): Promise<any> {
  return ajax.get('/brok/agent/uec/event?gid=465').then(res => {
    return res.data
  }).catch(e => console.error(e))
}

export function getEvents (id: string): Promise<any> {
  return ajax.get(`/doubao/uec/api/mobile/userprofile/159259?pagesize=20&pagenum=0`).then(res => res.data).catch(e => console.error(e))
}
export function getTeamMember (): Promise<any> {
  return ajax.get('/broker-outresource/api/broker/teamMember/496?gid=496&current=1&size=10').then(res => res.data).catch(e => console.error(e))
}
