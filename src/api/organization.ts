/*
 * @Author: jhd
 * @Description: 组织机构管理 file content
 * @Date: 2019-03-15 16:03:45
 */
import ajax from './axios'

const organization: any = {}
// 获取组织机构列表
organization.getGroupList = (): Promise<any> => {
  return ajax.post('/broker-outresource/api/brokerOutsourceGroup/getSelfAndChildrenGroup')
}
// 新增组织机构
organization.createUserOrganization = (params: any): Promise<any> => {
  return ajax.request({
    url: '/broker-outresource/api/brokerOutsourceGroup/insert',
    method: 'post',
    params
  })
}
// 更新组织机构
organization.updateUserOrganization = (params: any): Promise<any> => {
  return ajax.request({
    url: '/broker-outresource/api/brokerOutsourceGroup/update',
    method: 'post',
    params
  })
}
// 删除组织
organization.deleteUserOrganization = (params: number): Promise<any> => {
  return ajax.request({
    url: '/broker-outresource/api/brokerOutsourceGroup/remove',
    method: 'post',
    params
  })
}
// 新增人员 ==》 服务团队
organization.addBrokerOutsourceStaff = (params: any): Promise<any> => {
  return ajax.post('/broker-outresource/api/brokerOutsourceStaff', params)
}
// 更新人员 => 服务团队
organization.putBrokerOutsourceStaff = (params: any): Promise<any> => {
  return ajax.put(`/broker-outresource/api/brokerOutsourceStaff/${params.id}`, params.params)
}
// 删除人员
organization.delBrokerOutsourceStaff = (params: number): Promise<any> => {
  return ajax.delete(`/broker-outresource/api/brokerOutsourceStaff/${params}`)
}
organization.delBrokerOutsourceStaffs = (params: any): Promise<any> => {
  return ajax.delete('/broker-outresource/api/brokerOutsourceStaff/batchDelete', {data: params})
}
// 获取人员
organization.getBrokerOutsourceStaff = (params: number): Promise<any> => {
  return ajax.get(`/broker-outresource/api/brokerOutsourceStaff/${params}`)
}

export default organization
