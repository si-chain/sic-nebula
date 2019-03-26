/*
 * @Author: jhd
 * @Date: 2019-01-14 17:02:49
 * @Description: user ajax config file
 */
import ajax from './axios'
const BasePath = {
  BASE_WENCHAO: '/broker-outresource/api',
  ACCOUNT_CURRENT: '/brokerOutsourceUser/getCurrentUser'
}
// 登陆
export function login ( params: any): Promise<any> {
  return ajax.post('/broker-outresource/api/broker/login/email', params)
}
// 退出登陆
export function logout (): Promise<any> {
  return ajax.post('/logout')
}
// info
export function getUserInfo (): Promise<any> {
  return ajax.post(`${BasePath.BASE_WENCHAO}${BasePath.ACCOUNT_CURRENT}`)
}
export function getdaily_event (): Promise<any> {
  return ajax.get('/uec/api/datav/daily_event').then(res => res).catch(e => console.error(e))
}

export function getEventUserList (params: any): Promise<any> {
  return ajax.get('/brok/agent/uec/event', {params}).then(res => {
    return res.data
  }).catch(e => console.error(e))
}

export function getEvents (id: string): Promise<any> {
  return ajax.get(`/doubao/uec/api/mobile/userprofile/159259?pagesize=20&pagenum=0`)
}
export function getTeamMember (): Promise<any> {
  return ajax.get('/broker-outresource/api/broker/teamMember/496?gid=496&current=1&size=10')
}

// mock

export function getAgencys (params: any): Promise<any> {
  return ajax.post('/supersaas-product-lib/api/insurer/listPage', params)
}

