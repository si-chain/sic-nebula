import { ActionTree, MutationTree } from 'vuex'
import httpservice from '../../api'

interface IState {
  articlelist: any[]
}
const state: IState = {
  articlelist: []
}

const mutations: MutationTree<IState> = {
  'SET_ARTICLES' (state: IState, list: any[]) {
    state.articlelist = list
  }
}
const actions: ActionTree<IState, any> = {
  async getArticles ({ commit }, payload): Promise<any> {
    const res = await httpservice.getArticles({...payload})
    commit('SET_ARTICLES', res.data.records)
    return res
  },
  async getArticleDetail ({}, payload): Promise<any> {
    const res = await httpservice.getArticleDetail({...payload})
    return res
  },
  // 添加文章
  async addArticle ({}, payload): Promise<any> {
    const data = await httpservice.addArticle({...payload})
    return data
  },
  async updateArticle ({}, payload): Promise<any> {
    const data = await httpservice.updateArticle({...payload})
    return data
  },
  // 删除文章
  async delArticle ({}, payload): Promise<any> {
    const data = await httpservice.delArticle({...payload})
    return data
  },
  // 获取文章类型
  async getArticleTypes ({}, payload): Promise<any> {
    const data = await httpservice.getArticleTypes({...payload})
    return data
  },
  // 添加文章类型
  async addArticleType ({}, payload): Promise<any> {
    const data = await httpservice.addArticleType({...payload})
    return data
  },
  // 删除文章类型
  async delArticleType ({}, payload): Promise<any> {
    const data = await httpservice.delArticleType(payload)
    return data
  },
  // 修改文章类型
  async putArticleType ({}, payload): Promise<any> {
    const data = await httpservice.putArticleType({...payload})
    return data
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
