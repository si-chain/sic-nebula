/*
 * @Author: jhd
 * @Description: 文章模块 file content
 * @Date: 2019-02-28 15:37:01
 */
import ajax from './axios'

// 获取文章列表
export function getArticles (params: any): Promise<any> {
  return ajax.get('/doubao-welfare-cms/api/agent/post/getList', {params})
}
// 获取文章详情
export function getArticleDetail (params: any): Promise<any> {
  return ajax.get('/doubao-welfare-cms/api/agent/post/get', {params})
}
// 添加文章
export function addArticle (params: any): Promise<any> {
  return ajax.post('/doubao-welfare-cms/api/agent/post/save', params)
}
// 更新文章
export function updateArticle (params: any): Promise<any> {
  return ajax.post(`/doubao-welfare-cms/api/agent/post/update?uid=${params.id}`, params.params)
}
// 获取文章类型列表
export function getArticleTypes (params: any): Promise<any> {
  return ajax.get('/doubao-welfare-cms/api/businessCode/list', {params})
}
// 添加文章类型
export function addArticleType (params: any): Promise<any> {
  return ajax.post('/doubao-welfare-cms/api/businessCode', params)
}
// 删除文章类型
export function delArticleType (params: any): Promise<any> {
  console.log(params)
  return ajax.delete('/doubao-welfare-cms/api/businessCode', {data: params})
}
// 修改文章类型
export function putArticleType (params: any): Promise<any> {
  return ajax.put('/doubao-welfare-cms/api/businessCode', params)
}
// 获取文章类型
export function getArticleType (params: any): Promise<any> {
  return ajax.get('/doubao-welfare-cms/api/businessCode', {params})
}
