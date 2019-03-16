/*
 * @Author: jhd
 * @Description: 用户中心 file content
 * @Date: 2019-03-15 16:10:57
 */
import ajax from './axios'

const user: any = {}

// 获取用户列表
user.getUserAccountList = (params: any): Promise<any> => {
  return ajax.post('/broker-outresource/api/brokerOutsourceUser/listByCurrentUserGid', params)
}
// 通过uid获取业务员信息
user.getUserAccountInfo = (params: any): Promise<any> => {
  return ajax.get(`/broker-outresource/api/brokerOutsourceUser/user/${params}`)
}

export default user

