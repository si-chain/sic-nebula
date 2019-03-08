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
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
