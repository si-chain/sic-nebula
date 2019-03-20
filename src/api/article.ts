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
